#!/usr/bin/env node

/**
 * Test coverage wrapper script
 * Runs tests and provides clear pass/fail messaging with detailed summary
 */

const { spawnSync } = require('child_process');

// ANSI color codes
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const WHITE = '\x1b[37m';
const BG_GREEN = '\x1b[42m';
const BG_RED = '\x1b[41m';
const BG_YELLOW = '\x1b[43m';
const BLACK = '\x1b[30m';

const BOX_TOP = '╔' + '═'.repeat(78) + '╗';
const BOX_BOTTOM = '╚' + '═'.repeat(78) + '╝';
const BOX_SIDE = '║';

// Coverage bar configuration
const BAR_WIDTH = 40;
const THRESHOLD_DEFAULT = 80;

function getColorForPercent(percent, threshold = THRESHOLD_DEFAULT) {
  if (percent >= threshold) return GREEN;
  if (percent >= threshold * 0.75) return YELLOW;
  return RED;
}

function getBgColorForPercent(percent, threshold = THRESHOLD_DEFAULT) {
  if (percent >= threshold) return BG_GREEN;
  if (percent >= threshold * 0.75) return BG_YELLOW;
  return BG_RED;
}

function createProgressBar(percent, width = BAR_WIDTH) {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  const color = getColorForPercent(percent);
  
  const filledBar = '█'.repeat(filled);
  const emptyBar = '░'.repeat(empty);
  
  return `${color}${filledBar}${DIM}${emptyBar}${RESET}`;
}

function parseCoverageFromOutput(output) {
  const coverage = {
    packages: {},
    totals: null
  };

  const lines = output.split('\n');
  let currentPackage = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect package name from turbo output
    if (line.match(/^(\w+):test:coverage:/)) {
      const match = line.match(/^(\w+):test:coverage:/);
      if (match) {
        currentPackage = match[1];
        if (!coverage.packages[currentPackage]) {
          coverage.packages[currentPackage] = {};
        }
      }
    }

    // Parse "All files" summary line (Jest coverage output)
    // Format: All files |   85.71 |    66.66 |      75 |   85.71 |
    if (line.includes('All files') && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 5) {
        const stmts = parseFloat(parts[1]);
        const branch = parseFloat(parts[2]);
        const funcs = parseFloat(parts[3]);
        const lines = parseFloat(parts[4]);

        if (!isNaN(stmts)) {
          const data = {
            statements: stmts,
            branches: branch,
            functions: funcs,
            lines: lines
          };

          if (currentPackage) {
            coverage.packages[currentPackage] = data;
          }
          coverage.totals = data;
        }
      }
    }
  }

  return coverage;
}

function printCoverageGraph(coverage) {
  if (!coverage.totals && Object.keys(coverage.packages).length === 0) {
    return; // No coverage data found
  }

  console.log(`${CYAN}${BOLD}  📊 COVERAGE SUMMARY${RESET}`);
  console.log(`${DIM}  ${'─'.repeat(76)}${RESET}`);
  console.log('');

  // Print header
  console.log(`${DIM}     ${'Metric'.padEnd(12)} ${'Bar'.padEnd(BAR_WIDTH + 2)} ${'Value'.padStart(8)}${RESET}`);
  console.log(`${DIM}     ${'─'.repeat(12)} ${'─'.repeat(BAR_WIDTH)} ${'─'.repeat(8)}${RESET}`);

  // Print per-package coverage if multiple packages
  const packages = Object.keys(coverage.packages);
  if (packages.length > 1) {
    packages.forEach(pkg => {
      const data = coverage.packages[pkg];
      if (data.statements !== undefined) {
        const avg = (data.statements + data.branches + data.functions + data.lines) / 4;
        const color = getColorForPercent(avg);
        console.log(`${MAGENTA}${BOLD}     ${pkg}${RESET}`);
        printMetricRow('Statements', data.statements);
        printMetricRow('Branches', data.branches);
        printMetricRow('Functions', data.functions);
        printMetricRow('Lines', data.lines);
        console.log('');
      }
    });
  } else if (coverage.totals) {
    // Single package or totals
    printMetricRow('Statements', coverage.totals.statements);
    printMetricRow('Branches', coverage.totals.branches);
    printMetricRow('Functions', coverage.totals.functions);
    printMetricRow('Lines', coverage.totals.lines);
  }

  console.log('');
}

function printMetricRow(label, value) {
  if (value === undefined || isNaN(value)) return;
  
  const bar = createProgressBar(value);
  const color = getColorForPercent(value);
  const icon = value >= THRESHOLD_DEFAULT ? '✓' : '✗';
  const iconColor = value >= THRESHOLD_DEFAULT ? GREEN : RED;
  
  console.log(`     ${iconColor}${icon}${RESET} ${label.padEnd(10)} ${bar} ${color}${BOLD}${value.toFixed(1).padStart(6)}%${RESET}`);
}

function printHeader() {
  console.log('\n');
  console.log(`${CYAN}${BOX_TOP}${RESET}`);
  console.log(`${CYAN}${BOX_SIDE}${RESET}  🧪 ${BOLD}RUNNING TEST COVERAGE${RESET}${' '.repeat(54)}${CYAN}${BOX_SIDE}${RESET}`);
  console.log(`${CYAN}${BOX_BOTTOM}${RESET}`);
  console.log('\n');
}

