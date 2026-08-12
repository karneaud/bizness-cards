---
name: vitest-tdd
description: Vitest TDD patterns for unit, integration, and feature tests in this project
---

# Vitest TDD Guidelines

## Test Setup

- Tests run with jsdom environment via `tests/setup.js`
- JSDOM is already configured with localStorage, sessionStorage, and URL mocks
- Use JSDOM for logic tests that need browser globals

## Test File Organization

- Unit tests: `tests/unit/*.test.js`
- Run with: `npm run test:unit`
- Debug: `npm run test:unit:debug`

## Test Structure (TDD)

Write tests BEFORE implementing features:

```javascript
import { describe, it, expect } from 'vitest';
import { YourModel } from '../../src/store/models/YourModel.js';

describe('YourModel', () => {
  describe('constructor', () => {
    it('should create instance with default values', () => {
      const model = new YourModel();
      expect(model).toBeInstanceOf(YourModel);
      expect(model.id).toBeDefined();
    });
  });

  describe('validation', () => {
    it('should validate valid model', async () => {
      const model = new YourModel({ requiredProp: 'value' });
      const result = await model.validate();
      expect(result).toBe(true);
    });

    it('should invalidate invalid model', async () => {
      const model = new YourModel();
      const result = await model.validate();
      expect(result).toBe(false);
    });
  });
});
```

## Test Patterns

### Unit Tests

Test individual models and their methods in isolation:

```javascript
import { YourModel } from '../../src/store/models/YourModel.js';

describe('YourModel', () => {
  describe('methodName', () => {
    it('should do something specific', () => {
      const model = new YourModel({ /* props */ });
      const result = model.methodName();
      expect(result).toBeExpected();
    });
  });
});
```

### Integration Tests

Test interactions between models:

```javascript
import { Card } from '../../src/store/models/Card.js';
import { Email } from '../../src/store/models/Email.js';

describe('Card + Email integration', () => {
  it('should add and retrieve email', () => {
    const card = new Card();
    card.addEmail('test@example.com');
    const email = card.getEmailAt(0, 'edit');
    expect(email.value).toBe('test@example.com');
  });
});
```

### Feature Tests

Test complete workflows:

```javascript
import { Card } from '../../src/store/models/Card.js';

describe('Card workflow', () => {
  it('should create, validate, and serialize card', async () => {
    const card = new Card({
      organization: 'Test Org',
      name: 'John Doe',
      emails: [new Email('test@example.com')]
    });

    const isValid = await card.validate();
    expect(isValid).toBe(true);

    const json = card.toJson();
    expect(json.name).toBe('John Doe');
  });
});
```

## Assertions

Use Vitest's built-in assertions:

- `expect(value).toBe(expected)` - exact equality
- `expect(value).toEqual(expected)` - deep equality
- `expect(value).toBeInstanceOf(Class)` - instanceof check
- `expect(value).toBeDefined()` - defined check
- `expect(value).toBeUndefined()` - undefined check
- `expect(value).toHaveLength(n)` - array length
- `expect(value).toContain(item)` - array contains
- `expect(fn).toThrow()` - function throws
- `expect(fn).rejects.toThrow()` - async function throws

## Async Testing

```javascript
describe('async operations', () => {
  it('should handle async validation', async () => {
    const model = new YourModel({ requiredProp: 'value' });
    const result = await model.validate();
    expect(result).toBe(true);
  });
});
```

## Mocking

```javascript
import { vi } from 'vitest';

describe('mocking', () => {
  it('should mock a function', () => {
    const mockFn = vi.fn(() => 'mocked result');
    expect(mockFn()).toBe('mocked result');
  });
});
```