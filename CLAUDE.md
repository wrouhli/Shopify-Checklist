# CLAUDE.md

This file provides guidance to Claude Code (https://claude.ai/code) when working with code in this repository.

## Developer Context - Non-Technical Approach

## About Me
- I'm a marketing person who codes by vibes
- I understand business logic better than technical logic  
- I learn by doing, not by reading documentation
- I want things to "just work" without understanding every detail
- I copy-paste code and modify until it works
- My superpower: I know what clients actually need

## How I Code
- I change one thing at a time and test immediately
- I use ChatGPT/Claude to explain code I don't understand
- I prefer working examples over theoretical explanations
- I break things often and need help fixing them
- I care more about "does it work?" than "is it elegant?"

## Talk to Me Like:
- Explain WHY before HOW
- Use simple language, avoid jargon
- Show me exactly which file to edit and which lines
- Give me working examples I can copy-paste
- Tell me what could go wrong BEFORE I try something

## What I'm Good At:
- Understanding user experience and business needs
- Knowing what features clients will actually use
- Testing things from a real-user perspective
- Making things look good and professional
- Project management and prioritization

## Teaching Mode Active

When I ask for code changes:
1. Explain what the code does in plain English first
2. Show me exactly where to make changes (file + line numbers)
3. Tell me what happens if something goes wrong
4. Give me a way to undo changes if needed
5. Explain why this approach is better than alternatives

Example:
"I want to add a feature where..." 
→ You explain the business logic, then the code logic, then show implementation

## Business-First Explanations

When I say business things like:
- "Clients need to see progress better" 
- "The export looks unprofessional"
- "Loading feels slow"
- "Mobile doesn't work right"

Translate to:
- Specific UI/UX improvements needed
- Exact technical problems to solve
- Simple, non-technical solutions
- Quick wins vs. complex solutions

Always ask: "Is this solving a real client problem or just a technical problem?"

## When Things Break (They Will)

Common things I break:
- JavaScript syntax errors (missing semicolons, brackets)
- CSS that makes things disappear
- Functions that stop working after I modify them
- Export features that suddenly fail

When I say "it's broken":
1. Ask me to copy-paste the exact error message
2. Ask me what I changed last
3. Give me step-by-step debugging instructions
4. Provide a "quick fix" and a "proper fix" option
5. Help me understand why it broke

## From Vibe to Code

When I have vague ideas like:
- "Make it more professional looking"
- "Add something to impress clients"
- "It needs to feel more premium"
- "Can we make it faster?"

Help me by:
1. Asking clarifying questions about the business goal
2. Suggesting 2-3 concrete options
3. Explaining the effort level for each option
4. Recommending which to try first
5. Breaking it into tiny, testable steps

## My Vibe Coding Superpowers

Remember, I'm actually GOOD at:
- Knowing what features matter to real clients
- Understanding user experience from a business perspective
- Testing things like a real user would
- Making design decisions that look professional
- Prioritizing features by business impact

Use my strengths:
- Ask me business questions when code decisions are unclear
- Let me test UX and give feedback
- Help me translate my good business instincts into working code
- Remind me that my non-technical perspective is valuable

## Current Project Vibe
Working on: [Update this with what you're currently focused on]
Stuck on: [What's frustrating you right now]
Excited about: [What feature you can't wait to build]
Learning: [What coding concept you're trying to understand]

## Golden Rule
Always assume I need more explanation, not less. 
I'd rather you over-explain than leave me confused.
If you're unsure whether to explain something, explain it.

## Project Overview

This is a comprehensive, interactive Shopify QA Checklist web application built with vanilla JavaScript, HTML, and CSS. It's a client-side-only application designed to help agencies and developers ensure Shopify stores are launch-ready through systematic quality assurance checks.

## Architecture

### JavaScript Architecture
The application follows a **modular, class-based manager system** with clear separation of concerns:

- **`ShopifyQAApp`** (`js/app.js`) - Main orchestrator that initializes and coordinates all managers
- **`ProgressManager`** (`js/progress.js`) - Handles state management and localStorage persistence
- **`ThemeManager`** (`js/theme.js`) - Manages dark/light mode theming
- **`FilterManager`** (`js/filters.js`) - Handles search and filtering functionality
- **`UIManager`** (`js/ui.js`) - Manages DOM manipulation and user interactions
- **`ExportManager`** (`js/export.js`) - Handles PDF/CSV/JSON export functionality
- **`AnimationManager`** (`js/animations.js`) - Manages visual effects and animations

### Data Architecture
- **Data Source**: `data/checklist-data.js` contains the complete checklist structure (200+ items across 10 categories)
- **State Management**: Centralized in `ProgressManager` with localStorage for persistence
- **Communication**: Event-driven architecture using custom DOM events for loose coupling

### Styling Architecture
- **Framework**: Tailwind CSS (via CDN)
- **Custom Styles**: Modular CSS files in `styles/` directory
  - `main.css` - Base styles and utilities
  - `components.css` - Reusable component styles
  - `dark-mode.css` - Dark theme specific styles
  - `animations.css` - Animation utilities

## Development Commands

This is a static web application with no build process - simply open `index.html` in a browser to run the application.

### Testing the Application
- Open `index.html` in any modern web browser
- Use browser developer tools for debugging
- Test responsive design at different viewport sizes
- Verify dark mode toggle functionality
- Test all export formats (PDF, CSV, JSON)

### Keyboard Navigation
The application includes comprehensive keyboard shortcuts:
- `Ctrl+K` - Toggle keyboard shortcuts panel
- `j/k` - Navigate between checklist items
- `Space` - Toggle item completion
- `Escape` - Close modals/clear search
- `Ctrl+E` - Export functionality

## Key Implementation Details

### Data Structure
Checklist data follows this structure:
```javascript
{
  id: 'section-id',
  title: 'Section Title',
  icon: 'lucide-icon-name',
  color: 'tailwind-color',
  items: [
    {
      id: 'item-id',
      title: 'Item title',
      category: 'Category name',
      priority: 'high|medium|low',
      links: [{ text: 'Link text', url: 'URL', type: 'tool|guide' }],
      completed: false,
      notes: ''
    }
  ]
}
```

### Manager Dependencies
- `UIManager` depends on `ProgressManager` and `FilterManager`
- `ExportManager` depends on `ProgressManager`
- `FilterManager` is independent but works with `ProgressManager`
- All managers are initialized through `ShopifyQAApp`

### Event System
Managers communicate via custom DOM events:
- `dataFiltered` - Fired when filter state changes
- `showNotification` - For displaying user feedback
- Standard DOM events for user interactions

### Browser Compatibility
- Uses modern JavaScript (ES6+ classes, arrow functions)
- Includes fallbacks for PDF generation
- Progressive enhancement approach for advanced features

## File Organization

```
├── index.html              # Main HTML file
├── data/
│   └── checklist-data.js   # Checklist data structure
├── js/                     # JavaScript modules
│   ├── app.js             # Main application controller
│   ├── animations.js      # Animation utilities
│   ├── export.js          # Export functionality
│   ├── filters.js         # Search and filtering
│   ├── progress.js        # State management
│   ├── theme.js           # Theme management
│   ├── ui.js              # UI management
│   └── utils.js           # Utility functions
├── styles/                 # CSS modules
│   ├── main.css           # Base styles
│   ├── components.css     # Component styles
│   ├── dark-mode.css      # Dark theme styles
│   └── animations.css     # Animation styles
└── assets/
    └── icons/             # Logo and icons
```

## External Dependencies
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Lucide Icons** - Icon library (via CDN)
- **jsPDF** - PDF generation library (via CDN)
- **Google Fonts** - Inter font family (via CDN)

All dependencies are loaded via CDN - no package manager or build tools required.