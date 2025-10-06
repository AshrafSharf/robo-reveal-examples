import { 
  Presentation,
  VStack,
  TableBuilder,
  SlideControllerPlugin,
  FragmentRunner
} from 'robo-reveal';

/**
 * Animated Table Test - All Fragment Animations in Tables
 * Tests: backgrounds, borders, highlights, scaling, accept/reject, and math styling
 */

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Slide 1: Background and Border Animations
const slide1 = presentation.slide();
const layout1 = new VStack({ spacing: '1.5em' });

const title1 = layout1.h2('🎨 Background & Color Animations');

// Create table with variables for direct access - NO fluent API
const table1 = new TableBuilder(4, 3);
table1.setBorders('all');

// Headers
const headerA = table1.setCell(0, 0, 'Formula');
const headerB = table1.setCell(0, 1, 'Description');
const headerC = table1.setCell(0, 2, 'Animation');

// Row 1: Background wipe animation
table1.cellMath(1, 0, 'E = mc^2');
table1.setCell(1, 1, 'Energy-mass equivalence');
table1.setCell(1, 2, 'Background wipe →');

// Row 2: Border drawing animation
table1.cellMath(2, 0, 'a^2 + b^2 = c^2');
const desc2Cell = table1.setCell(2, 1, 'Pythagorean theorem');
table1.setCell(2, 2, 'Border drawing ⌐');

