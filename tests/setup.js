// Vitest setup file for Node environment
import { vi } from 'vitest';
// Install: npm install jsdom
import { JSDOM } from 'jsdom';

// Provide a URL so localStorage works
const dom = new JSDOM(`<!DOCTYPE html><p>Hello</p>`, {
  url: "https://example.com", // Required for localStorage
});


// Mock browser globals that might be needed for some libraries
if (typeof global.window === 'undefined') {
  global.window = dom.window;
}

if (typeof global.document === 'undefined') {
  global.document = dom.window.document;
}

if (typeof global.navigator === 'undefined') {
  global.navigator = {
    userAgent: 'node.js'
  };
}

// Mock localStorage if needed
global.localStorage = dom.window.localStorage

// Mock sessionStorage if needed
global.sessionStorage = dom.window.lo

// Mock URL if needed
if (typeof global.URL === 'undefined') {
  global.URL = class URL {
    constructor(url, base) {
      const actualURL = base ? new globalThis.URL(url, base) : new globalThis.URL(url);
      Object.assign(this, actualURL);
    }
    toString() {
      return this.href;
    }
  };
  global.URL.createObjectURL = vi.fn(() => 'mock-url');
  global.URL.revokeObjectURL = vi.fn();
}

console.log('Node environment setup complete');