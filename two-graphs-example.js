import { 
  Presentation,
  VStack,
  HStack,
  PluginInitializer
} from 'robo-reveal';

/**
 * Two Graphs Example - Side by side diagrams using HStack
 */

// Initialize plugins first
PluginInitializer.initialize();

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Title Slide
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'slide'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' })
  .h1('Two Graphs Example')
  .h3('Side by Side Diagrams')
  .p('Using HStack layout');

titleSlide.addChild(titleLayout);

// Second Slide - Two graphs side by side
const graphSlide = presentation.slide();

// Create HStack for side-by-side layout
const hstack = new HStack({ spacing: '1em', align: 'stretch' });

// First diagram
hstack.animatedDiagram({
  id: 'graph-left',
  showGrid: true,
  xRange: [-5, 5],
  yRange: [-5, 5]
}, (diagram) => {
  // Draw a sine-like curve
  diagram.line({x: -4, y: 0}, {x: 4, y: 0})
    .stroke('#888')
    .strokeWidth(1);
  diagram.line({x: 0, y: -4}, {x: 0, y: 4})
    .stroke('#888')
    .strokeWidth(1);
  diagram.circle({x: -2, y: 2}, 0.5)
    .fill('#e74c3c');
  diagram.circle({x: 2, y: -2}, 0.5)
    .fill('#3498db');
});

// Second diagram
hstack.animatedDiagram({
  id: 'graph-right',
  showGrid: true,
  xRange: [-10, 10],
  yRange: [-10, 10]
}, (diagram) => {
  // Draw a different pattern
  diagram.line({x: -8, y: -8}, {x: 8, y: 8})
    .stroke('#27ae60')
    .strokeWidth(2);
  diagram.line({x: -8, y: 8}, {x: 8, y: -8})
    .stroke('#f39c12')
    .strokeWidth(2);
  diagram.circle({x: 0, y: 0}, 1)
    .fill('#9b59b6');
});

// Add HStack to slide
graphSlide.addChild(hstack);

// Initialize the presentation
presentation.initialize();

// Export for debugging
window.presentation = presentation;