# Contributing to Employee Management System

First off, thank you for considering contributing to the Employee Management System! It's people like you that make it such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots and animated GIFs if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the JavaScript/React styleguides
* End files with a newline
* Avoid platform-dependent code

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

* Use semicolons
* 2 spaces for indentation
* Prefer const over let
* Use meaningful variable names
* Use async/await over promises
* Add comments for complex logic

### React Styleguide

* Use functional components with hooks
* Use prop-types for type checking
* Keep components small and focused
* Use meaningful component names
* Follow file naming conventions
* Use CSS-in-JS with styled-components

### Documentation Styleguide

* Use Markdown
* Reference functions and classes in backticks
* Add code examples where appropriate
* Keep documentation up to date with code changes

## Development Process

1. Fork the repo
2. Create a new branch (git checkout -b feature/AmazingFeature)
3. Make your changes
4. Run the tests
5. Commit your changes (git commit -m 'Add some AmazingFeature')
6. Push to the branch (git push origin feature/AmazingFeature)
7. Open a Pull Request

### Setting up Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/employee-management-system.git

# Add upstream remote
git remote add upstream https://github.com/original-repo/employee-management-system.git

# Install dependencies
cd employee-management-system
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test-file.js

# Run tests in watch mode
npm test -- --watch
```

## Project Structure

Follow these guidelines when adding new files:

```
src/
├── components/        # Reusable components
│   ├── common/       # Shared components
│   └── specific/     # Feature-specific components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API services
├── utils/            # Helper functions
└── styles/           # Global styles
```

## Additional Notes

### Issue and Pull Request Labels

* bug: Something isn't working
* documentation: Improvements or additions to documentation
* enhancement: New feature or request
* good first issue: Good for newcomers
* help wanted: Extra attention is needed
* invalid: This doesn't seem right
* question: Further information is requested
* wontfix: This will not be worked on

## Recognition

Contributors who make significant improvements will be added to the README.md file in the Contributors section.

Thank you for contributing to Employee Management System! 🎉 