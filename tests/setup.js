// Import testing library extensions
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Create a minimal window object if it doesn't exist
if (typeof window === 'undefined') {
  globalThis.window = {};
}

// Mock console methods to avoid cluttering test output
globalThis.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn()
};

// Set up any other global configurations needed for tests
