import { 
  Presentation,
  VStack
} from 'robo-reveal';

/**
 * Test: Accept/Reject SVG Animations
 */

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Create a slide
const slide = presentation.slide();

// Create layout - NO fluent API
const layout = new VStack({ spacing: '1.5em' });

// Create elements with variables for direct reference - NO fluent API
const title = layout.h2('Accept/Reject Animation Test');
const subtitle = layout.p('Watch equations get accepted or rejected!');
const equation1 = layout.p('Correct: $E = mc^2$');
const equation2 = layout.p('Wrong: $E = mc^3$');
const equation3 = layout.p('Correct: $a^2 + b^2 = c^2$');
const equation4 = layout.p('Wrong: $a + b = c$');
const conclusion = layout.p('Animated SVG icons appear to the right!');

// Add the layout to the slide
slide.addChild(layout);

// Test accept animation
equation1.effectFragment(0, {
  onShow: (element) => {
    element.animateAccepted();
  },
  onHide: (element) => {
    element.undoAnimateAccepted();
  }
});

// Test reject animation
equation2.effectFragment(1, {
  onShow: (element) => {
    element.animateRejected();
  },
  onHide: (element) => {
    element.undoAnimateRejected();
  }
});

// Test accept animation
equation3.effectFragment(2, {
  onShow: (element) => {
    element.animateAccepted();
  },
  onHide: (element) => {
    element.undoAnimateAccepted();
  }
});

// Test reject animation
equation4.effectFragment(3, {
  onShow: (element) => {
    element.animateRejected();
  },
  onHide: (element) => {
    element.undoAnimateRejected();
  }
});

// Initialize
presentation.initialize();

console.log('Accept/Reject Animation Test created - SVG icons slide in from right!');