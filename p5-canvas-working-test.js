import { 
  Presentation,
  VStack,
  HStack,
  SVGCanvas,
  P5Canvas,
  PluginInitializer,
  SlideControllerPlugin,
  AnimatedDiagram,
  Numberline,
  FragmentRunner
} from 'robo-reveal';

/**
 * Enhanced Canvas Classes for Fragment Demonstrations
 */

// Enhanced SVGCanvas with custom mathtext behaviors
class EnhancedSVGCanvas extends SVGCanvas {
  constructor(containerElement, options) {
    super(containerElement, options);
    this.mathLabelsGroup = null;
    this.interactionElements = [];
  }
  
  showMathLabels() {
    if (this.mathLabelsGroup) return; // Already shown
    
    // Create a group to contain all math labels
    this.mathLabelsGroup = this.svgInstance.group();
    
    // Add various mathematical expressions using the mathtext method
    const labels = [
      { x: 50, y: 100, latex: 'E = mc^2', color: '#e74c3c' },
      { x: 200, y: 150, latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}', color: '#3498db' },
      { x: 100, y: 250, latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', color: '#2ecc71' }
    ];
    
    labels.forEach(({ x, y, latex, color }) => {
      const mathElement = this.mathtext(x, y, latex, { color, fontSize: 16 });
      if (mathElement) {
        this.mathLabelsGroup.add(mathElement);
      }
    });
  }
  
  hideMathLabels() {
    if (this.mathLabelsGroup) {
      this.mathLabelsGroup.remove();
      this.mathLabelsGroup = null;
    }
  }
  
  enableInteractions() {
    if (this.interactionElements.length > 0) return; // Already enabled
    
    // Add interactive hover effects to existing elements
    const hoverCircle = this.svgInstance.circle(50)
      .fill('#f39c12')
      .stroke({ color: '#e67e22', width: 3 })
      .center(300, 300)
      .css('cursor', 'pointer');
    
    hoverCircle.mouseover(() => hoverCircle.animate().scale(1.2));
    hoverCircle.mouseout(() => hoverCircle.animate().scale(1));
    
    this.interactionElements.push(hoverCircle);
  }
  
  disableInteractions() {
    this.interactionElements.forEach(el => el.remove());
    this.interactionElements = [];
  }
}

// Enhanced AnimatedDiagram with on-demand shape creation
class EnhancedAnimatedDiagram extends AnimatedDiagram {
  constructor(containerElement, options) {
    super(containerElement, options);
    this.shapesCreated = {
      vector: false,
      circle: false,
      point: false,
      math: false
    };
    this.zoomed = false;
  }
  
  showVectorAndLine() {
    if (!this.shapesCreated.vector) {
      this.vector({x: 0, y: 0}, {x: 5, y: 5}, 'v1', 'red');
      this.shapesCreated.vector = true;
    }
  }
  
  showCirclesAndPolygon() {
    if (!this.shapesCreated.circle) {
      this.circle({x: 0, y: 0}, 2, 'origin', 'blue');
      this.shapesCreated.circle = true;
    }
  }
  
  showPointAndMath() {
    if (!this.shapesCreated.point) {
      this.point({x: 5, y: 5}, 'P', 'green');
      this.shapesCreated.point = true;
    }
    if (!this.shapesCreated.math) {
      this.mathText({x: 0, y: 0}, '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}', 'red', {fontSize: 12});
      this.shapesCreated.math = true;
    }
  }
  
  performZoomIn() {
    if (!this.zoomed) {
      this.zoomIn({x: 0, y: 0}, {scale: 0.5, duration: 1});
      this.zoomed = true;
    }
  }
  
  performZoomOut() {
    if (this.zoomed) {
      this.zoomOut({duration: 1});
      this.zoomed = false;
    }
  }
}

// Enhanced P5Canvas with custom trail and ball behaviors  
class EnhancedP5Canvas extends P5Canvas {
  constructor(containerElement, options) {
    super(containerElement, options);
    this.trailEnabled = false;
    this.extraBalls = [];
    this.ballColor = [255, 150, 50]; // Original color
  }
  
  enableTrail() {
    this.trailEnabled = true;
  }
  
  disableTrail() {
    this.trailEnabled = false;
  }
  
  changeBallColor(newColor) {
    this.ballColor = newColor;
  }
  
  resetBallColor() {
    this.ballColor = [255, 150, 50]; // Original color
  }
  
