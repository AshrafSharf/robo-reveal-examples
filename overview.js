import { 
  Presentation,
  VStack
} from 'robo-reveal';

/**
 * Feature Presentation: Overview & Key Features
 */

const presentation = new Presentation({
  theme: 'black',
  transition: 'slide'
});

// Title Slide
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(to bottom right, #667eea 0%, #764ba2 100%)',
  transition: 'zoom'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' })
  .h1('Robo-Reveal')
  .h2('Object-Oriented Presentations')
  .p('Build dynamic presentations with JavaScript')
  .small('Navigate with arrow keys or spacebar');

titleSlide.addChild(titleLayout);

// What is Robo-Reveal?
const whatSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
});

const whatLayout = new VStack({ spacing: '1.5em', align: 'center' })
  .h2('What is Robo-Reveal?')
  .p('A powerful JavaScript library for creating Reveal.js presentations programmatically')
  .ul([
    'No HTML strings needed',
    'Chainable API methods',
    'Full TypeScript support',
    'Dynamic content generation'
  ]);

whatSlide.addChild(whatLayout);

// Key Features
const featuresSlide = presentation.slide({
  backgroundColor: '#2E3440'
});

const featuresLayout = new VStack({ spacing: '1.5em' })
  .h2('Key Features')
  .ul([
    'Programmatic slide creation',
    'Semantic API (h1, p, ul, etc.)',
    'Layout components (VStack, HStack)',
    'Math support with KaTeX',
    'Typewriter effects',
    'Media embedding',
    'Auto-animate support',
    'Fragment animations'
  ]);

featuresSlide.addChild(featuresLayout);

// Why Use It?
const whySlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)'
});

const whyLayout = new VStack({ spacing: '1.5em' })
  .h2('Why Use Robo-Reveal?')
  .ul([
    { text: 'Generate presentations from data', fragment: true },
    { text: 'Reusable presentation components', fragment: true },
    { text: 'Version control friendly', fragment: true },
    { text: 'Dynamic content updates', fragment: true },
    { text: 'Consistent styling', fragment: true },
    { text: 'No manual HTML editing', fragment: true }
  ]);

whySlide.addChild(whyLayout);

// Getting Started
const gettingStartedSlide = presentation.slide();

const gettingStartedLayout = new VStack({ spacing: '1em' })
  .h2('Getting Started')
  .pre(`import { Presentation, VStack } from 'robo-reveal';

// Create a presentation
const presentation = new Presentation();

// Add a slide
const slide = presentation.slide();

// Add content
const layout = new VStack()
  .h1('Hello World')
  .p('My first slide');

slide.addChild(layout);

// Initialize
presentation.initialize();`);

gettingStartedSlide.addChild(gettingStartedLayout);

// End Slide
const endSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(to top right, #667eea 0%, #764ba2 100%)'
});

const endLayout = new VStack({ spacing: '2em', align: 'center' })
  .h1('Ready to Start?')
  .p('Explore more features in the other examples')
  .link('View Documentation', '#', { target: '_blank' });

endSlide.addChild(endLayout);

// Initialize
presentation.initialize();

console.log('Feature 01 - Overview presentation created!');