function printSuccess(coverage) {
  console.log('\n');
  
  // Print coverage graph first
  printCoverageGraph(coverage);
  
  console.log(`${GREEN}${BOX_TOP}${RESET}`);
  console.log(`${GREEN}${BOX_SIDE}${RESET}  ✅ ${GREEN}${BOLD}ALL TESTS PASSED & COVERAGE THRESHOLDS MET${RESET}${' '.repeat(30)}${GREEN}${BOX_SIDE}${RESET}`);
  console.log(`${GREEN}${BOX_BOTTOM}${RESET}`);
  console.log('\n');
}

function printFailure(output, coverage) {
  const failedPackages = [];
  const failedTests = [];
  const coverageFailures = [];
  const moduleErrors = [];

  const lines = output.split('\n');

  for (const line of lines) {
    // Detect failed packages from turbo
    if (line.includes('#test:coverage') && line.includes('exited (1)')) {
      const match = line.match(/(\w+)#test:coverage/);
      if (match && !failedPackages.includes(match[1])) {
        failedPackages.push(match[1]);
      }
    }

    // Detect failed test names
    if (line.includes('✕')) {
      const match = line.match(/✕\s+(.+)/);
      if (match) {
        failedTests.push(match[1].trim());
      }
    }

    // Detect FAIL lines
    if (line.includes('FAIL ') && line.includes('.test.')) {
      failedTests.push(line.replace('FAIL ', '').trim());
    }

    // Detect coverage threshold failures
    if (line.toLowerCase().includes('coverage threshold') || 
        line.toLowerCase().includes('threshold for')) {
      coverageFailures.push(line.trim());
    }

    // Detect module/dependency errors
    if (line.includes('Cannot find module')) {
      const match = line.match(/Cannot find module '([^']+)'/);
      if (match && !moduleErrors.includes(match[1])) {
        moduleErrors.push(match[1]);
      }
    }
  }

  // Print failure header
  console.log('\n');
  console.log(`${RED}${BOX_TOP}${RESET}`);
  console.log(`${RED}${BOX_SIDE}${RESET}  ❌ ${RED}${BOLD}TESTS FAILED OR COVERAGE THRESHOLDS NOT MET${RESET}${' '.repeat(29)}${RED}${BOX_SIDE}${RESET}`);
  console.log(`${RED}${BOX_BOTTOM}${RESET}`);
  console.log('\n');

  // Print coverage graph
  printCoverageGraph(coverage);

  // Display failed packages
  if (failedPackages.length > 0) {
    console.log(`${RED}${BOLD}  📦 FAILED PACKAGES:${RESET}`);
    console.log(`${DIM}  ${'─'.repeat(76)}${RESET}`);
    failedPackages.forEach((pkg) => {
      console.log(`${RED}     • ${pkg}${RESET}`);
    });
    console.log('');
  }

  // Display module errors
  if (moduleErrors.length > 0) {
    console.log(`${YELLOW}${BOLD}  ⚠️  MISSING DEPENDENCIES:${RESET}`);
    console.log(`${DIM}  ${'─'.repeat(76)}${RESET}`);
    moduleErrors.forEach((mod) => {
      console.log(`${YELLOW}     • ${mod}${RESET}`);
    });
    console.log('');
    console.log(`${WHITE}     Run: ${CYAN}pnpm install${WHITE} to fix missing dependencies${RESET}`);
    console.log('');
  }

  // Display failed tests
  if (failedTests.length > 0) {
    console.log(`${RED}${BOLD}  ❌ FAILED TESTS (${failedTests.length}):${RESET}`);
    console.log(`${DIM}  ${'─'.repeat(76)}${RESET}`);
    failedTests.slice(0, 10).forEach((test, i) => {
      console.log(`${RED}     ${i + 1}. ${test}${RESET}`);
    });
    if (failedTests.length > 10) {
      console.log(`${DIM}     ... and ${failedTests.length - 10} more${RESET}`);
    }
    console.log('');
  }

  // Display coverage failures
  if (coverageFailures.length > 0) {
    console.log(`${YELLOW}${BOLD}  📉 COVERAGE THRESHOLDS NOT MET:${RESET}`);
    console.log(`${DIM}  ${'─'.repeat(76)}${RESET}`);
    coverageFailures.forEach((failure) => {
      console.log(`${YELLOW}     • ${failure}${RESET}`);
    });
    console.log('');
  }

  // Help message
  console.log(`${CYAN}${BOLD}  💡 NEXT STEPS:${RESET}`);
  console.log(`${DIM}  ${'─'.repeat(76)}${RESET}`);
  
  let step = 1;
  if (moduleErrors.length > 0) {
    console.log(`${WHITE}     ${step++}. Run ${CYAN}pnpm install${WHITE} to install missing dependencies${RESET}`);
  }
  if (failedTests.length > 0) {
    console.log(`${WHITE}     ${step++}. Fix the failing tests listed above${RESET}`);
  }
  if (coverageFailures.length > 0) {
    console.log(`${WHITE}     ${step++}. Add more tests to increase coverage${RESET}`);
    console.log(`${WHITE}     ${step++}. Check coverage report: ${CYAN}open coverage/lcov-report/index.html${RESET}`);
  }
  console.log(`${WHITE}     ${step++}. Re-run tests: ${CYAN}pnpm test:coverage${RESET}`);
  console.log('\n');
}

// Main execution
printHeader();

const result = spawnSync('pnpm', ['turbo', 'run', 'test:coverage'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  cwd: process.cwd(),
  encoding: 'utf-8',
  shell: true,
});

const output = (result.stdout || '') + (result.stderr || '');

// Print the actual test output
console.log(output);

// Parse coverage data
const coverage = parseCoverageFromOutput(output);

if (result.status === 0) {
  printSuccess(coverage);
  process.exit(0);
} else {
  printFailure(output, coverage);
  process.exit(1);
}
