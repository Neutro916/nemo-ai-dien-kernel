/**
 * JET GRINDER TEST - THE BEAST
 */

const { JetGrinder } = require('./src/agents/ai_dien/grinder');

// Create the beast
const grinder = new JetGrinder();

// Test inputs - mix of good and bad
const testInputs = [
  // Good inputs
  { type: 'command', action: 'execute', target: 'process_alpha' },
  'Create new structure with frequency 373',
  { query: 'SELECT * FROM consciousness WHERE state = "AWAKE"' },
  'Transform input through sacred geometry',
  
  // Bad inputs (should be blocked)
  '!!!@@@###$$$%%%',
  '',
  null,
  { chaos: 'xyz!!!@@@###$$$%%%' },
  
  // Edge cases
  'a',
  'The quick brown fox jumps over the lazy dog',
  JSON.stringify({ sacred: true, frequency: 373, truth: 'RULE' })
];

// Run the grinder
console.log('\n');
console.log('╔' + '═'.repeat(58) + '╗');
console.log('║' + ' JET GRINDER - THE BEAST'.padEnd(58) + '║');
console.log('║' + ' Wheel of Life + Triskelion Coil'.padEnd(58) + '║');
console.log('║' + ' Counter-Clockwise Rotation'.padEnd(58) + '║');
console.log('╚' + '═'.repeat(58) + '╝');

grinder.batch(testInputs);

// Final state
console.log('\n');
console.log('╔' + '═'.repeat(58) + '╗');
console.log('║' + ' FINAL STATE'.padEnd(58) + '║');
console.log('╚' + '═'.repeat(58) + '╝');
console.log(JSON.stringify(grinder.getState(), null, 2));