// Row 3: Combined animations
table1.cellMath(3, 0, 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');
const desc3Cell = table1.setCell(3, 1, 'Quadratic formula');
table1.setCell(3, 2, 'Combined effects ✨');

slide1.addChild(layout1);
layout1.addChild(table1);

// Fragment animations will be set up after initialization

// Slide 2: Accept/Reject and Highlight Animations
const slide2 = presentation.slide();
const layout2 = new VStack({ spacing: '1.5em' });

const title2 = layout2.h2('✅❌ Accept/Reject & Highlights');

const table2 = new TableBuilder(5, 3);
table2.setBorders('horizontal-only');

// Headers
const headerA2 = table2.setCell(0, 0, 'Statement');
const headerB2 = table2.setCell(0, 1, 'Mathematical Expression');
const headerC2 = table2.setCell(0, 2, 'Verdict');

// Row 1: Correct - Accept
table2.setCell(1, 0, 'Einstein equation');
const math1 = table2.cellMath(1, 1, 'E = mc^2', { background: '#e8f5e8', padding: '0.5em' });
table2.setCell(1, 2, 'CORRECT');

// Row 2: Wrong - Reject
table2.setCell(2, 0, 'Wrong energy equation');
const math2 = table2.cellMath(2, 1, 'E = mc^3', { background: '#ffebee', padding: '0.5em' });
table2.setCell(2, 2, 'WRONG');

// Row 3: Correct - Accept with highlight
table2.setCell(3, 0, 'Pythagorean theorem');
const math3 = table2.cellMath(3, 1, 'a^2 + b^2 = c^2', { background: '#e3f2fd', padding: '0.5em' });
table2.setCell(3, 2, 'PERFECT');

// Row 4: Wrong - Reject with special effect
table2.setCell(4, 0, 'Wrong calculus');
const math4 = table2.cellMath(4, 1, '\\frac{d}{dx}(x^2) = x', { background: '#fff3e0', padding: '0.5em' });
table2.setCell(4, 2, 'INCORRECT');

slide2.addChild(layout2);
layout2.addChild(table2);

// Accept/Reject animations will be set up after initialization

// Slide 3: Complex Math with All Effects
const slide3 = presentation.slide();
const layout3 = new VStack({ spacing: '1.5em' });

const title3 = layout3.h2('🧮 Complex Math Showcase');
const subtitle3 = layout3.p('Advanced mathematical expressions with all animation effects!');

const table3 = new TableBuilder(4, 2);
table3.setBorders('outer-only');

// Headers
const headerA3 = table3.setCell(0, 0, 'Mathematical Field');
const headerB3 = table3.setCell(0, 1, 'Key Formula');

// Calculus - start as plain cell
table3.setCell(1, 0, 'Calculus');
const calculus = table3.cellMath(1, 1, '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}');

// Linear Algebra - start as plain cell
table3.setCell(2, 0, 'Linear Algebra');
const linalg = table3.cellMath(2, 1, '\\det(A) = \\sum_{\\sigma \\in S_n} \\text{sgn}(\\sigma) \\prod_{i=1}^n a_{i,\\sigma(i)}');

// Statistics - start as plain cell
table3.setCell(3, 0, 'Statistics');
const stats = table3.cellMath(3, 1, '\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x f_X(x) dx');

slide3.addChild(layout3);
layout3.addChild(table3);

// Initialize and set up fragment animations after Reveal.js is ready
presentation.initialize().then(() => {
  // Register the audio plugin after Reveal is initialized
  Reveal.registerPlugin(SlideControllerPlugin);
  
  // Initialize FragmentRunner for effectFragment to work
  FragmentRunner.init(Reveal);
  
  // Fragment animations for table1 (Slide 1)
  slide1.effectFragment(0, {
    onShow: () => {
      title1.setContent('🔥 FRAGMENT 0 ACTIVATED - HTML CHANGE WORKS! 🔥');
    },
    onHide: () => {
      title1.setContent('🎨 Background & Color Animations');
    }
  });

  slide1.effectFragment(1, {
    onShow: () => {
      desc2Cell.animateColor('orange', 'black'); // Orange text on black background
    },
    onHide: () => {
      desc2Cell.undoAnimateColor();
    }
  });

  slide1.effectFragment(2, {
    onShow: () => {
      desc3Cell.animateColor('yellow', 'green'); // Yellow text on green background
    },
    onHide: () => {
      desc3Cell.undoAnimateColor();
    }
  });

  // Accept/Reject animations for table2 (Slide 2)
  slide2.effectFragment(0, {
    onShow: () => {
      math1.animateAccepted();
      math1.animateHighlight('green');
    },
    onHide: () => {
      math1.undoAnimateAccepted();
      math1.undoAnimateHighlight();
    }
  });

  slide2.effectFragment(1, {
    onShow: () => {
      math2.animateRejected();
      math2.animateHighlight('red');
    },
    onHide: () => {
      math2.undoAnimateRejected();
      math2.undoAnimateHighlight();
    }
  });

  slide2.effectFragment(2, {
    onShow: () => {
      math3.animateAccepted();
      math3.animateTextStyle('success');
      math3.animateEffect('glow');
    },
    onHide: () => {
      math3.undoAnimateAccepted();
      math3.undoAnimateTextStyle();
      math3.undoAnimateEffect();
    }
  });

  slide2.effectFragment(3, {
    onShow: () => {
      math4.animateRejected();
      math4.animateTextStyle('error');
      math4.animateScale('90');
    },
    onHide: () => {
      math4.undoAnimateRejected();
      math4.undoAnimateTextStyle();
      math4.undoAnimateScale();
    }
  });

  // Complex styling for table3 (Slide 3) - apply original gradient styles
  slide3.effectFragment(0, {
    onShow: () => {
      calculus.setStyles({
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '0.6em',
        borderRadius: '8px'
      });
    },
    onHide: () => {
      calculus.setStyles({
        background: 'transparent',
        color: 'inherit',
        padding: '0',
        borderRadius: '0'
      });
    }
  });

  slide3.effectFragment(1, {
    onShow: () => {
      linalg.setStyles({
        background: 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)',
        color: '#333',
        padding: '0.6em',
        borderRadius: '8px'
      });
    },
    onHide: () => {
      linalg.setStyles({
        background: 'transparent',
        color: 'inherit',
        padding: '0',
        borderRadius: '0'
      });
    }
  });

  slide3.effectFragment(2, {
    onShow: () => {
      stats.setStyles({
        background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
        color: 'white',
        padding: '0.6em',
        borderRadius: '8px'
      });
    },
    onHide: () => {
      stats.setStyles({
        background: 'transparent',
        color: 'inherit',
        padding: '0',
        borderRadius: '0'
      });
    }
  });
});

