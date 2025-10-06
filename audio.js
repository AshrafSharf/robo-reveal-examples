import { 
  Presentation,
  VStack,
  SlideControllerPlugin
} from 'robo-reveal';

/**
 * Audio Support Example - Demonstrates audio playback with fragments and sections
 */

const presentation = new Presentation({
  theme: 'white',
  transition: 'slide'
});

// Slide 1: Section-level audio (plays when slide loads)
const slide1 = presentation.slide();
slide1.element.setAttribute('data-audio-src', 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3');

const layout1 = new VStack({ spacing: '2em', align: 'center' });
layout1.h1('🎵 Audio Plugin Demo');
layout1.h3('Section-Level Audio');
layout1.p('This slide has audio that plays automatically when you navigate to it.');
layout1.p('Notice the audio player at the bottom of the screen.');
layout1.br();
layout1.p('👉 Navigate to the next slide to see fragment-based audio');

slide1.addChild(layout1);

// Slide 2: Fragment-level audio (plays when fragments are shown)
const slide2 = presentation.slide();

const layout2 = new VStack({ spacing: '1.5em', align: 'center' });
layout2.h2('🎧 Fragment-Based Audio');
layout2.p('Each fragment below has its own audio that plays when revealed:');

slide2.addChild(layout2);

// Add fragments with audio
const fragment1 = document.createElement('div');
fragment1.className = 'fragment';
fragment1.setAttribute('data-fragment-index', '0');
fragment1.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3');
fragment1.innerHTML = '<h3>🎊 Fragment 1</h3><p>This fragment plays a coin pickup sound!</p>';

const fragment2 = document.createElement('div');
fragment2.className = 'fragment';
fragment2.setAttribute('data-fragment-index', '1');
fragment2.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
fragment2.innerHTML = '<h3>💨 Fragment 2</h3><p>This fragment plays a pop sound!</p>';

const fragment3 = document.createElement('div');
fragment3.className = 'fragment';
fragment3.setAttribute('data-fragment-index', '2');
fragment3.setAttribute('data-audio-src', 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3');
fragment3.innerHTML = '<h3>🔊 Fragment 3</h3><p>This fragment plays a theme sound!</p>';

slide2.addChild(fragment1);
slide2.addChild(fragment2);
slide2.addChild(fragment3);

// Add final instruction
const instructions = document.createElement('div');
instructions.className = 'fragment';
instructions.setAttribute('data-fragment-index', '3');
instructions.innerHTML = '<p style="margin-top: 2em; font-style: italic;">Press the space bar or arrow keys to reveal fragments and hear their audio!</p>';
slide2.addChild(instructions);

// Initialize the presentation with audio plugin
presentation.initialize().then(() => {
  // Register the audio plugin after Reveal is initialized
  Reveal.registerPlugin(SlideControllerPlugin);
});

// Export for debugging
window.presentation = presentation;