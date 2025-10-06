import { 
  Presentation,
  VStack
} from 'robo-reveal';

/**
 * Demo: Typewriter with Math Fade-in
 * Exactly 2 slides - Title and Demo
 */

const presentation = new Presentation({
  theme: 'black',
  transition: 'slide'
});

// Slide 1: Title
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'zoom'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' })
  .h1('Typewriter with Math')
  .h3('Type text, then fade in equations')
  .p('Watch as text types out and math elegantly appears');

titleSlide.addChild(titleLayout);

// Slide 2: Demo
const demoSlide = presentation.slide();

const demoLayout = new VStack({ spacing: '1.5em' })
  .h2('Math Expression Typewriter')
  .typewriterWithMath(
    'Einstein discovered that',
    '$E = mc^2$',
    {
      typeSpeed: 40,
      startDelay: 500,
      mathDelay: 300
    }
  )
  .typewriterWithMath(
    'which revolutionized physics!',
    null,
    {
      typeSpeed: 40,
      startDelay: 2500
    }
  )
  .typewriterWithMath(
    'The integral:',
    '$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$',
    { 
      typeSpeed: 50,
      startDelay: 4000,
      mathDelay: 200
    }
  )
  .typewriterWithMath(
    'Newton\'s second law:',
    '$F = ma$',
    { 
      typeSpeed: 50,
      startDelay: 6000,
      mathDelay: 200
    }
  )
  .typewriterWithMath(
    'Pythagorean theorem:',
    '$a^2 + b^2 = c^2$',
    { 
      typeSpeed: 50,
      startDelay: 8000,
      mathDelay: 200
    }
  );

demoSlide.addChild(demoLayout);

// Initialize
presentation.initialize();