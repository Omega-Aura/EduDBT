# 🤝 Contributing to Aadhaar DBT Awareness Platform

Thank you for considering contributing to this project! We welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

**Template:**

```markdown
**Bug Description:**
A clear description of the bug

**Steps to Reproduce:**

1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**

- OS: [e.g., Windows 11]
- Node: [e.g., v18.0.0]
- Browser: [e.g., Chrome 120]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide detailed description** of the enhancement
- **Explain why this enhancement would be useful**
- **Provide examples** of how it would work

### Contributing Code

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (see commit guidelines below)
6. **Push to your fork** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

## 💻 Development Setup

### Prerequisites

- Node.js v16+
- npm v8+
- MongoDB Atlas account
- Google Gemini API key

### Setup Steps

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/SIH-Topography.git
cd "SIH MERN Prototype"

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit .env files with your credentials

# 4. Seed database
cd backend
node seedData.js

# 5. Run development servers
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] All tests pass
- [ ] No console errors in browser
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with main

### PR Checklist

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested locally
- [ ] Added new tests (if applicable)
- [ ] All tests passing

## Screenshots (if applicable)

[Add screenshots here]

## Related Issues

Closes #[issue number]
```

### Review Process

1. Maintainers will review your PR
2. Make requested changes (if any)
3. Once approved, PR will be merged
4. Your contribution will be acknowledged!

## 📝 Coding Standards

### JavaScript/React

**Use ES6+ syntax:**

```javascript
// ✅ Good
const fetchData = async () => {
  try {
    const response = await api.get("/data");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// ❌ Avoid
function fetchData() {
  return api
    .get("/data")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}
```

**Component structure:**

```javascript
// ✅ Good - Functional components with hooks
import React, { useState, useEffect } from "react";

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  return <div>{/* JSX */}</div>;
};

export default MyComponent;
```

**Naming conventions:**

- Components: `PascalCase` (e.g., `UserProfile.js`)
- Functions: `camelCase` (e.g., `fetchUserData`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- CSS classes: `kebab-case` (e.g., `user-profile-card`)

### Code Organization

**File structure:**

```
src/
├── components/        # Reusable components
│   ├── common/       # Shared UI components
│   ├── layout/       # Layout components
│   └── specific/     # Feature-specific components
├── pages/            # Page components
├── services/         # API services
├── hooks/            # Custom hooks
├── store/            # Redux store
└── utils/            # Utility functions
```

**Import order:**

```javascript
// 1. External libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 2. Internal components
import Header from "../components/Header";
import Footer from "../components/Footer";

// 3. Hooks and utilities
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/helpers";

// 4. Styles
import "./styles.css";
```

### Error Handling

**Always handle errors:**

```javascript
// ✅ Good
try {
  const response = await api.post("/data", payload);
  return response.data;
} catch (error) {
  console.error("API Error:", error);
  throw new Error(error.response?.data?.message || "Operation failed");
}

// ❌ Avoid - no error handling
const response = await api.post("/data", payload);
return response.data;
```

### Comments

**Write meaningful comments:**

```javascript
// ✅ Good - explains why, not what
// Debounce search to avoid excessive API calls
const debouncedSearch = debounce(handleSearch, 300);

// ❌ Avoid - states the obvious
// Set loading to true
setLoading(true);
```

## 📤 Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(auth): add password reset functionality"

# Bug fix
git commit -m "fix(dashboard): correct progress calculation"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactor
git commit -m "refactor(api): optimize database queries"
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Reference issues in footer (e.g., "Closes #123")

## 🧪 Testing

### Before Committing

Run these checks:

```bash
# Backend
cd backend
npm run lint  # If available
npm test      # If available

# Frontend
cd frontend
npm run lint  # If available
npm test      # If available
```

### Manual Testing

- [ ] Test on Chrome, Firefox, and Edge
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test all form validations
- [ ] Test API error handling
- [ ] Test authentication flows

## 🎨 UI/UX Guidelines

### Design Principles

- **Consistency**: Use existing components and patterns
- **Accessibility**: Follow WCAG guidelines
- **Responsiveness**: Mobile-first design
- **Performance**: Optimize images and code

### Adding New Components

1. Check if similar component exists
2. Use Bootstrap classes when possible
3. Follow existing component structure
4. Add PropTypes or TypeScript types
5. Document props and usage

### Styling

- Use Bootstrap classes first
- Custom CSS in component-specific file
- Use CSS variables for colors
- Follow BEM naming convention

## 📚 Documentation

### When to Update Docs

- Adding new features
- Changing API endpoints
- Updating environment variables
- Modifying setup process

### Documentation Files

- `README.md`: Overview and quick start
- `SETUP_GUIDE.md`: Detailed setup instructions
- `API_DOCS.md`: API endpoint documentation
- Code comments: Complex logic explanation

## 🏆 Recognition

Contributors will be:

- Listed in the project's contributors page
- Mentioned in release notes
- Acknowledged in the README (for significant contributions)

## ❓ Questions?

- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions
- Tag maintainers in issues

## 📞 Contact

For questions or concerns, please:

- Open a GitHub issue
- Contact maintainers directly
- Join our community chat (if available)

---

**Thank you for contributing! 🎉**

Every contribution, no matter how small, makes a difference!
