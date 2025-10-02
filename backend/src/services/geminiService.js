const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    // Use gemini-2.0-flash-exp - Faster experimental Flash model
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  // System prompt for the chatbot's context and behavior
  getSystemPrompt(language = 'en') {
    return `You are EduDBT Assistant, helping Indian students with Aadhaar, DBT, and scholarships.

**Response Rules:**
- Keep answers SHORT and CONCISE (3-4 sentences or 5-6 bullet points maximum)
- Get straight to the point - no long introductions
- Use simple language students understand
- For complex topics, provide only the most essential steps
- Mention key portals: UIDAI (uidai.gov.in), NSP (scholarships.gov.in)
- If topic needs detail, suggest: "Visit Learning Center for full guide"

**Topics**: Aadhaar linking, DBT enabling, scholarships, bank accounts, documents, troubleshooting

**Language**: Respond in ${this.getLanguageName(language)}`;
  }

  getLanguageName(code) {
    const languages = {
      en: 'English',
      hi: 'Hindi (हिंदी)',
      bn: 'Bengali (বাংলা)',
      mr: 'Marathi (मराठी)',
      te: 'Telugu (తెలుగు)',
      ta: 'Tamil (தமிழ்)',
      gu: 'Gujarati (ગુજરાતી)',
      ur: 'Urdu (اردو)',
      kn: 'Kannada (ಕನ್ನಡ)',
      or: 'Odia (ଓଡ଼ିଆ)',
      ml: 'Malayalam (മലയാളം)',
      pa: 'Punjabi (ਪੰਜਾਬੀ)',
      as: 'Assamese (অসমীয়া)'
    };
    return languages[code] || 'English';
  }

  // Build conversation history for context
  buildConversationHistory(messages, language) {
    const history = [
      {
        role: 'user',
        parts: [{ text: this.getSystemPrompt(language) }]
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I will provide brief, helpful answers.' }]
      }
    ];

    // Add recent conversation history (last 6 messages for faster context)
    const recentMessages = messages.slice(-6);
    recentMessages.forEach(msg => {
      history.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });

    return history;
  }

  // Generate a response using Gemini AI
  async generateResponse(userMessage, conversationHistory = [], language = 'en') {
    try {
      console.log('GeminiService: Starting response generation');
      console.log('API Key present:', !!this.apiKey);
      
      if (!this.apiKey) {
        console.error('GeminiService: API key is missing!');
        throw new Error('Gemini API key is not configured');
      }

      // Build the full conversation context
      const history = this.buildConversationHistory(conversationHistory, language);
      console.log('GeminiService: Built conversation history with', history.length, 'entries');

      // Start a chat session with history
      const chat = this.model.startChat({
        history: history
      });

      console.log('GeminiService: Sending message to Gemini API...');
      // Send the user's message
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();
      
      console.log('GeminiService: Raw response:', text);
      console.log('GeminiService: Response length:', text?.length || 0);

      console.log('GeminiService: Received response, length:', text.length);

      return {
        success: true,
        message: text,
        tokensUsed: response.usageMetadata
      };

    } catch (error) {
      console.error('GeminiService: Error occurred:', error.message);
      console.error('GeminiService: Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n')[0]
      });
      
      // Provide helpful fallback responses
      return {
        success: false,
        message: this.getFallbackResponse(language),
        error: error.message
      };
    }
  }

  // Fallback response when API fails
  getFallbackResponse(language) {
    const fallbacks = {
      en: "I apologize, but I'm having trouble connecting to my AI service right now. For immediate help, please:\n\n• Visit the Learning Center for detailed guides\n• Check the Help page for common questions\n• Contact support at support@edudbt.gov.in\n• Call the National Scholarship Portal helpline: 0120-6619540",
      hi: "मुझे खेद है, लेकिन मुझे अपनी AI सेवा से कनेक्ट करने में समस्या हो रही है। तत्काल सहायता के लिए कृपया:\n\n• विस्तृत गाइड के लिए लर्निंग सेंटर पर जाएँ\n• सामान्य प्रश्नों के लिए हेल्प पेज देखें\n• support@edudbt.gov.in पर संपर्क करें\n• राष्ट्रीय छात्रवृत्ति पोर्टल हेल्पलाइन पर कॉल करें: 0120-6619540"
    };
    return fallbacks[language] || fallbacks.en;
  }

  // Quick response for common queries (reduce API calls)
  getQuickResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase();
    
    // Common greetings
    if (['hi', 'hello', 'hey', 'namaste', 'नमस्ते'].some(greeting => lowerMessage.includes(greeting))) {
      const greetings = {
        en: "Hello! 👋 I'm your EduDBT assistant. Ask me about Aadhaar linking, DBT, scholarships, or documents. What do you need help with?",
        hi: "नमस्ते! 👋 मैं आपका EduDBT सहायक हूं। आधार लिंकिंग, DBT, छात्रवृत्ति के बारे में पूछें। आपको क्या चाहिए?"
      };
      return greetings[language] || greetings.en;
    }

    // Thank you messages
    if (['thank', 'thanks', 'धन्यवाद'].some(word => lowerMessage.includes(word))) {
      const thanks = {
        en: "You're welcome! 😊 Feel free to ask more questions.",
        hi: "आपका स्वागत है! 😊 और प्रश्न पूछें।"
      };
      return thanks[language] || thanks.en;
    }

    return null; // Let Gemini handle other queries
  }
}

module.exports = new GeminiService();