  addExtraBalls() {
    if (this.extraBalls.length === 0) {
      this.extraBalls = [
        { x: 100, y: 100, speedX: 2, speedY: 3, color: [255, 100, 100] },
        { x: 300, y: 300, speedX: -2.5, speedY: -1.5, color: [100, 255, 100] },
        { x: 150, y: 250, speedX: 1.5, speedY: -2.5, color: [100, 100, 255] }
      ];
    }
  }
  
  removeExtraBalls() {
    this.extraBalls = [];
  }
}

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
// First diagram (left side) - declare outside for fragment access
let enhancedLeftDiagram;

hstack.animatedDiagram(400, 400, {
  id: 'left-graph',
  showGrid: true,
  xRange: [-10, 10],
  yRange: [-10, 10]
}, (container, config) => {
  console.log('Left diagram callback called with:', container, config);
  
  // Ensure container has explicit dimensions to prevent negative rect height
  container.style.width = '400px';
  container.style.height = '400px';
  
  // Create enhanced animated diagram with provided dimensions
  enhancedLeftDiagram = new EnhancedAnimatedDiagram(container, config);
  
  console.log('Left diagram created with dimensions:', config.width, 'x', config.height);
  
  // Return cleanup function
  return () => {
    console.log('Cleaning up left diagram');
    enhancedLeftDiagram.clearAll();
    enhancedLeftDiagram.destroy();
  };
});

// Second diagram (right side) - enhanced class with different shapes
class EnhancedRightDiagram extends AnimatedDiagram {
  constructor(containerElement, options) {
    super(containerElement, options);
    this.shapesCreated = {
      line: false,
      polygon: false,
      math: false
    };
    this.zoomed = false;
  }
  
  showVectorAndLine() {
    if (!this.shapesCreated.line) {
      this.line({x: -3, y: -3}, {x: 3, y: 3}, 'diagonal', 'purple');
      this.shapesCreated.line = true;
    }
  }
  
  showCirclesAndPolygon() {
    if (!this.shapesCreated.polygon) {
      this.polygon([{x: -2, y: -2}, {x: 2, y: -2}, {x: 2, y: 2}, {x: -2, y: 2}], 'square', 'orange');
      this.shapesCreated.polygon = true;
    }
  }
  
  showPointAndMath() {
    if (!this.shapesCreated.math) {
      this.mathText({x: 0, y: 0}, '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', 'purple', {fontSize: 12});
      this.shapesCreated.math = true;
    }
  }
  
  performZoomIn() {
    if (!this.zoomed) {
      this.zoomIn({x: 0, y: 0}, {scale: 0.5, duration: 1});
      this.zoomed = true;
    }
  }
  
