# Robo-Reveal Examples

This directory contains examples demonstrating various features and capabilities of the robo-reveal presentation framework.

## Examples Overview

### 01-basic-presentation.js
**Basic Presentation Example**
- Creating a presentation with configuration
- Simple slides with titles and content
- Fragments and animations
- Auto-animate between slides
- Two-column layouts
- Media support (images, videos, iframes)
- ContentBuilder integration

Run: `node examples/01-basic-presentation.js`

### 02-layout-examples.js
**Layout System Examples**
- Horizontal layouts (HStack)
- Vertical layouts (VStack)
- Nested layouts
- Stack layouts with fragments
- Grid-like layouts
- Stretched elements
- Fit text variations
- Mixed content with ContentBuilder
- Two-column comparisons

Run: `node examples/02-layout-examples.js`

### 03-semantic-api.js
**Semantic HTML API Examples**
- Pure semantic API without HTML strings
- Using h1, h2, h3 for headings
- Paragraphs with p()
- Lists with ul() and ol()
- Code blocks with pre() and code()
- Blockquotes and emphasis
- Links and navigation
- Article-like layouts
- Bio/profile layouts
- Data presentations

Run: `node examples/03-semantic-api.js`

### 04-complex-lists.js
**Complex List Examples**
- Mathematical formulas in lists
- Styled list items with backgrounds
- Progressive reveal with fragments
- Mixed content types in lists
- Chemical equations
- Statistical formulas
- Algorithm steps
- Comparison layouts

Run: `node examples/04-complex-lists.js`

## Running Examples

### Method 1: Using Parcel Dev Server (Recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the dev server:
   ```bash
   npm run dev
   # or
   npm start
   ```

3. This will open `http://localhost:1234` with the first example

4. To run a different example, edit `index.html` and change the import:
   ```javascript
   // Change this line to load different examples
   import './examples/02-layout-examples.js';
   ```

### Method 2: Example Browser

1. Run the dev server:
   ```bash
   npm start
   ```

2. Navigate to `http://localhost:1234/examples/`

3. Click on any example to run it

### Method 3: Direct File Access

For simple testing without a build tool:

1. Open `examples/index.html` in your browser
2. Click on any example link

**Note:** Some features may require a proper web server due to CORS restrictions.

### Keyboard Shortcuts

When viewing a presentation:
- **Arrow Keys** - Navigate slides
- **F** - Fullscreen
- **S** - Speaker notes
- **O** - Overview mode
- **ESC** - Exit fullscreen/overview
- **?** - Show keyboard help

## Key Features Demonstrated

### Layout System
- **Stack**: Overlay elements on top of each other
- **HStack**: Arrange elements horizontally
- **VStack**: Arrange elements vertically
- **FitText**: Auto-sizing text
- **Stretch**: Elements that fill remaining space
- **Frame**: Decorative borders

### Semantic API
- No HTML strings required
- Clean, readable code
- Type-safe method chaining
- Automatic escaping for security

### Content Types
- Plain text
- Mathematical formulas (KaTeX)
- Code blocks with syntax highlighting
- Images and videos
- IFrames for external content
- Lists with complex items

### Styling Options
- Background colors and gradients
- Custom CSS styles
- Fragment animations
- Auto-animate transitions
- Theme support

## API Quick Reference

```javascript
// Create presentation
const presentation = new Presentation(config);

// Add slide
const slide = presentation.slide(options);

// Create layout
const layout = new VStack()
  .h1('Title')
  .p('Paragraph')
  .ul(['Item 1', 'Item 2']);

// Add to slide
slide.addChild(layout);

// Initialize
presentation.initialize();
```

## Learn More

- [Main Documentation](../README.md)
- [API Design Document](../LAYOUT_API_DESIGN.md)
- [Reveal.js Documentation](https://revealjs.com)# robo-reveal-examples
