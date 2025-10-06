import { 
  Presentation,
  VStack,
  HStack,
  SVGCanvas,
  PluginInitializer,
  SlideControllerPlugin,
  AnimatedDiagram,
  Numberline
} from 'robo-reveal';

/**
 * P5Canvas Test - Using working graph-zoom pattern
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

// Title Slide with audio
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'slide'
});
titleSlide.element.setAttribute('data-audio-src', 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3');

const titleLayout = new VStack({ spacing: '2em', align: 'center' });
titleLayout.h1('🎵 P5Canvas Test');
titleLayout.h3('Working Pattern Demo with Audio');
titleLayout.p('P5.js canvas in robo-reveal');
titleLayout.p('🎧 Notice the audio player at the bottom');

titleSlide.addChild(titleLayout);

// Second Slide - P5Canvas test with audio
const canvasSlide = presentation.slide();
canvasSlide.element.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3');

// Add title using HTML content
canvasSlide.setContent('<h2>🎨 P5Canvas Test with Audio</h2>');

// Create HStack for single P5Canvas (following same pattern)
const canvasHstack = new HStack({ class: 'r-stretch' });

// Using P5Canvas with same pattern as animatedDiagram
canvasHstack.p5Canvas(400, 400, {
  id: 'test-p5-canvas'
}, (p, config, canvasInstance) => {
  console.log('P5Canvas callback called with:', p, config, canvasInstance);
  
  // Simple p5.js animation
  p.draw = function() {
    p.background(50, 100, 150);
    
    // Bouncing circle
    let x = 200 + Math.sin(p.frameCount * 0.02) * 100;
    let y = 200 + Math.cos(p.frameCount * 0.03) * 50;
    
    p.fill(255, 200, 100);
    p.noStroke();
    p.circle(x, y, 50);
    
    // Text
    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.text('P5Canvas Working!', 200, 50);
  };
  
  console.log('P5Canvas created with dimensions:', config.width, 'x', config.height);
});

// Second P5Canvas (right side)
canvasHstack.p5Canvas(400, 400, {
  id: 'test-p5-canvas-2'
}, (p, config, canvasInstance) => {
  console.log('Second P5Canvas callback called with:', p, config, canvasInstance);
  
  let angle = 0;
  
  // Different p5.js animation
  p.draw = function() {
    p.background(100, 50, 100);
    
    // Rotating star
    p.push();
    p.translate(200, 200);
    p.rotate(angle);
    
    p.fill(255, 150, 100);
    p.stroke(255);
    p.strokeWeight(2);
    
    // Draw star
    p.beginShape();
    for (let i = 0; i < 10; i++) {
      let radius = i % 2 === 0 ? 40 : 20;
      let x = radius * Math.cos(i * Math.PI / 5);
      let y = radius * Math.sin(i * Math.PI / 5);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
    
    p.pop();
    
    angle += 0.02;
    
    // Text
    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.text('Second P5Canvas!', 200, 50);
  };
  
  console.log('Second P5Canvas created with dimensions:', config.width, 'x', config.height);
});

// Add HStack to slide
canvasSlide.addChild(canvasHstack);

// Third Slide - Graph-zoom diagrams with fragments
const graphSlide = presentation.slide();
graphSlide.element.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3');

// Add title using HTML content
graphSlide.setContent('<h2>📊 Animated Graphs with Fragments</h2>');

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
  diagram.circle({x: 0, y: 0}, 2, 'origin', 'blue', {fragmentIndex: 1});
  diagram.point({x: 5, y: 5}, 'P', 'green', {fragmentIndex: 2});
  
  // Add complex LaTeX math at origin for testing
  diagram.mathText({x: 0, y: 0}, '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}', 'red', {fragmentIndex: 2, fontSize: 12});
  
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
  diagram.polygon([{x: -2, y: -2}, {x: 2, y: -2}, {x: 2, y: 2}, {x: -2, y: 2}], 'square', 'orange', {fragmentIndex: 1});
  
  // Add complex LaTeX math expression at origin for testing
  diagram.mathText({x: 0, y: 0}, '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', 'purple', {fragmentIndex: 2, fontSize: 12});
  
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

// Fourth Slide - P5Canvas + SVGCanvas Side-by-Side Demo
const combinedCanvasSlide = presentation.slide();
combinedCanvasSlide.element.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');

// Add title using HTML content
combinedCanvasSlide.setContent('<h2>🎨 P5Canvas + SVGCanvas Side-by-Side</h2>');

// Create HStack for side-by-side canvas layout
const combinedHstack = new HStack({ class: 'r-stretch' });

// Left side: P5Canvas with bouncing ball animation
combinedHstack.p5Canvas(400, 400, {
  id: 'combined-p5-canvas'
}, (p, config, canvasInstance) => {
  console.log('Combined P5Canvas callback called with:', p, config, canvasInstance);
  
  let ballX = 200, ballY = 200;
  let ballSpeedX = 3, ballSpeedY = 2.5;
  
  // Simple bouncing ball animation
  p.draw = function() {
    p.background(30, 60, 120);
    
    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Bounce off walls
    if (ballX <= 25 || ballX >= 375) ballSpeedX *= -1;
    if (ballY <= 25 || ballY >= 375) ballSpeedY *= -1;
    
    // Draw ball
    p.fill(255, 150, 50);
    p.stroke(255);
    p.strokeWeight(3);
    p.circle(ballX, ballY, 50);
    
    // Title text
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.text('P5Canvas', 200, 30);
    p.textSize(14);
    p.text('Bouncing Ball', 200, 50);
  };
  
  console.log('Combined P5Canvas created with dimensions:', config.width, 'x', config.height);
});

// Right side: SVGCanvas with Numberline
combinedHstack.svgCanvas(400, 400, {
  id: 'combined-svg-canvas'
}, (svg, config, canvasInstance) => {
  console.log('Combined SVGCanvas callback called with:', svg, config, canvasInstance);
  
  // Create a numberline using the Numberline class
  const numberline = new Numberline(-10, 10, 20, svg, {
    width: 350,
    height: 100,
    tickHeight: 15,
    fontSize: 12,
    color: '#333',
    strokeWidth: 2
  });
  
  // Position the numberline in the center
  numberline.draw();
  const numberlineGroup = numberline.svgGroup;
  numberlineGroup.transform({ x: 25, y: 200 });
  
  // Add title text
  const titleText = svg.text('SVGCanvas + D3 Scale')
    .font({ size: 18, family: 'Arial', fill: '#333' })
    .cx(200).cy(50);
    
  const subtitleText = svg.text('Mathematical Numberline')
    .font({ size: 14, family: 'Arial', fill: '#666' })
    .cx(200).cy(75);
    
  // Add some animated points on the numberline
  const animatedPoints = [];
  for (let i = 0; i < 3; i++) {
    const value = -8 + i * 8; // Points at -8, 0, 8
    const point = svg.circle(8)
      .fill(['#ff6b6b', '#4ecdc4', '#45b7d1'][i])
      .stroke('#fff')
      .strokeWidth(2);
    
    const pointPosition = numberline.scale(value);
    point.cx(25 + pointPosition).cy(200);
    animatedPoints.push(point);
  }
  
  // Simple animation for the points
  let animationFrame = 0;
  const animate = () => {
    animationFrame += 0.05;
    animatedPoints.forEach((point, index) => {
      const bounce = Math.sin(animationFrame + index * 0.5) * 5;
      point.cy(200 + bounce);
    });
    requestAnimationFrame(animate);
  };
  animate();
  
  console.log('Combined SVGCanvas created with dimensions:', config.width, 'x', config.height);
});

// Add HStack to slide
combinedCanvasSlide.addChild(combinedHstack);

// Initialize the presentation with audio plugin
(async () => {
  // Ensure plugins are loaded before initializing presentation
  await pluginsLoaded;
  
  // Initialize presentation
  await presentation.initialize();
  
  // Register the audio plugin after Reveal is initialized
  Reveal.registerPlugin(SlideControllerPlugin);
})();

// Export for debugging
window.presentation = presentation;