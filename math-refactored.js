import { 
  Presentation,
  VStack,
  ContentBuilder
} from 'robo-reveal';

/**
 * Feature Presentation: Math Support - REFACTORED to non-fluent API
 */

const presentation = new Presentation({
  theme: 'black',
  transition: 'slide'
});

// Title Slide
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  transition: 'zoom'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' });
titleLayout.h1('Math Support');
titleLayout.h3('Beautiful Mathematical Expressions');
titleLayout.p('Powered by KaTeX');
titleLayout.p('$E = mc^2$');

titleSlide.addChild(titleLayout);

// Inline Math
const inlineMathSlide = presentation.slide();

const inlineMathLayout = new VStack({ spacing: '1em' });
inlineMathLayout.h2('Inline Math');
inlineMathLayout.p('Math flows naturally within text:');
inlineMathLayout.p('Einstein\'s famous equation $E = mc^2$ revolutionized physics.');
inlineMathLayout.p('The integral $\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$ is a classic result.');
inlineMathLayout.p('Newton\'s second law states that $F = ma$ where $F$ is force.');
inlineMathLayout.p('The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$');

inlineMathSlide.addChild(inlineMathLayout);

// Display Math
const displayMathSlide = presentation.slide();

const displayMathLayout = new VStack({ spacing: '1.5em' });
displayMathLayout.h2('Display Math');
displayMathLayout.p('Centered equations with $$double dollars$$:');
displayMathLayout.p('$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$');
displayMathLayout.p('$$\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$$');
displayMathLayout.p('$$e^{i\\pi} + 1 = 0$$');

displayMathSlide.addChild(displayMathLayout);

// Styled Math Blocks
const styledMathSlide = presentation.slide();

const styledMathLayout = new VStack({ spacing: '0.8em' });
styledMathLayout.h2('Styled Math Blocks');
styledMathLayout.p('Add color and emphasis to equations:');

// Create math blocks as variables - NO fluent API
const einsteinBlock = styledMathLayout.mathBlock('E = mc^2', { 
  background: '#ffeb3b',
  color: '#000',
  padding: '0.3em 0.6em',
  borderRadius: '6px',
  fontWeight: '500'
});

const integralBlock = styledMathLayout.mathBlock('\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}', {
  background: '#2196f3',
  padding: '0.3em 0.6em',
  borderRadius: '6px',
  color: 'white'
});

const forceBlock = styledMathLayout.mathBlock('F = ma', {
  background: '#e91e63',
  color: 'white',
  padding: '0.3em 0.6em',
  borderRadius: '6px',
  fontWeight: '600'
});

const pythagoreanBlock = styledMathLayout.mathBlock('a^2 + b^2 = c^2', {
  background: '#4caf50',
  color: 'white',
  padding: '0.3em 0.6em',
  borderRadius: '6px'
});

styledMathSlide.addChild(styledMathLayout);

// Example using effectFragment with direct element access
einsteinBlock.effectFragment(0, {
  onShow: (element) => {
    element.element.style.transform = 'scale(1.1)';
    element.element.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
  },
  onHide: (element) => {
    element.element.style.transform = '';
    element.element.style.boxShadow = '';
  }
});

// KaTeX Colors
const katexColorsSlide = presentation.slide();

const katexColorsLayout = new VStack({ spacing: '1em' });
katexColorsLayout.h2('KaTeX Color Commands');
katexColorsLayout.p('Use LaTeX color commands:');
katexColorsLayout.p('Text colors: $\\textcolor{red}{E = mc^2}$, $\\textcolor{blue}{F = ma}$');
katexColorsLayout.p('Math colors: $\\color{purple}x^2 + \\color{orange}2x + \\color{teal}1 = 0$');
katexColorsLayout.p('Boxed equations: $\\boxed{\\int_0^1 x^2 dx = \\frac{1}{3}}$');
katexColorsLayout.p('Colored boxes: $\\colorbox{yellow}{$E = mc^2$}$');

katexColorsSlide.addChild(katexColorsLayout);

// Math with ContentBuilder
const contentBuilderSlide = presentation.slide();

const mathContent = new ContentBuilder();
mathContent.withFragments('fade-up');
mathContent.text('ContentBuilder supports math too:');
mathContent.text('Simple equation: $E = mc^2$');
mathContent.text('Complex integral: $\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$');
mathContent.text('Matrix: $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$');

const contentBuilderLayout = new VStack({ spacing: '1em' });
contentBuilderLayout.h2('Math in ContentBuilder');
contentBuilderLayout.add(mathContent.build());

contentBuilderSlide.addChild(contentBuilderLayout);

// Math Typewriter
const mathTypewriterSlide = presentation.slide();

const mathTypewriterLayout = new VStack({ spacing: '1.5em' });
mathTypewriterLayout.h2('Math with Typewriter Effect');
mathTypewriterLayout.typewriterWithMath(
  'Einstein discovered that',
  '$E = mc^2$',
  {
    typeSpeed: 40,
    startDelay: 500,
    mathDelay: 300
  }
);
mathTypewriterLayout.typewriterWithMath(
  'The famous integral:',
  '$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$',
  { 
    typeSpeed: 50,
    startDelay: 2500,
    mathDelay: 200
  }
);
mathTypewriterLayout.typewriterWithMath(
  'Pythagorean theorem:',
  '$a^2 + b^2 = c^2$',
  { 
    typeSpeed: 50,
    startDelay: 5000,
    mathDelay: 200
  }
);

mathTypewriterSlide.addChild(mathTypewriterLayout);

// Common Equations
const equationsSlide = presentation.slide();

const equationsLayout = new VStack({ spacing: '0.8em' });
equationsLayout.h2('Common Mathematical Equations');
equationsLayout.p('Euler\'s identity: $e^{i\\pi} + 1 = 0$');
equationsLayout.p('Gaussian distribution: $f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$');
equationsLayout.p('Schrödinger equation: $i\\hbar\\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi$');
equationsLayout.p('Maxwell\'s equations: $\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0}$');
equationsLayout.p('Fourier transform: $\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x)e^{-2\\pi i x\\xi}dx$');

equationsSlide.addChild(equationsLayout);

// End Slide
const endSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
});

const endLayout = new VStack({ spacing: '2em', align: 'center' });
endLayout.h1('Math Support');
endLayout.p('Beautiful mathematical typography with KaTeX');
endLayout.p('$\\mathbb{R}$obo-$\\mathbb{R}$eveal makes math easy!');

endSlide.addChild(endLayout);

// Initialize
presentation.initialize();

console.log('Math presentation created with non-fluent API!');