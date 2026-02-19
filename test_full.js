const { JetGrinder } = require('./src/agents/ai_dien/grinder');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  JET GRINDER - WHEEL OF LIFE + TRISKELION COIL            ║');
console.log('║  1 COIL | 3 SPIRALS | 8 SPOKES | CCW ROTATION             ║');
console.log('║  SHIVA TURNS THE WHEEL                                     ║');
console.log('╚════════════════════════════════════════════════════════════╝');

const grinder = new JetGrinder();

// Test inputs
const inputs = [
  'execute process test',
  { type: 'create', data: 'new item' },
  'xyz!!!@@@###',  // Should be blocked (low coherence)
  'query database for users',
  { action: 'build', target: 'coil' }
];

grinder.batch(inputs);
