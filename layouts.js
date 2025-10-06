import { 
  Presentation,
  VStack,
  HStack
} from 'robo-reveal';

/**
 * Feature Presentation: Layout Systems
 */

const presentation = new Presentation({
  theme: 'black',
  transition: 'slide'
});

// Title Slide
const titleSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)',
  transition: 'zoom'
});

const titleLayout = new VStack({ spacing: '2em', align: 'center' })
  .h1('Layout Systems')
  .h3('Flexible Content Arrangement')
  .p('VStack, HStack, and nested layouts');

titleSlide.addChild(titleLayout);

// VStack Demo
const vstackSlide = presentation.slide();

const vstackLayout = new VStack({ spacing: '1.5em', align: 'center' })
  .h2('VStack - Vertical Stack')
  .p('Elements stack vertically')
  .p('This is the default layout')
  .ul(['Item 1', 'Item 2', 'Item 3'])
  .p('Perfect for most slides');

vstackSlide.addChild(vstackLayout);

// HStack Demo
const hstackSlide = presentation.slide();

const hstackMainLayout = new VStack()
  .h2('HStack - Horizontal Stack')
  .p('Elements arranged side by side');

const hstackDemo = new HStack({ spacing: '3em', align: 'center' })
  .div('Left')
  .div('Center')
  .div('Right');

hstackMainLayout.addChild(hstackDemo);
hstackSlide.addChild(hstackMainLayout);

// Two Column Layout
const twoColumnSlide = presentation.slide();

const twoColumnLayout = new VStack()
  .h2('Two Column Layout')
  .addHStack({ spacing: '3em', align: 'flex-start' })
    .addVStack({ flex: 1 })
      .h3('Left Column')
      .p('Content on the left side')
      .ul(['Feature A', 'Feature B', 'Feature C'])
    .end()
    .addVStack({ flex: 1 })
      .h3('Right Column')
      .p('Content on the right side')
      .ol(['Step 1', 'Step 2', 'Step 3'])
    .end()
  .end();

twoColumnSlide.addChild(twoColumnLayout);

// Three Column Layout
const threeColumnSlide = presentation.slide();

const threeColumnLayout = new VStack()
  .h2('Three Column Layout')
  .addHStack({ spacing: '2em', align: 'flex-start' })
    .addVStack({ flex: 1 })
      .h4('Column 1')
      .p('First column content')
      .p('Additional text here')
    .end()
    .addVStack({ flex: 1 })
      .h4('Column 2')
      .p('Second column content')
      .p('More information')
    .end()
    .addVStack({ flex: 1 })
      .h4('Column 3')
      .p('Third column content')
      .p('Final details')
    .end()
  .end();

threeColumnSlide.addChild(threeColumnLayout);

// Complex Nested Layout
const nestedSlide = presentation.slide();

const nestedLayout = new VStack({ spacing: '1.5em' })
  .h2('Complex Nested Layouts')
  .addHStack({ spacing: '2em' })
    .addVStack({ flex: 2 })
      .h3('Main Content')
      .p('Primary information goes here')
      .addHStack({ spacing: '1em' })
        .button('Action 1')
        .button('Action 2')
      .end()
    .end()
    .addVStack({ flex: 1 })
      .h4('Sidebar')
      .ul(['Link 1', 'Link 2', 'Link 3'])
    .end()
  .end()
  .p('Footer text below the columns');

nestedSlide.addChild(nestedLayout);

// Layout Options
const optionsSlide = presentation.slide({
  backgroundColor: '#1e1e1e',
  state: 'has-dark-background'
});

const optionsLayout = new VStack({ spacing: '1em' })
  .h2('Layout Options')
  .pre(`// VStack & HStack options
new VStack({
  spacing: '2em',      // Gap between items
  align: 'center',     // Alignment
  justify: 'center',   // Justification
  class: 'custom',     // CSS class
  style: {...}         // Inline styles
});

// Flex layouts
new HStack()
  .addVStack({ flex: 2 })  // Takes 2/3 width
  .addVStack({ flex: 1 })  // Takes 1/3 width
  .end();`);

optionsSlide.addChild(optionsLayout);

// Media in Layouts
const mediaLayoutSlide = presentation.slide();

const mediaLayout = new VStack()
  .h2('Media in Layouts')
  .addHStack({ spacing: '2em', align: 'center' })
    .image({
      src: 'https://picsum.photos/300/200',
      width: 300,
      height: 200,
      class: 'r-frame'
    })
    .addVStack()
      .h3('Image Description')
      .p('Images can be placed alongside text')
      .p('Use HStack for side-by-side layout')
    .end()
  .end();

mediaLayoutSlide.addChild(mediaLayout);

// End Slide
const endSlide = presentation.slide({
  backgroundGradient: 'linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)'
});

const endLayout = new VStack({ spacing: '2em', align: 'center' })
  .h1('Layout Systems')
  .p('Build complex layouts with simple components')
  .p('VStack, HStack, and nesting make anything possible');

endSlide.addChild(endLayout);

// Initialize
presentation.initialize();

console.log('Feature 03 - Layouts presentation created!');