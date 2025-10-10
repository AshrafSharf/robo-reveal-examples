import { 
  Presentation,
  VStack,
  HStack,
  SVGCanvas,
  Numberline,
  FragmentRunner,
  PluginInitializer
} from 'robo-reveal';

/**
 * Numberline Inequalities Demo
 * Shows all inequality visualization methods with fragment animations
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

// Title Slide with gradient background
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'slide'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' });
titleLayout.h1('📊 Numberline Inequalities');
titleLayout.h3('Interactive Inequality Visualizations');
titleLayout.p('between(), greaterThan(), lessThan(), absoluteGreaterThan()');

titleSlide.addChild(titleLayout);

// Main Demo Slide with 5 Numberlines
const demoSlide = presentation.slide();

// Add title using HTML content
demoSlide.setContent('<h2>Inequality Demonstrations</h2>');

// Create HStack for fragment controls (like graph-zoom-example)
const controlsHStack = new HStack({ spacing: '2em', align: 'center' });

// Add fragment control boxes
const fragmentTexts = [
  'Show all inequalities with animation',
  'Clear all numberlines',
  'Show intervals only',
  'Show rays only',
  'Show absolute value'
];

fragmentTexts.forEach((text, index) => {
  const fragmentDiv = document.createElement('div');
  fragmentDiv.className = 'fragment';
  fragmentDiv.setAttribute('data-fragment-index', index);
  fragmentDiv.textContent = text;
  fragmentDiv.style.padding = '10px';
  fragmentDiv.style.border = '1px solid #ccc';
  fragmentDiv.style.borderRadius = '5px';
  fragmentDiv.style.fontSize = '14px';
  controlsHStack.addChild(fragmentDiv);
});

demoSlide.addChild(controlsHStack);

// Create VStack for numberlines
const numberlinesVStack = new VStack({ spacing: '1.5em', align: 'center', class: 'r-stretch' });

// Store numberline instances for fragment animations
const numberlines = [];

// Examples configuration
const examples = [
  { label: '2 ≤ x ≤ 5 (closed interval)', type: 'between' },
  { label: 'x > 3 (open ray)', type: 'greaterThan' },
  { label: 'x ≤ -1 (closed ray)', type: 'lessThan' },
  { label: '|x| > 2 (absolute value)', type: 'absoluteGreaterThan' },
  { label: '-3 ≤ x < 4 (mixed interval)', type: 'between-mixed' }
];

// Create numberlines using HStack for each row
examples.forEach((example, index) => {
  const rowHStack = new HStack({ spacing: '2em', align: 'center' });
  
  // Add label
  const labelDiv = document.createElement('div');
  labelDiv.textContent = example.label;
  labelDiv.style.width = '250px';
  labelDiv.style.textAlign = 'right';
  labelDiv.style.fontSize = '16px';
  rowHStack.addChild(labelDiv);
  
  // Create canvas container
  const canvasContainer = document.createElement('div');
  canvasContainer.style.width = '600px';
  canvasContainer.style.height = '80px';
  canvasContainer.style.border = '1px solid #ddd';
  canvasContainer.style.borderRadius = '4px';
  canvasContainer.style.background = '#fafafa';
  
  // Create SVGCanvas for this numberline
  const svgCanvas = new SVGCanvas(canvasContainer, {
    width: 580,
    height: 60
  });
  
  // Initialize the canvas with numberline
  svgCanvas.initialize((svg, config, canvasInstance) => {
    // Create numberline from -6 to 6
    const numberline = new Numberline(-6, 6, 12, svg, {
      width: 560,
      height: 40,
      orientation: 'horizontal',
      labelOffset: 25
    });
    
    // Position the numberline
    numberline.move(10, 20);
    
    // Store numberline with its type for fragment animation
    numberlines.push({ 
      numberline, 
      type: example.type,
      index
    });
    
    return () => {
      console.log('Cleaning up numberline', index);
    };
  });
  
  rowHStack.addChild(canvasContainer);
  numberlinesVStack.addChild(rowHStack);
});

demoSlide.addChild(numberlinesVStack);

// Third Slide - Interactive step-by-step
const interactiveSlide = presentation.slide();

// Add title
interactiveSlide.setContent('<h2>🎯 Step-by-Step Inequality Building</h2>');

// Create fragment controls HStack
const stepControlsHStack = new HStack({ spacing: '1.5em', align: 'center' });

const steps = [
  'Start with empty numberline',
  'Add interval: -2 ≤ x ≤ 3',
  'Clear and show: x > 5',
  'Clear and show: |x| ≥ 4'
];

steps.forEach((text, index) => {
  const fragmentDiv = document.createElement('div');
  fragmentDiv.className = 'fragment';
  fragmentDiv.setAttribute('data-fragment-index', index);
  fragmentDiv.textContent = text;
  fragmentDiv.style.padding = '10px';
  fragmentDiv.style.border = '1px solid #ccc';
  fragmentDiv.style.borderRadius = '5px';
  fragmentDiv.style.fontSize = '14px';
  stepControlsHStack.addChild(fragmentDiv);
});

interactiveSlide.addChild(stepControlsHStack);

// Create large canvas for step-by-step demo
const stepVStack = new VStack({ spacing: '2em', align: 'center', class: 'r-stretch' });

const stepContainer = document.createElement('div');
stepContainer.style.width = '800px';
stepContainer.style.height = '200px';
stepContainer.style.border = '2px solid #ddd';
stepContainer.style.borderRadius = '8px';
stepContainer.style.background = '#fafafa';
stepContainer.style.margin = '20px auto';

const stepCanvas = new SVGCanvas(stepContainer, {
  width: 780,
  height: 180
});

let stepNumberline;
stepCanvas.initialize((svg, config, canvasInstance) => {
  stepNumberline = new Numberline(-10, 10, 20, svg, {
    width: 760,
    height: 100,
    orientation: 'horizontal',
    labelOffset: 30
  });
  stepNumberline.move(10, 50);
  
  return () => {
    console.log('Cleaning up step numberline');
  };
});

stepVStack.addChild(stepContainer);
interactiveSlide.addChild(stepVStack);

// Initialize the presentation
presentation.initialize();

// After initialization, set up fragment animations
pluginsLoaded.then(() => {
  if (typeof Reveal !== 'undefined') {
    // Initialize FragmentRunner
    FragmentRunner.init(Reveal);
    
    // Fragment animations for main demo slide
    const inequalityConfigs = [
      { // Fragment 0: Show all
        types: ['between', 'greaterThan', 'lessThan', 'absoluteGreaterThan', 'between-mixed'],
        action: 'show'
      },
      { // Fragment 1: Clear all
        action: 'clear'
      },
      { // Fragment 2: Show intervals only
        types: ['between', 'between-mixed'],
        action: 'show'
      },
      { // Fragment 3: Show rays only
        types: ['greaterThan', 'lessThan'],
        action: 'show'
      },
      { // Fragment 4: Show absolute value
        types: ['absoluteGreaterThan'],
        action: 'show'
      }
    ];
    
    inequalityConfigs.forEach((config, fragmentIndex) => {
      FragmentRunner.register({
        slide: 1, // Demo slide index
        fragment: fragmentIndex,
        forward: (context) => {
          numberlines.forEach(({ numberline, type }) => {
            if (config.action === 'clear') {
              numberline.clearDrawings();
            } else if (config.types && config.types.includes(type)) {
              // Clear first then draw
              numberline.clearDrawings();
              
              // Draw the appropriate inequality with animation
              switch(type) {
                case 'between':
                  numberline.between({
                    left: 2,
                    right: 5,
                    leftOpenOrClose: 'closed',
                    rightOpenOrClose: 'closed'
                  }, {
                    animate: true,
                    duration: 800,
                    lineStroke: '#2196f3'
                  });
                  break;
                  
                case 'greaterThan':
                  numberline.greaterThan(3, 'open', {
                    animate: true,
                    duration: 800,
                    lineStroke: '#4caf50'
                  });
                  break;
                  
                case 'lessThan':
                  numberline.lessThan(-1, 'closed', {
                    animate: true,
                    duration: 800,
                    lineStroke: '#f44336'
                  });
                  break;
                  
                case 'absoluteGreaterThan':
                  numberline.absoluteGreaterThan(2, 'open', {
                    animate: true,
                    duration: 800,
                    lineStroke: '#9c27b0'
                  });
                  break;
                  
                case 'between-mixed':
                  numberline.between({
                    left: -3,
                    right: 4,
                    leftOpenOrClose: 'closed',
                    rightOpenOrClose: 'open'
                  }, {
                    animate: true,
                    duration: 800,
                    lineStroke: '#ff9800'
                  });
                  break;
              }
            }
          });
        },
        backward: (context) => {
          // Clear all on backward navigation
          numberlines.forEach(({ numberline }) => {
            numberline.clearDrawings();
          });
        }
      });
    });
    
    // Fragment animations for interactive slide
    steps.forEach((step, index) => {
      if (index > 0) {
        FragmentRunner.register({
          slide: 2, // Interactive slide index
          fragment: index,
          forward: (context) => {
            stepNumberline.clearDrawings();
            
            switch(index) {
              case 1:
                // Show interval -2 ≤ x ≤ 3
                stepNumberline.between({
                  left: -2,
                  right: 3,
                  leftOpenOrClose: 'closed',
                  rightOpenOrClose: 'closed'
                }, {
                  animate: true,
                  duration: 1000,
                  lineStroke: '#2196f3',
                  lineWidth: 5
                });
                break;
              case 2:
                // Show x > 5
                stepNumberline.greaterThan(5, 'open', {
                  animate: true,
                  duration: 1000,
                  lineStroke: '#4caf50',
                  lineWidth: 5
                });
                break;
              case 3:
                // Show |x| ≥ 4
                stepNumberline.absoluteGreaterThan(4, 'closed', {
                  animate: true,
                  duration: 1000,
                  lineStroke: '#9c27b0',
                  lineWidth: 5
                });
                break;
            }
          },
          backward: (context) => {
            stepNumberline.clearDrawings();
          }
        });
      }
    });
    
    console.log('Fragment animations registered');
  }
});

// Export for debugging
window.presentation = presentation;