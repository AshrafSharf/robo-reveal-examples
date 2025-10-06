import { 
  Presentation,
  VStack
} from 'robo-reveal';

/**
 * Demo: Inline Math
 * Exactly 2 slides - Title and Demo
 */

const presentation = new Presentation({
  theme: 'black',
  transition: 'slide'
});

// Slide 1: Title
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  transition: 'zoom'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' })
  .h1('Inline Math')
  .h3('Seamless mathematical expressions in text')
  .p('Mix equations naturally with your content');

titleSlide.addChild(titleLayout);

// Slide 2: Demo
const demoSlide = presentation.slide();

const demoLayout = new VStack({ spacing: '1em' })
  .h2('Math in Text')
  .p('Einstein\'s famous equation $E = mc^2$ revolutionized physics.')
  .p('The integral $\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$ is a classic result.')
  .p('Newton\'s second law states that $F = ma$ where $F$ is force, $m$ is mass, and $a$ is acceleration.')
  .p('The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ for solving $ax^2 + bx + c = 0$.')
  .p('Euler\'s identity: $e^{i\\pi} + 1 = 0$ is considered the most beautiful equation.');

demoSlide.addChild(demoLayout);

// Initialize
presentation.initialize();