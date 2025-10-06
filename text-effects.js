import { 
  Presentation,
  VStack,
  HStack
} from 'robo-reveal';

/**
 * Feature Presentation: Text Effects & Styling
 */

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Title Slide
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  transition: 'zoom'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' });
titleLayout.h1('Text Effects & Styling');
titleLayout.h3('Dynamic Typography');
titleLayout.p('Highlights, animations, and typewriter effects');

titleSlide.addChild(titleLayout);

// Text Highlighting
const highlightSlide = presentation.slide();

const highlightLayout = new VStack({ spacing: '1em' });
highlightLayout.h2('Text Highlighting');
highlightLayout.p('Various highlighting styles:');
highlightLayout.p('This has a <span class="text-highlight">yellow highlight</span> for emphasis');
highlightLayout.p('Use <span class="text-accent">pink accent</span> for special terms');
highlightLayout.p('Show <span class="text-info">info in blue</span> for notes');
highlightLayout.p('Mark <span class="text-success">success in green</span> for positive');
highlightLayout.p('Show <span class="text-warning">warnings in orange</span> for caution');
highlightLayout.p('Display <span class="text-error">errors in red</span> for critical');
highlightLayout.p('Use <span class="text-code">inline code style</span> for code');

highlightSlide.addChild(highlightLayout);

// Text Effects
const effectsSlide = presentation.slide();

const effectsLayout = new VStack({ spacing: '1em' });
effectsLayout.h2('Text Effects');
effectsLayout.p('Apply visual effects to text:');
effectsLayout.p('<span class="effect-gradient-text">Gradient text effect</span>');
effectsLayout.p('<span class="text-accent effect-pulse">Pulsing accent text</span>');
effectsLayout.p('<span class="effect-shadow">Text with shadow</span>');
effectsLayout.p('<span class="effect-glow">Glowing text effect</span>');
effectsLayout.p('Mix effects: <span class="text-highlight effect-pulse">Pulsing highlight</span>');

effectsSlide.addChild(effectsLayout);

// Basic Typewriter
const typewriterSlide = presentation.slide();

const typewriterLayout = new VStack({ spacing: '1.5em' });
typewriterLayout.h2('Typewriter Effects');
typewriterLayout.typewriter('Hello! This text is being typed out...', {
  typeSpeed: 60,
  startDelay: 500,
  showCursor: true
});
typewriterLayout.typewriter([
  'Multiple strings can be typed...',
  'They will backspace and retype!',
  'Creating a dynamic effect!'
], {
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  backDelay: 1000,
  startDelay: 2500
});

typewriterSlide.addChild(typewriterLayout);

// Advanced Typewriter
const advancedTypewriterSlide = presentation.slide();

const advancedTypewriterLayout = new VStack({ spacing: '1.5em' });
advancedTypewriterLayout.h2('Advanced Typewriter');
advancedTypewriterLayout.typewriter('Features include:', {
  typeSpeed: 50,
  startDelay: 500,
  showCursor: false
});
advancedTypewriterLayout.ul([
  { text: 'Variable typing speed', fragment: true, 'data-fragment-index': '1' },
  { text: 'Custom cursor characters', fragment: true, 'data-fragment-index': '2' },
  { text: 'Loop and shuffle options', fragment: true, 'data-fragment-index': '3' },
  { text: 'Smart backspacing', fragment: true, 'data-fragment-index': '4' }
]);
advancedTypewriterLayout.typewriter('Pretty powerful!', {
  typeSpeed: 80,
  startDelay: 3000,
  showCursor: true,
  cursorChar: '_'
});

advancedTypewriterSlide.addChild(advancedTypewriterLayout);

// Mixed Content
const mixedSlide = presentation.slide();

const mixedLayout = new VStack({ spacing: '1em' });
mixedLayout.h2('Mixing Text Styles');
mixedLayout.p('Combine multiple styles in one line:');
mixedLayout.p('Math $E = mc^2$ with <span class="text-highlight">highlighting</span>');
mixedLayout.p('<span class="text-accent">Accent text</span> with <span class="text-code">code snippets</span>');
mixedLayout.p('<span class="effect-gradient-text">Gradients</span> and <span class="text-info effect-pulse">pulsing info</span>');
mixedLayout.typewriter('Even with typewriter effects!', {
  typeSpeed: 50,
  startDelay: 1500
});

mixedSlide.addChild(mixedLayout);

// Spacing Control
const spacingSlide = presentation.slide();

const spacingLayout = new VStack({ spacing: '2em' });
spacingLayout.h2('Line Spacing Control');

const compactSection = new VStack({ class: 'compact', spacing: '0.5em' });
compactSection.h3('Compact Spacing');
compactSection.p('Lines are closer together');
compactSection.p('Good for dense information');
compactSection.p('Or lists with many items');

const normalSection = new VStack({ spacing: '0.5em' });
normalSection.h3('Normal Spacing');
normalSection.p('Default line height');
normalSection.p('Standard for most content');
normalSection.p('Balanced readability');

const looseSection = new VStack({ class: 'loose', spacing: '0.5em' });
looseSection.h3('Loose Spacing');
looseSection.p('More breathing room');
looseSection.p('Good for emphasis');
looseSection.p('Or important quotes');

spacingLayout.addChild(compactSection);
spacingLayout.addChild(normalSection);
spacingLayout.addChild(looseSection);

spacingSlide.addChild(spacingLayout);

// FitText Demo
const fitTextSlide = presentation.slide();

const fitTextLayout = new VStack({ spacing: '1.5em', align: 'center' });
fitTextLayout.h2('FitText - Responsive Sizing');
fitTextLayout.fitText('BIG');
fitTextLayout.fitText('RESPONSIVE');
fitTextLayout.fitText('TEXT');
fitTextLayout.p('Text scales to fit the slide width');

fitTextSlide.addChild(fitTextLayout);

// End Slide
const endSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
});

const endLayout = new VStack({ spacing: '2em', align: 'center' });
endLayout.fitText('Text Effects');
endLayout.p('Make your presentations dynamic and engaging');
endLayout.typewriter('Thanks for watching!', {
  typeSpeed: 60,
  startDelay: 500,
  showCursor: true
});

endSlide.addChild(endLayout);

// Initialize
presentation.initialize();

console.log('Feature 05 - Text Effects presentation created!');