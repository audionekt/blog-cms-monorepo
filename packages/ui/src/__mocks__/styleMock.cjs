// Mock for CSS imports in Jest
// Returns plain strings to ensure compatibility with libraries expecting string classNames

const MOCK_CLASS_NAME = 'mock-class';

// Create a string-like object with additional properties for nested access
class MockClassName extends String {
  constructor() {
    super(MOCK_CLASS_NAME);
  }
}

// Create a handler that returns MockClassName instances
const createProxyHandler = () => ({
  get: (_target, prop) => {
    // Don't mock special React/internal properties
    if (
      typeof prop === 'symbol' ||
      prop === 'then' ||
      prop === '$$typeof' ||
      prop === 'constructor' ||
      prop === 'nodeType' ||
      prop === 'inspect'
    ) {
      return undefined;
    }

    // For string methods, return the mock class name as a real string
    if (prop === 'toString' || prop === 'valueOf') {
      return () => MOCK_CLASS_NAME;
    }

    // For any property access, return a MockClassName that acts as a string
    // This handles chaining like styles.variants.primary or styles.sizes[size]
    return new MockClassName();
  },
});

// Create the base mock object
const mockStyles = new Proxy({}, createProxyHandler());

// Export as default for `import * as styles from './component.css'`
module.exports = mockStyles;
module.exports.default = mockStyles;

