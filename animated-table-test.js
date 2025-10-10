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

// Create table with direct access - NO fluent API
const table1 = new TableBuilder(4, 3);
table1.setBorders('all');

// Headers
table1.setText(0, 0, 'Formula');
table1.setText(0, 1, 'Description');
table1.setText(0, 2, 'Animation');

// Row 1: Background wipe animation
table1.setMath(1, 0, 'E = mc^2');
table1.setText(1, 1, 'Energy-mass equivalence');
table1.setText(1, 2, 'Background wipe →');

// Row 2: Border drawing animation
table1.setMath(2, 0, 'a^2 + b^2 = c^2');
table1.setText(2, 1, 'Pythagorean theorem');
table1.setText(2, 2, 'Border drawing ⌐');

// Row 3: Combined animations
table1.setMath(3, 0, 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');
table1.setText(3, 1, 'Quadratic formula');
table1.setText(3, 2, 'Combined effects ✨');

slide1.addChild(layout1);
layout1.addChild(table1);

// No need to store cells - use table methods directly

// Slide 2: Accept/Reject and Highlight Animations
const slide2 = presentation.slide();
const layout2 = new VStack({ spacing: '1.5em' });

const title2 = layout2.h2('✅❌ Accept/Reject & Highlights');

const table2 = new TableBuilder(5, 3);
table2.setBorders('horizontal-only');

// Headers
table2.setText(0, 0, 'Statement');
table2.setText(0, 1, 'Mathematical Expression');
table2.setText(0, 2, 'Verdict');

// Row 1: Correct - Accept
table2.setText(1, 0, 'Einstein equation');
table2.setMath(1, 1, 'E = mc^2', { background: '#e8f5e8', padding: '0.5em' });
table2.setText(1, 2, 'CORRECT');

// Row 2: Wrong - Reject
table2.setText(2, 0, 'Wrong energy equation');
table2.setMath(2, 1, 'E = mc^3', { background: '#ffebee', padding: '0.5em' });
table2.setText(2, 2, 'WRONG');

// Row 3: Correct - Accept with highlight
table2.setText(3, 0, 'Pythagorean theorem');
table2.setMath(3, 1, 'a^2 + b^2 = c^2', { background: '#e3f2fd', padding: '0.5em' });
table2.setText(3, 2, 'PERFECT');

// Row 4: Wrong - Reject with special effect
table2.setText(4, 0, 'Wrong calculus');
table2.setMath(4, 1, '\\frac{d}{dx}(x^2) = x', { background: '#fff3e0', padding: '0.5em' });
table2.setText(4, 2, 'INCORRECT');

slide2.addChild(layout2);
layout2.addChild(table2);

// Slide 3: Complex Math with All Effects
const slide3 = presentation.slide();
const layout3 = new VStack({ spacing: '1.5em' });

const title3 = layout3.h2('🧮 Complex Math Showcase');

const table3 = new TableBuilder(4, 2);
table3.setBorders('outer-only');

// Headers
table3.setText(0, 0, 'Mathematical Field');
table3.setText(0, 1, 'Key Formula');

// Calculus - start as plain cell
table3.setText(1, 0, 'Calculus');
table3.setMath(1, 1, '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}');

// Linear Algebra - start as plain cell
table3.setText(2, 0, 'Linear Algebra');
table3.setMath(2, 1, '\\det(A) = \\sum_{\\sigma \\in S_n} \\text{sgn}(\\sigma) \\prod_{i=1}^n a_{i,\\sigma(i)}');

// Statistics - start as plain cell
table3.setText(3, 0, 'Statistics');
table3.setMath(3, 1, '\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x f_X(x) dx');

slide3.addChild(layout3);
layout3.addChild(table3);

// ============================================
// FRAGMENT SETUP - Must be BEFORE initialization
// ============================================

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
      table1.animateColor(2, 1, 'orange', 'black');
    },
    onHide: () => {
      table1.resetColor(2, 1);
    }
  });

  slide1.effectFragment(2, {
    onShow: () => {
      table1.animateColor(3, 1, 'yellow', 'green');
    },
    onHide: () => {
      table1.resetColor(3, 1);
    }
  });

  // Accept/Reject animations for table2 (Slide 2)
  slide2.effectFragment(0, {
    onShow: () => {
      table2.addMark(1, 1, 'reveal-accepted');
    },
    onHide: () => {
      table2.removeMark(1, 1, 'reveal-accepted');
    }
  });

  slide2.effectFragment(1, {
    onShow: () => {
      table2.addMark(2, 1, 'reveal-rejected');
    },
    onHide: () => {
      table2.removeMark(2, 1, 'reveal-rejected');
    }
  });

  slide2.effectFragment(2, {
    onShow: () => {
      table2.addMark(3, 1, 'reveal-accepted');
    },
    onHide: () => {
      table2.removeMark(3, 1, 'reveal-accepted');
    }
  });

  slide2.effectFragment(3, {
    onShow: () => {
      table2.addMark(4, 1, 'reveal-rejected');
    },
    onHide: () => {
      table2.removeMark(4, 1, 'reveal-rejected');
    }
  });

  // Complex styling for table3 (Slide 3) - apply gradient styles using table methods
  slide3.effectFragment(0, {
    onShow: () => {
      table3.applyGradient(1, 1, 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'white');
    },
    onHide: () => {
      table3.removeGradient(1, 1);
    }
  });

  slide3.effectFragment(1, {
    onShow: () => {
      table3.applyGradient(2, 1, 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)', '#333');
    },
    onHide: () => {
      table3.removeGradient(2, 1);
    }
  });

slide3.effectFragment(2, {
  onShow: () => {
    table3.applyGradient(3, 1, 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)', 'white');
  },
  onHide: () => {
    table3.removeGradient(3, 1);
  }
});

// ============================================
// INITIALIZATION - After all fragments are set up
// ============================================

// Initialize and set up fragment animations after Reveal.js is ready
presentation.initialize().then(() => {
  // Register the audio plugin after Reveal is initialized
  Reveal.registerPlugin(SlideControllerPlugin);
  
  // Initialize FragmentRunner for effectFragment callbacks to work
  FragmentRunner.init(Reveal);
  
  console.log('Presentation initialized with fragments ready!');
});

// Export for debugging
window.presentation = presentation;