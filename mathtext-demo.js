console.log('mathtext-demo.js is loading...');

import { 
  Presentation,
  VStack,
  HStack,
  SVGCanvas,
  Numberline
} from 'robo-reveal';
import { PluginInitializer } from 'robo-reveal';

console.log('Imports completed successfully');

/**
 * MathText Demo - SVGCanvas and Numberline LaTeX support
 */

// Initialize plugins and wait for them to load
const pluginsLoaded = PluginInitializer.initialize().then(() => {
  console.log('All plugins loaded and ready');
}).catch(err => {
  console.error('Failed to load plugins:', err);
  console.log('Continuing without plugins...');
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
titleLayout.h1('📐 MathText Demo');
titleLayout.h3('LaTeX in SVGCanvas & Numberline');
titleLayout.p('tex-to-svg integration');

titleSlide.addChild(titleLayout);

// Demo Slide
const demoSlide = presentation.slide();
demoSlide.setContent('<h2>MathText Examples</h2>');

// Create HStack for side-by-side layout
const hstack = new HStack({ class: 'r-stretch' });

// SVGCanvas demo (left side)
const svgContainer = document.createElement('div');
svgContainer.style.width = '400px';
svgContainer.style.height = '400px';
svgContainer.style.border = '2px solid #ddd';
svgContainer.style.borderRadius = '8px';
svgContainer.style.background = '#f9f9f9';

const svgCanvas = new SVGCanvas(svgContainer, {
  width: 380,
  height: 380
});

svgCanvas.initialize((svg, config, canvasInstance) => {
  console.log('SVGCanvas initialized');
  
  // Math expressions for debugging
  canvasInstance.mathtext(50, 50, '\\pi r^2', { 
    color: 'red', 
    fontSize: 20 
  });
  
  canvasInstance.mathtext(50, 120, '\\int_0^\\infty e^{-x^2} dx', { 
    color: 'darkgreen', 
    fontSize: 16 
  });
  
  return () => console.log('SVGCanvas cleanup');
});

hstack.addChild(svgContainer);

// Numberline demo (right side)
const numberlineContainer = document.createElement('div');
numberlineContainer.style.width = '400px';
numberlineContainer.style.height = '400px';
numberlineContainer.style.border = '2px solid #ddd';
numberlineContainer.style.borderRadius = '8px';
numberlineContainer.style.background = '#f9f9f9';

const numberlineSvgCanvas = new SVGCanvas(numberlineContainer, {
  width: 380,
  height: 380
});

numberlineSvgCanvas.initialize((svg, config, canvasInstance) => {
  console.log('Numberline initialized');
  
  // Create numberline
  const numberline = new Numberline(-5, 5, 10, svg, {
    width: 320,
    height: 50,
    orientation: 'horizontal'
  });
  numberline.move(30, 100);
  
  // Single point and mathtext for debugging  
  numberline.point(2.5, { fill: 'blue', radius: 5 });
  numberline.mathtext(2.5, '\\pi r^2', { 
    color: 'blue', 
    fontSize: 14 
  });
  
  return () => console.log('Numberline cleanup');
});

hstack.addChild(numberlineContainer);

// Add HStack to slide
demoSlide.addChild(hstack);

// Initialize the presentation
presentation.initialize();

// Export for debugging
window.presentation = presentation;