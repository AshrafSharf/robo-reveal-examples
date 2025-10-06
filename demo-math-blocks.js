import { 
  Presentation,
  VStack
} from 'robo-reveal';

/**
 * Demo: Styled Math Blocks
 * Exactly 2 slides - Title and Demo
 */

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Slide 1: Title
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  transition: 'zoom'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' });
titleLayout.h1('Styled Math Blocks');
titleLayout.h3('Beautiful colored equation highlights');
titleLayout.p('Make equations stand out with custom backgrounds');

titleSlide.addChild(titleLayout);

// Slide 2: Demo
const demoSlide = presentation.slide();

const demoLayout = new VStack({ spacing: '0.8em' });
demoLayout.h2('Colorful Math Blocks');
demoLayout.mathBlock('E = mc^2', { 
  background: '#ffeb3b',
  color: '#000',
  padding: '0.3em 0.6em',
  borderRadius: '6px',
  fontWeight: '500'
});
demoLayout.mathBlock('\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}', {
  background: '#2196f3',
  padding: '0.3em 0.6em',
  borderRadius: '6px',
  color: 'white'
});
demoLayout.mathBlock('F = ma', {
  background: '#e91e63',
  color: 'white',
  padding: '0.3em 0.6em',
  borderRadius: '6px',
  fontWeight: '600'
});
demoLayout.mathBlock('a^2 + b^2 = c^2', {
  background: '#4caf50',
  color: 'white',
  padding: '0.3em 0.6em',
  borderRadius: '6px'
});
demoLayout.mathBlock('\\frac{d}{dx}(x^n) = nx^{n-1}', {
  background: '#ff9800',
  color: 'white',
  padding: '0.3em 0.6em',
  borderRadius: '6px'
});

demoSlide.addChild(demoLayout);

// Initialize
presentation.initialize();