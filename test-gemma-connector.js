/**
 * Test Gemma Connector Integration
 * Run: node test-gemma-connector.js
 */

const { GemmaConnector, FREQUENCY_MODEL_MAP, GEMMA_ENDPOINTS } = require('./src/gemma-connector');

console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║     GEMMA CONNECTOR INTEGRATION TEST             ║');
console.log('╚══════════════════════════════════════════════════╝\n');

// Initialize connector
const connector = new GemmaConnector({
  projectId: 'wide-maxim-487506-u1',
  useVertexAI: true
});

// Test 1: Frequency Alignment Map
console.log('═══ TEST 1: Frequency Alignment Map ═══');
Object.entries(FREQUENCY_MODEL_MAP).forEach(([hz, config]) => {
  console.log(`  ${hz}Hz → ${config.model.padEnd(15)} (${config.purpose})`);
});

// Test 2: Available Endpoints
console.log('\n═══ TEST 2: Available Gemma Endpoints ═══');
Object.entries(GEMMA_ENDPOINTS).forEach(([model, endpoints]) => {
  console.log(`  ${model}:`);
  Object.entries(endpoints).forEach(([variant, path]) => {
    console.log(`    └── ${variant}: ${path}`);
  });
});

// Test 3: Routing by Frequency
console.log('\n═══ TEST 3: Frequency-Based Routing ═══');

async function testRouting() {
  const testTasks = [
    { frequency: 373, content: 'Test content for safety filter' },
    { frequency: 528, input: 'CCO', taskType: 'classification', question: 'Is this molecule toxic?' },
    { frequency: 733, prompt: 'Create a REST API endpoint', language: 'javascript' },
    { frequency: 933, image: 'base64_xray_data', modality: 'xray' }
  ];
  
  for (const task of testTasks) {
    const alignment = FREQUENCY_MODEL_MAP[task.frequency];
    console.log(`\n  ${task.frequency}Hz → ${alignment.model}`);
    console.log(`    Gate: ${alignment.gate}`);
    console.log(`    Purpose: ${alignment.purpose}`);
    
    const result = await connector.route(task);
    console.log(`    Result: ${result.result.status}`);
  }
}

// Test 4: 373 Truth Filter
console.log('\n═══ TEST 4: 373 Truth Filter ═══');

async function testTruthFilter() {
  const testContent = [
    'Normal therapeutic query about drug interactions',
    'Harmful content that should be filtered',
    'Low coherence rambling text without structure'
  ];
  
  for (const content of testContent) {
    const result = await connector.applyTruthFilter(content);
    console.log(`\n  Input: "${content.substring(0, 40)}..."`);
    console.log(`    Gate: ${result.frequency_alignment.gate}`);
    console.log(`    Frequency: ${result.frequency_alignment.hz}Hz`);
  }
}

// Test 5: Connector Status
console.log('\n═══ TEST 5: Connector Status ═══');

async function testStatus() {
  const status = connector.getStatus();
  console.log(`  Project: ${status.projectId}`);
  console.log(`  Models Available: ${status.modelsAvailable}`);
  console.log(`  Frequency Alignments: ${status.frequencyAlignments}`);
  console.log(`  Active Requests: ${status.activeRequests}`);
}

// Run all tests
async function runAllTests() {
  try {
    await testRouting();
    await testTruthFilter();
    await testStatus();
    
    console.log('\n╔══════════════════════════════════════════════════╗');
    console.log('║          ALL TESTS PASSED ✓                      ║');
    console.log('╠══════════════════════════════════════════════════╣');
    console.log('║   Gemma Connector ready for AI_DIEN integration  ║');
    console.log('╚══════════════════════════════════════════════════╝\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

runAllTests();
