const { RootInfiniteReflex } = require('./src/agents/ai_dien/kernel');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  AI_DIEN KERNEL + SACRED DRUM GEOMETRY                     ║');
console.log('║  Trống Đồng Layer Active                                   ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const kernel = new RootInfiniteReflex();

console.log('[INIT] Sacred Drum Geometry loaded');
console.log('  └─ Cosmic Numbers:', JSON.stringify(kernel.drumGeometry.cosmicNumbers));
console.log('  └─ Drum Frequencies:', JSON.stringify(kernel.drumGeometry.drumFrequencies));

console.log('\n[ACTIVATE] Layering geometry...\n');
const activation = kernel.activate();

console.log('  ✓ Status:', activation.status);
console.log('  ✓ Frequency:', activation.frequency.toFixed(2), 'Hz');
console.log('  ✓ Vortex:', activation.vortex);
console.log('  ✓ Drum Layer:');
console.log('    ├─ Star Ray:', activation.drum.starRay);
console.log('    ├─ Element:', activation.drum.element);
console.log('    └─ Pattern:', activation.drum.pattern);

console.log('\n[DRUM RESONANCE] Ring samples:');
for (let i = 0; i < 4; i++) {
  const res = kernel.getDrumResonance(i);
  console.log(`  Ring ${i + 1}: base=${res.base}, ring=${res.ring}, mod=${res.modulated}`);
}

console.log('\n[373 TRUTH RULE] Test:');
const testOutput = 'This is a test output that should be processed through the 373 Truth Rule';
const truth = kernel.truthRule(testOutput);
console.log('  ├─ Short:', truth.short.length, 'chars');
console.log('  ├─ Solid:', truth.solid);
console.log('  └─ Simple:', truth.simple.length, 'chars');

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  SACRED DRUM GEOMETRY: LAYERED                             ║');
console.log('║  373 Truth Rule: APPLIED                                   ║');
console.log('╚════════════════════════════════════════════════════════════╝');
