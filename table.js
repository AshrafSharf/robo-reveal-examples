import { 
  Presentation,
  VStack,
  HStack,
  TableBuilder,
  SlideControllerPlugin
} from 'robo-reveal';

/**
 * Table Example - Demonstrates tables with non-fluent API for direct cell access
 */

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Slide 1: Table with HStack layout
const slide1 = presentation.slide();
const layout1 = new VStack({ spacing: '2em', align: 'center' });
layout1.h1('📊 Table Examples');
layout1.h3('Tables with HStack Layout');

const table1 = new TableBuilder(3, 2);
table1.setBorders('all');
table1.setText(0, 0, 'Data Visualization');
table1.setText(0, 1, 'Implementation');

// Add HStack to a cell
const hstackCell = new HStack({ spacing: '1em', align: 'center' });
hstackCell.p('📈 Charts');
hstackCell.p('📊 Graphs');
hstackCell.p('🎯 Metrics');
table1.setElement(1, 0, hstackCell.getDOMElement());

table1.setText(1, 1, 'Using HStack for horizontal layout');
table1.setText(2, 0, 'Combined Approach');
table1.setText(2, 1, 'Tables + Layout components');

layout1.addChild(table1);
slide1.addChild(layout1);

// Slide 2: Fragment animations in tables
const slide2 = presentation.slide();
const layout2 = new VStack({ spacing: '2em', align: 'center' });
layout2.h2('🎬 Fragment Animations');

const table2 = new TableBuilder(4, 2);
table2.setBorders('horizontal-only');
table2.setText(0, 0, 'Step');
table2.setText(0, 1, 'Process');

// Set content and then add fragments
table2.setText(1, 0, '1. Collect');
table2.addFragment(1, 0, 0);
table2.setText(1, 1, 'Gather raw data');
table2.addFragment(1, 1, 0);

table2.setText(2, 0, '2. Process');
table2.addFragment(2, 0, 1);
table2.setText(2, 1, 'Clean and transform');
table2.addFragment(2, 1, 1);

table2.setText(3, 0, '3. Visualize');
table2.addFragment(3, 0, 2);
table2.setText(3, 1, 'Create charts and graphs');
table2.addFragment(3, 1, 2);

layout2.addChild(table2);
slide2.addChild(layout2);

// Slide 3: Audio support with styled math
const slide3 = presentation.slide();
slide3.element.setAttribute('data-audio-src', 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3');

const layout3 = new VStack({ spacing: '2em', align: 'center' });
layout3.h2('🎵 Audio + Styled Math');

const table3 = new TableBuilder(3, 3);
table3.setBorders('outer-only');
table3.setText(0, 0, 'Subject');
table3.setText(0, 1, 'Formula');
table3.setText(0, 2, 'Audio Cue');

table3.setText(1, 0, 'Physics');
table3.setMath(1, 1, 'E = mc^2', { 
  background: '#2196f3', 
  color: 'white', 
  padding: '0.4em 0.8em', 
  borderRadius: '8px',
  fontWeight: 'bold'
});
table3.addFragment(1, 1, 0);
table3.setText(1, 2, '🎵 Energy equation');
table3.addFragment(1, 2, 0, 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3');

table3.setText(2, 0, 'Chemistry');
table3.setMath(2, 1, 'H_2O + NaCl', { 
  background: '#4caf50', 
  color: 'white', 
  padding: '0.4em 0.8em', 
  borderRadius: '8px',
  fontWeight: 'bold'
});
table3.addFragment(2, 1, 1);
table3.setText(2, 2, '🧪 Reaction sound');
table3.addFragment(2, 2, 1, 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');

layout3.addChild(table3);
slide3.addChild(layout3);

// Slide 4: Direct cell access for conditional styling
const slide4 = presentation.slide();
const layout4 = new VStack({ spacing: '2em', align: 'center' });
layout4.h2('📊 Dynamic Table with Direct Cell Access');

const table4 = new TableBuilder(3, 3);
table4.setBorders('all');
table4.setText(0, 0, 'Category');
table4.setText(0, 1, 'Value');
table4.setText(0, 2, 'Status');

table4.setText(1, 0, 'Linear Growth');
table4.setText(1, 1, '42');
table4.setText(1, 2, '✅ Active');

table4.setText(2, 0, 'Exponential Growth');
table4.setText(2, 1, '128');
table4.setText(2, 2, '🔄 Processing');

// Example of direct cell access for conditional styling
// You can now access cells directly for fragment callbacks
const cell_1_1 = table4.getCell(1, 1);
const cell_2_1 = table4.getCell(2, 1);

// Add fragments with direct cell access
cell_1_1.classList.add('fragment');
cell_1_1.setAttribute('data-fragment-index', 0);

cell_2_1.classList.add('fragment');
cell_2_1.setAttribute('data-fragment-index', 1);

// You can also style cells directly
table4.setCellStyle(0, 0, { fontWeight: 'bold', background: '#f0f0f0' });
table4.setCellStyle(0, 1, { fontWeight: 'bold', background: '#f0f0f0' });
table4.setCellStyle(0, 2, { fontWeight: 'bold', background: '#f0f0f0' });

layout4.addChild(table4);
slide4.addChild(layout4);

// Initialize the presentation
presentation.initialize().then(() => {
  // Register the audio plugin after Reveal is initialized
  Reveal.registerPlugin(SlideControllerPlugin);
  
  // Example of using fragment callbacks with direct cell access
  Reveal.on('fragmentshown', event => {
    const fragment = event.fragment;
    
    // You can now directly manipulate cells based on fragment events
    if (fragment.getAttribute('data-fragment-index') === '0' && slide4.element.contains(fragment)) {
      // Direct cell manipulation on fragment show
      const cell = table4.getCell(1, 1);
      if (cell) {
        cell.style.background = '#ffeb3b';
        cell.style.fontWeight = 'bold';
      }
    }
  });
  
  Reveal.on('fragmenthidden', event => {
    const fragment = event.fragment;
    
    // Reset cell styling on fragment hide
    if (fragment.getAttribute('data-fragment-index') === '0' && slide4.element.contains(fragment)) {
      const cell = table4.getCell(1, 1);
      if (cell) {
        cell.style.background = '';
        cell.style.fontWeight = '';
      }
    }
  });
});

// Export for debugging
window.presentation = presentation;