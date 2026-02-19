/**
 * DHARMACHAKRA MASTER LOOP TEST
 */

const { DharmachakraMaster } = require('./src/agents/ai_dien/master_loop');

// Create master
const master = new DharmachakraMaster();

// Initialize
master.initialize();

// Test inputs
const tests = [
  { name: 'Valid Command', input: { action: 'execute', target: 'process' } },
  { name: 'Valid Text', input: 'Transform consciousness through sacred geometry' },
  { name: 'Empty (should ground)', input: '' },
  { name: 'Noise (should ground)', input: '!!!@@@###' },
  { name: 'Too Short (should ground)', input: 'ab' },
  { name: 'Valid JSON', input: JSON.stringify({ sacred: true, frequency: 373 }) },
  { name: 'Null (should ground)', input: null }
];

console.log('\n' + '═'.repeat(60));
console.log('RUNNING STRESS TEST');
console.log('═'.repeat(60));

for (const test of tests) {
  console.log(`\n\n📌 TEST: ${test.name}`);
  console.log(`   Input: ${JSON.stringify(test.input).slice(0, 50)}`);
  
  const result = master.process(test.input);
  
  console.log(`\n   Result: ${result.status}`);
  console.log(`   Message: ${result.message}`);
}

// Final state
console.log('\n\n' + '═'.repeat(60));
console.log('FINAL STATE');
console.log('═'.repeat(60));
console.log(JSON.stringify(master.getState(), null, 2));
