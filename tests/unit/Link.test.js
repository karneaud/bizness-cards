// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { Link } from '../../src/store/models/Link.js';

describe('Link', () => {
  describe('constructor', () => {
    it('should create a new Link instance with default values', () => {
      const link = new Link();
      expect(link).toBeInstanceOf(Link);
      expect(link.value).toBe('');
      expect(link.type).toBe('');
    });

    it('should create a new Link instance with provided values', () => {
      const link = new Link('test@example.com', 'email');
      expect(link).toBeInstanceOf(Link);
      expect(link.value).toBe('test@example.com');
      expect(link.type).toBe('email');
    });
  });

  describe('getSchema', () => {
    it('should return a Yup schema', () => {
      const schema = Link.getSchema();
      expect(schema).toBeDefined();
      expect(typeof schema.validate).toBe('function');
    });

    it('should validate a valid link', async () => {
      const schema = Link.getSchema();
      const validLink = { value: 'test', type: 'email' };
      const result = await schema.isValid(validLink);
      expect(result).toBe(true);
    });

    it('should invalidate a link without value', async () => {
      const schema = Link.getSchema();
      const invalidLink = { value: '', type: 'email' };
      const result = await schema.isValid(invalidLink);
      expect(result).toBe(false);
    });

    it('should invalidate a link with invalid type', async () => {
      const schema = Link.getSchema();
      const invalidLink = { value: 'test', type: 'invalid' };
      const result = await schema.isValid(invalidLink);
      expect(result).toBe(false);
    });
  });

  describe('validate', () => {
    it('should validate a valid link asynchronously', async () => {
      const link = new Link('test@example.com', 'email');
      const result = await link.validate();
      expect(result).toBe(true);
    });

    it('should invalidate a link without value asynchronously', async () => {
      const link = new Link('', 'email');
      const result = await link.validate();
      expect(result).toBe(false);
    });

    it('should validate a valid link synchronously', () => {
      const link = new Link('test@example.com', 'email');
      const result = link.validateSync();
      expect(result).toBe(true);
    });

    it('should invalidate a link without value synchronously', () => {
      const link = new Link('', 'email');
      const result = link.validateSync();
      expect(result).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the string value of the Link.value property', () => {
      const link = new Link('test@example.com', 'email');
      expect(link.toString()).toBe('test@example.com');
    });

    it('should return empty string when value is null', () => {
      const link = new Link(null, 'email');
      // Since the constructor sets this.value = value, we need to simulate null value
      link.value = null;
      expect(link.toString()).toBe('');
    });

    it('should return empty string when value is undefined', () => {
      const link = new Link(undefined, 'email');
      // Since the constructor sets this.value = value, we need to simulate undefined value
      link.value = undefined;
      expect(link.toString()).toBe('');
    });

    it('should properly cast value to string when using Yup schema', () => {
      const link = new Link(12345, 'phone'); // Passing a number to test casting
      expect(link.toString()).toBe('12345');
    });
  });

  describe('toJson', () => {
    it('should return a JSON representation of the link', () => {
      const link = new Link('test@example.com', 'email');
      const json = link.toJson();
      expect(json).toEqual({
        value: 'test@example.com',
        type: 'email'
      });
    });

    it('should return a properly cast JSON representation using Yup schema', () => {
      const link = new Link('test@example.com', 'email');
      const json = link.toJson();
      expect(json.value).toBe('test@example.com');
      expect(json.type).toBe('email');
    });
  });

  describe('toJsonString', () => {
    it('should return a JSON string representation of the link', () => {
      const link = new Link('test@example.com', 'email');
      const jsonString = link.toJsonString();
      const parsed = JSON.parse(jsonString);
      expect(parsed).toEqual({
        value: 'test@example.com',
        type: 'email'
      });
    });
  });
});