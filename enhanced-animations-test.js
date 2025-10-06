import { 
  Presentation,
  VStack,
  SlideControllerPlugin
} from 'robo-reveal';

/**
 * Test: Enhanced Animations with Wiping and Drawing Effects
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
const title = layout.h2('Enhanced Animation Test');
const subtitle = layout.p('Watch backgrounds wipe and borders draw!');
const equation1 = layout.p('Einstein\'s equation: $E = mc^2$');
const equation2 = layout.p('Pythagorean theorem: $a^2 + b^2 = c^2$');
const equation3 = layout.p('Quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$');
const conclusion = layout.p('Beautiful wiping and drawing animations!');

// Add the layout to the slide
slide.addChild(layout);

// Initialize and set up fragment animations after Reveal.js is ready
presentation.initialize().then(() => {
  // Register the audio plugin after Reveal is initialized
  Reveal.registerPlugin(SlideControllerPlugin);
  
  // Initialize FragmentRunner for effectFragment to work
  FragmentRunner.init(Reveal);

  // Test enhanced animations with wiping backgrounds
  slide.effectFragment(0, {
    onShow: () => {
      console.log('Fragment 0 onShow: Animating equation1 background to yellow');
      console.log('equation1 element:', equation1);
      console.log('equation1 DOM element:', equation1.element);
      console.log('equation1 classes before:', equation1.element.className);
      equation1.animateBackground('yellow');  // Now wipes left-to-right!
      console.log('equation1 classes after:', equation1.element.className);
    },
    onHide: () => {
      console.log('Fragment 0 onHide: Undoing equation1 background');
      equation1.undoAnimateBackground();
    }
  });

  // Test enhanced animations with drawing borders
  slide.effectFragment(1, {
    onShow: () => {
      equation2.animateBorder({ color: 'blue', thickness: 'thick' });  // Now draws clockwise!
    },
    onHide: () => {
      equation2.undoAnimateBorder();
    }
  });

  // Test combined wiping background + drawing border
  slide.effectFragment(2, {
    onShow: () => {
      equation3.animateBackground('light-green');  // Wipes in
      equation3.animateBorder({ color: 'green' });  // Draws around
      equation3.animateScale('110');  // Scales up
    },
    onHide: () => {
      equation3.undoAnimateBackground();
      equation3.undoAnimateBorder();
      equation3.undoAnimateScale();
    }
  });

  // Test text styling animation
  slide.effectFragment(3, {
    onShow: () => {
      conclusion.animateTextStyle('accent');  // Applies text-accent styling
      conclusion.animateEffect('pulse');  // Adds pulsing effect
    },
    onHide: () => {
      conclusion.undoAnimateTextStyle();
      conclusion.undoAnimateEffect();
    }
  });
});

console.log('Enhanced Animations Test created - backgrounds wipe, borders draw!');