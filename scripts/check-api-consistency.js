#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * API Consistency Check Script
 *
 * This script runs the API consistency tests and exits with a non-zero code if any tests fail.
 * It can be used in CI/CD pipelines to ensure API consistency before deployment.
 */

import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

console.log(`${colors.cyan}Running API consistency checks...${colors.reset}`);
console.log(
  `${colors.yellow}This will ensure that all expected APIs are available and functioning correctly.${colors.reset}`,
);

// First build the project
console.log(`${colors.blue}Building project...${colors.reset}`);
const buildProcess = spawn("npm", ["run", "build"], {
  cwd: rootDir,
  stdio: "inherit",
});

buildProcess.on("close", (buildCode) => {
  if (buildCode !== 0) {
    console.error(
      `${colors.red}Build failed with code ${buildCode}${colors.reset}`,
    );
    process.exit(buildCode);
  }

  console.log(`${colors.green}Build successful!${colors.reset}`);
  console.log(`${colors.blue}Running tests...${colors.reset}`);

  // Then run the tests
  const testProcess = spawn("npm", ["test"], {
    cwd: rootDir,
    stdio: "inherit",
  });

  testProcess.on("close", (testCode) => {
    if (testCode !== 0) {
      console.error(
        `${colors.red}Tests failed with code ${testCode}${colors.reset}`,
      );
      console.error(
        `${colors.red}API consistency check failed!${colors.reset}`,
      );
      console.error(
        `${colors.yellow}Please ensure that all expected APIs are available and functioning correctly.${colors.reset}`,
      );
      process.exit(testCode);
    }

    console.log(`${colors.green}All tests passed!${colors.reset}`);
    console.log(
      `${colors.green}API consistency check successful!${colors.reset}`,
    );
    process.exit(0);
  });
});
