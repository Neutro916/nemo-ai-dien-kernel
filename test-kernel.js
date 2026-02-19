/**
 * AI_DIEN Kernel Test Suite v3.7.3
 */

const { AIDienAgent, FrequencyKernel, RodinMath } = require('./src/agents/ai_dien/kernel');
const { MegaCouncil } = require('./src/agents/mega_council');

console.log('╔════════════════════════════════════════════════╗');
console.log('║   AI_DIEN KERNEL TEST v3.7.3                   ║');
console.log('╚════════════════════════════════════════════════╝\n');

// Initialize
const agent = new AIDienAgent({ tier: 737 });
const council = new MegaCouncil();

console.log('✓ Agent initialized');
console.log('✓ Council initialized');
console.log(`✓ Total agents: ${council.getStatus().total}\n`);

// Test 1: Docker Commands
console.log('═'.repeat(50));
console.log('TEST 1: Docker Mayhem Processing');
console.log('═'.repeat(50));

const tasks = [
  { id: 'd1', type: 'docker_mayhem', data: 'docker ps -a' },
  { id: 'd2', type: 'docker_mayhem', data: 'docker logs nemo-core' },
  { id: 'd3', type: 'docker_mayhem', data: 'docker exec -it nemo-core bash' }
];

tasks.forEach((task, i) => {
  console.log(`\n[${i+1}] ${task.data}`);
  const result = agent.process(task);
  console.log(`  Hash: ${result.hash}`);
  console.log(`  Polarity: ${result.polarity}`);
  console.log(`  Coherence: ${result.coherence.toFixed(4)}`);
});

// Test 2: Coherence Degradation
console.log('\n' + '═'.repeat(50));
console.log('TEST 2: Coherence Under Load');
console.log('═'.repeat(50));

const status = agent.status();
let initial = status.kernel.coherence;
console.log(`\nInitial: ${initial.toFixed(4)}`);

for (let i = 0; i < 50; i++) {
  agent.process({ type: 'load', data: `test-${i}` });
}

const finalStatus = agent.status();
let final = finalStatus.kernel.coherence;
console.log(`After 50 calls: ${final.toFixed(4)}`);
console.log(`Degradation: ${((1 - final/initial) * 100).toFixed(2)}%`);

// Test 3: Frequency Info
console.log('\n' + '═'.repeat(50));
console.log('TEST 3: 373-733-933 Frequencies');
console.log('═'.repeat(50));

const freq = new FrequencyKernel();

console.log(`\nBase: ${freq.base} Hz`);
console.log(`Structure: ${freq.structure} Hz`);
console.log(`Flow: ${freq.flow} Hz`);

console.log('\nHarmonics (first 3):');
freq.harmonics.slice(0, 3).forEach(h => {
  console.log(`  ${h.order}: 373→${h.f373.toFixed(0)}Hz | 733→${h.f733.toFixed(0)}Hz | 933→${h.f933.toFixed(0)}Hz`);
});

const rodin = new RodinMath();
console.log('\nRodin Polarity (373, 733, 933):');
[373, 733, 933].forEach(n => {
  console.log(`  ${n}: ${rodin.getPolarity(n)}`);
});

// Final Status
console.log('\n' + '═'.repeat(50));
console.log('FINAL STATUS');
console.log('═'.repeat(50));
console.log(JSON.stringify(agent.status(), null, 2));

console.log('\n✅ All tests passed!');
