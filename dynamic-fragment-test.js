import { 
  Presentation,
  VStack
} from 'robo-reveal';

/**
 * Test: Dynamic Fragment Styling with No Fluent API
 */

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Create a slide
const slide = presentation.slide();

// Create layout - NO fluent API
const layout = new VStack({ spacing: '1em' });

// Create elements with variables for direct reference - NO fluent API
const title = layout.h2('Dynamic Fragment Test');
const baseEquation = layout.p('Base equation: $x^2 + y^2 = r^2$');
const expandedEquation = layout.p('Expanded form: $x^2 + y^2 = 25$');
const conclusion = layout.p('This demonstrates direct element manipulation!');

// Add the layout to the slide
slide.addChild(layout);

// Now create effect fragments with direct element access
baseEquation.effectFragment(0, {
  onShow: (element) => {
    // Direct access to the element - no querySelector needed!
    element.element.style.background = 'yellow';
    element.element.style.padding = '0.5em';
    element.element.style.borderRadius = '4px';
  },
  onHide: (element) => {
    element.element.style.background = '';
    element.element.style.padding = '';
    element.element.style.borderRadius = '';
  }
});

expandedEquation.effectFragment(1, {
  onShow: (element) => {
    element.element.style.background = '#e7f3ff';
    element.element.style.border = '2px solid #0066cc';
    element.element.style.padding = '0.5em';
    element.element.style.borderRadius = '4px';
  },
  onHide: (element) => {
    element.element.style.background = '';
    element.element.style.border = '';
    element.element.style.padding = '';
    element.element.style.borderRadius = '';
  }
});

conclusion.effectFragment(2, {
  onShow: (element) => {
    element.element.style.color = '#006600';
    element.element.style.fontWeight = 'bold';
    element.element.style.transform = 'scale(1.1)';
  },
  onHide: (element) => {
    element.element.style.color = '';
    element.element.style.fontWeight = '';
    element.element.style.transform = '';
  }
});

// Initialize
presentation.initialize();

console.log('Dynamic Fragment Test created - no fluent API used!');