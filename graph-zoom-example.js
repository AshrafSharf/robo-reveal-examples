import { 
  Presentation,
  VStack,
  HStack
} from 'robo-reveal';
import { PluginInitializer, AnimatedDiagram } from 'robo-reveal';

/**
 * Simple Graph Example - Grid with a line
 */

// Initialize plugins and wait for them to load
const pluginsLoaded = PluginInitializer.initialize().then(() => {
  console.log('All GSAP plugins loaded and ready');
}).catch(err => {
  console.error('Failed to load GSAP plugins:', err);
  console.log('Continuing without animation plugins...');
});

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Title Slide
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'slide'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' });
titleLayout.h1('Simple Graph');
titleLayout.h3('Grid and Line Demo');
titleLayout.p('Basic graph visualization');

titleSlide.addChild(titleLayout);

// Second Slide - Two graphs side by side
const graphSlide = presentation.slide();

// Add title using HTML content
graphSlide.setContent('<h2>Animated Graphs</h2>');

// Create HStack for fragment controls
const controlsHStack = new HStack({ spacing: '2em', align: 'center' });

// Add fragment elements as divs in the HStack
const fragmentTexts = [
  'Show vectors and line',
  'Show circles and polygon', 
  'Show point and math',
  'Zoom in to center',
  'Zoom out'
];

fragmentTexts.forEach((text, index) => {
  const fragmentDiv = document.createElement('div');
  fragmentDiv.className = 'fragment';
  fragmentDiv.setAttribute('data-fragment-index', index);
  fragmentDiv.textContent = text;
  fragmentDiv.style.padding = '10px';
  fragmentDiv.style.border = '1px solid #ccc';
  fragmentDiv.style.borderRadius = '5px';
  controlsHStack.addChild(fragmentDiv);
});

graphSlide.addChild(controlsHStack);

// Create HStack for side-by-side layout with two diagrams
const hstack = new HStack({ class: 'r-stretch' });

// Using new simplified API with explicit dimensions
// First diagram (left side)
hstack.animatedDiagram(400, 400, {
  id: 'left-graph',
  showGrid: true,
  xRange: [-10, 10],
  yRange: [-10, 10]
}, async (container, config) => {
  console.log('Left diagram callback called with:', container, config);
  
  // Ensure plugins are loaded before creating diagram
  await pluginsLoaded;
  
  // Create animated diagram with provided dimensions
  const diagram = new AnimatedDiagram(container, config);
  
  // Add shapes with fragment indices
  diagram.vector({x: 0, y: 0}, {x: 5, y: 5}, 'v1', 'red', {fragmentIndex: 0});
  diagram.circle({x: 0, y: 0}, 2, 'origin', 'blue', {fragmentIndex: 1, fill: 'none'});
  diagram.point({x: 5, y: 5}, 'P', 'green', {fragmentIndex: 2});
  
  // Add complex LaTeX math at origin for testing
  diagram.mathText({x: 0, y: 0}, '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}', 'red', {fragmentIndex: 2, fontSize: 15});
  
  // Add zoom animations to the queue
  diagram.zoomIn({x: 0, y: 0}, {scale: 0.5, duration: 1, fragmentIndex: 3});
  diagram.zoomOut({duration: 1, fragmentIndex: 4});
  
  console.log('Left diagram created with dimensions:', config.width, 'x', config.height);
  
  // Return cleanup function
  return () => {
    console.log('Cleaning up left diagram');
    diagram.clearAll();
    diagram.destroy();
  };
});

// Second diagram (right side)
hstack.animatedDiagram(400, 400, {
  id: 'right-graph',
  showGrid: true,
  xRange: [-5, 5],
  yRange: [-5, 5]
}, async (container, config) => {
  console.log('Right diagram callback called with:', container, config);
  
  // Ensure plugins are loaded before creating diagram
  await pluginsLoaded;
  
  // Create animated diagram with provided dimensions
  const diagram = new AnimatedDiagram(container, config);
  
  // Add shapes with fragment indices
  diagram.line({x: -3, y: -3}, {x: 3, y: 3}, 'diagonal', 'purple', {fragmentIndex: 0});
  diagram.polygon([{x: -2, y: -2}, {x: 2, y: -2}, {x: 2, y: 2}, {x: -2, y: 2}], 'square', 'orange', {fragmentIndex: 1, fill: 'none'});
  
  // Add complex LaTeX math expression at origin for testing
  diagram.mathText({x: 0, y: 0}, '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', 'purple', {fragmentIndex: 2, fontSize: 15});
  
  // Add zoom animations to the queue
  diagram.zoomIn({x: 0, y: 0}, {scale: 0.5, duration: 1, fragmentIndex: 3});
  diagram.zoomOut({duration: 1, fragmentIndex: 4});
  
  console.log('Right diagram created with dimensions:', config.width, 'x', config.height);
  
  // Return cleanup function
  return () => {
    console.log('Cleaning up right diagram');
    diagram.clearAll();
    diagram.destroy();
  };
});

// Add HStack to slide
graphSlide.addChild(hstack);

// Initialize the presentation
presentation.initialize();

// Export for debugging
window.presentation = presentation;