  performZoomOut() {
    if (this.zoomed) {
      this.zoomOut({duration: 1});
      this.zoomed = false;
    }
  }
}

// Declare outside for fragment access
let enhancedRightDiagram;

hstack.animatedDiagram(400, 400, {
  id: 'right-graph',
  showGrid: true,
  xRange: [-5, 5],
  yRange: [-5, 5]
}, (container, config) => {
  console.log('Right diagram callback called with:', container, config);
  
  // Ensure container has explicit dimensions to prevent negative rect height
  container.style.width = '400px';
  container.style.height = '400px';
  
  // Create enhanced animated diagram with provided dimensions
  enhancedRightDiagram = new EnhancedRightDiagram(container, config);
  
  console.log('Right diagram created with dimensions:', config.width, 'x', config.height);
  
  // Return cleanup function
  return () => {
    console.log('Cleaning up right diagram');
    enhancedRightDiagram.clearAll();
    enhancedRightDiagram.destroy();
  };
});

// Add HStack to slide
graphSlide.addChild(hstack);

// Set up effect fragments to control the enhanced diagrams
// Fragment 0: Show vectors and line
graphSlide.effectFragment(0, {
  onShow: () => {
    console.log('Fragment 0: Show vectors and line');
    if (enhancedLeftDiagram) enhancedLeftDiagram.showVectorAndLine();
    if (enhancedRightDiagram) enhancedRightDiagram.showVectorAndLine();
  },
  onHide: () => {
    console.log('Fragment 0: Hide vectors and line');
    // Shapes remain visible when navigating backwards
  }
});

// Fragment 1: Show circles and polygon
graphSlide.effectFragment(1, {
  onShow: () => {
    console.log('Fragment 1: Show circles and polygon');
    if (enhancedLeftDiagram) enhancedLeftDiagram.showCirclesAndPolygon();
    if (enhancedRightDiagram) enhancedRightDiagram.showCirclesAndPolygon();
  },
  onHide: () => {
    console.log('Fragment 1: Hide circles and polygon');
    // Don't hide previous shapes, just this fragment's shapes
  }
});

// Fragment 2: Show point and math
graphSlide.effectFragment(2, {
  onShow: () => {
    console.log('Fragment 2: Show point and math');
    if (enhancedLeftDiagram) enhancedLeftDiagram.showPointAndMath();
    if (enhancedRightDiagram) enhancedRightDiagram.showPointAndMath();
  },
  onHide: () => {
    console.log('Fragment 2: Hide point and math');
    // Don't hide previous shapes, just this fragment's shapes
  }
});

// Fragment 3: Zoom in to center
graphSlide.effectFragment(3, {
  onShow: () => {
    console.log('Fragment 3: Zoom in to center');
    if (enhancedLeftDiagram) enhancedLeftDiagram.performZoomIn();
    if (enhancedRightDiagram) enhancedRightDiagram.performZoomIn();
  },
  onHide: () => {
    console.log('Fragment 3: Zoom out from center');
    if (enhancedLeftDiagram) enhancedLeftDiagram.performZoomOut();
    if (enhancedRightDiagram) enhancedRightDiagram.performZoomOut();
  }
});

// Fragment 4: Zoom out
graphSlide.effectFragment(4, {
  onShow: () => {
    console.log('Fragment 4: Zoom out');
    if (enhancedLeftDiagram) enhancedLeftDiagram.performZoomOut();
    if (enhancedRightDiagram) enhancedRightDiagram.performZoomOut();
  },
  onHide: () => {
    console.log('Fragment 4: Zoom back in');
    if (enhancedLeftDiagram) enhancedLeftDiagram.performZoomIn();
    if (enhancedRightDiagram) enhancedRightDiagram.performZoomIn();
  }
});

// Fourth Slide - P5Canvas + SVGCanvas Side-by-Side Demo
const combinedCanvasSlide = presentation.slide();
combinedCanvasSlide.element.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');

// Add title using HTML content
combinedCanvasSlide.setContent('<h2>🎨 P5Canvas + SVGCanvas Fragment Demo</h2>');

// Set up invisible effect fragments for canvas animations
// Fragment 0: Basic animations (auto-start)
combinedCanvasSlide.effectFragment(0, {
  onShow: () => console.log('Fragment 0: Basic animations started'),
  onHide: () => console.log('Fragment 0: Basic animations hidden')
});

// Fragment 1: Add visual effects
combinedCanvasSlide.effectFragment(1, {
  onShow: () => enhancedP5Canvas.enableTrail(),
  onHide: () => enhancedP5Canvas.disableTrail()
});

// Fragment 2: Show math labels  
combinedCanvasSlide.effectFragment(2, {
  onShow: () => enhancedSVGCanvas.showMathLabels(),
  onHide: () => enhancedSVGCanvas.hideMathLabels()
});

// Fragment 3: Interactive elements
combinedCanvasSlide.effectFragment(3, {
  onShow: () => {
    enhancedP5Canvas.changeBallColor([255, 50, 150]);
    enhancedP5Canvas.addExtraBalls();
    enhancedSVGCanvas.enableInteractions();
  },
  onHide: () => {
    enhancedP5Canvas.resetBallColor();
    enhancedP5Canvas.removeExtraBalls();
    enhancedSVGCanvas.disableInteractions();
  }
});

// Create HStack for side-by-side canvas layout
const combinedHstack = new HStack({ class: 'r-stretch' });

// Create enhanced canvas instances (declared outside for fragment access)
let enhancedP5Canvas, enhancedSVGCanvas;

// Create P5Canvas using HStack method - container created automatically
combinedHstack.p5Canvas(400, 400, {
  id: 'enhanced-p5-canvas'
}, (p, config, canvasInstance) => {
  // Create enhanced instance using the canvasInstance
  enhancedP5Canvas = new EnhancedP5Canvas(canvasInstance.containerElement, config);
  // Copy necessary properties from the canvasInstance
  enhancedP5Canvas.p5Instance = canvasInstance.p5Instance;
  
  let ballX = 200, ballY = 200;
  let ballSpeedX = 3, ballSpeedY = 2.5;
  
  p.draw = function() {
    // Use trail state from enhanced class
    if (enhancedP5Canvas.trailEnabled) {
      p.background(30, 60, 120, 50); // Transparent background for trail
    } else {
      p.background(30, 60, 120); // Solid background
    }
    
    // Update main ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Bounce off walls
    if (ballX <= 25 || ballX >= 375) ballSpeedX *= -1;
    if (ballY <= 25 || ballY >= 375) ballSpeedY *= -1;
    
    // Draw main ball using enhanced class color
    p.fill(...enhancedP5Canvas.ballColor);
    p.stroke(255);
    p.strokeWeight(3);
    p.circle(ballX, ballY, 50);
    
    // Draw extra balls if any
    enhancedP5Canvas.extraBalls.forEach(ball => {
      ball.x += ball.speedX;
      ball.y += ball.speedY;
      
      // Bounce extra balls
      if (ball.x <= 25 || ball.x >= 375) ball.speedX *= -1;
      if (ball.y <= 25 || ball.y >= 375) ball.speedY *= -1;
      
      p.fill(...ball.color);
      p.circle(ball.x, ball.y, 30);
    });
    
    // Title text
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.text('Enhanced P5Canvas', 200, 30);
    p.textSize(14);
    p.text('Fragment Controls', 200, 50);
  };
});

// Create SVGCanvas using HStack method - container created automatically
combinedHstack.svgCanvas(400, 400, {
  id: 'enhanced-svg-canvas'
}, (svg, config, canvasInstance) => {
  // Create enhanced instance using the canvasInstance
  enhancedSVGCanvas = new EnhancedSVGCanvas(canvasInstance.containerElement, config);
  // Set the svg instance
  enhancedSVGCanvas.svgInstance = canvasInstance.svgInstance;
  
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
  numberline.group.move(25, 200);
  
  // Add title text
  svg.text('Enhanced SVGCanvas')
    .font({ size: 18, family: 'Arial', fill: '#333' })
    .cx(200).cy(50);
    
  svg.text('Fragment-Controlled Mathtext')
    .font({ size: 14, family: 'Arial', fill: '#666' })
    .cx(200).cy(75);
});

// Add HStack to slide
combinedCanvasSlide.addChild(combinedHstack);

// Fifth Slide - SVGCanvas mathtext method demonstration
const mathtextSlide = presentation.slide();
mathtextSlide.element.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');

// Add title using HTML content
mathtextSlide.setContent('<h2>📐 SVGCanvas mathtext() Method Demo</h2>');

// Create HStack for side-by-side layout
const mathtextHstack = new HStack({ class: 'r-stretch' });

// Left side: SVGCanvas with direct mathtext usage
mathtextHstack.svgCanvas(600, 500, {
  id: 'mathtext-demo-canvas'
}, (svg, config, canvasInstance) => {
  console.log('Mathtext demo SVGCanvas callback called with:', svg, config, canvasInstance);
  
  // Add title text
  const titleText = svg.text('Direct mathtext() Method Usage')
    .font({ size: 20, family: 'Arial', fill: '#333' })
    .cx(300).cy(30);
    
  // Demonstrate various mathtext examples using the mathtext method directly
  const examples = [
    { x: 50, y: 80, latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}', color: '#ff6b6b' },
    { x: 50, y: 130, latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}', color: '#4ecdc4' },
    { x: 50, y: 180, latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1', color: '#45b7d1' },
    { x: 50, y: 230, latex: '\\nabla \\cdot \\vec{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y}', color: '#f39c12' },
    { x: 50, y: 280, latex: 'E = mc^2', color: '#e74c3c' },
    { x: 50, y: 330, latex: '\\alpha + \\beta = \\gamma \\quad \\text{where } \\alpha, \\beta \\in \\mathbb{R}', color: '#9b59b6' },
    { x: 50, y: 380, latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax+by \\\\ cx+dy \\end{bmatrix}', color: '#1abc9c' }
  ];
  
  // Use the mathtext method to create each equation
  examples.forEach((example, index) => {
    try {
      const mathGroup = canvasInstance.mathtext(example.x, example.y, example.latex, {
        color: example.color,
        fontSize: 14
      });
      
      if (mathGroup) {
        console.log(`Created mathtext example ${index + 1}: ${example.latex}`);
      } else {
        console.warn(`Failed to create mathtext example ${index + 1}`);
      }
    } catch (error) {
      console.error(`Error creating mathtext example ${index + 1}:`, error);
    }
  });
  
  // Add some visual dividers
  const dividers = [70, 120, 170, 220, 270, 320, 370];
  dividers.forEach(y => {
    svg.line(30, y, 570, y)
      .stroke({ color: '#eee', width: 1 });
  });
  
  console.log('Mathtext demo SVGCanvas created with dimensions:', config.width, 'x', config.height);
});

// Add HStack to slide
mathtextSlide.addChild(mathtextHstack);

// Initialize plugins first, then presentation
const initializePresentation = async () => {
  await PluginInitializer.initialize();
  const Reveal = await presentation.initialize();
  
  // Initialize FragmentRunner after presentation is ready
  FragmentRunner.init(Reveal);
  console.log('FragmentRunner initialized');
};

initializePresentation();

// Export for debugging
window.presentation = presentation;