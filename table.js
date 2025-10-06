import { 
  Presentation,
  VStack,
  HStack,
  TableBuilder,
  SlideControllerPlugin
} from 'robo-reveal';

/**
 * Table Example - Demonstrates tables with HStack, fragments, audio and styled math
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
table1.setCell(0, 0, 'Data Visualization');
table1.setCell(0, 1, 'Implementation');

// Add HStack to a cell
const hstackCell = new HStack({ spacing: '1em', align: 'center' });
hstackCell.p('📈 Charts');
hstackCell.p('📊 Graphs');
hstackCell.p('🎯 Metrics');
table1.getCell(1, 0).appendChild(hstackCell.getDOMElement());

table1.setCell(1, 1, 'Using HStack for horizontal layout');
table1.setCell(2, 0, 'Combined Approach');
table1.setCell(2, 1, 'Tables + Layout components');

layout1.addChild(table1);
slide1.addChild(layout1);

// Slide 2: Fragment animations in tables
const slide2 = presentation.slide();
const layout2 = new VStack({ spacing: '2em', align: 'center' });
layout2.h2('🎬 Fragment Animations');

const table2 = new TableBuilder(4, 2);
table2.setBorders('horizontal-only');
table2.setCell(0, 0, 'Step');
table2.setCell(0, 1, 'Process');
table2.setCell(1, 0, '1. Collect', { fragment: 0 });
table2.setCell(1, 1, 'Gather raw data', { fragment: 0 });
table2.setCell(2, 0, '2. Process', { fragment: 1 });
table2.setCell(2, 1, 'Clean and transform', { fragment: 1 });
table2.setCell(3, 0, '3. Visualize', { fragment: 2 });
table2.setCell(3, 1, 'Create charts and graphs', { fragment: 2 });

layout2.addChild(table2);
slide2.addChild(layout2);

// Slide 3: Audio support with styled math
const slide3 = presentation.slide();
slide3.element.setAttribute('data-audio-src', 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3');

const layout3 = new VStack({ spacing: '2em', align: 'center' });
layout3.h2('🎵 Audio + Styled Math');

const table3 = new TableBuilder(3, 3);
table3.setBorders('outer-only');
table3.setCell(0, 0, 'Subject');
table3.setCell(0, 1, 'Formula');
table3.setCell(0, 2, 'Audio Cue');

table3.setCell(1, 0, 'Physics');
table3.cellMath(1, 1, 'E = mc^2', { 
  background: '#2196f3', 
  color: 'white', 
  padding: '0.4em 0.8em', 
  borderRadius: '8px',
  fontWeight: 'bold'
}, { fragment: 0 });
table3.setCell(1, 2, '🎵 Energy equation', { fragment: 0, audioSrc: 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3' });

table3.setCell(2, 0, 'Chemistry');
table3.cellMath(2, 1, 'H_2O + NaCl', { 
  background: '#4caf50', 
  color: 'white', 
  padding: '0.4em 0.8em', 
  borderRadius: '8px',
  fontWeight: 'bold'
}, { fragment: 1 });
table3.setCell(2, 2, '🧪 Reaction sound', { fragment: 1, audioSrc: 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3' });

layout3.addChild(table3);
slide3.addChild(layout3);

// Slide 4: Simple table without diagrams
const slide4 = presentation.slide();
const layout4 = new VStack({ spacing: '2em', align: 'center' });
layout4.h2('📊 Simple Data Table');

const table4 = new TableBuilder(3, 3);
table4.setBorders('all');
table4.setCell(0, 0, 'Category');
table4.setCell(0, 1, 'Value');
table4.setCell(0, 2, 'Status');

table4.setCell(1, 0, 'Linear Growth');
table4.setCell(1, 1, '42');
table4.setCell(1, 2, '✅ Active');

table4.setCell(2, 0, 'Exponential Growth');
table4.setCell(2, 1, '128');
table4.setCell(2, 2, '🔄 Processing');

layout4.addChild(table4);
slide4.addChild(layout4);

// Initialize the presentation
presentation.initialize().then(() => {
  // Register the audio plugin after Reveal is initialized
  Reveal.registerPlugin(SlideControllerPlugin);
});

// Export for debugging
window.presentation = presentation;