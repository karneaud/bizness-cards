import { describe, it, expect } from 'vitest';
import { Email } from '../../src/store/models/Email.js';

describe('Email', () => {
  describe('constructor', () => {
    it('should create a new Email instance with default values', () => {
      const email = new Email();
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe('');
      expect(email.type).toBe('email');
    });

    it('should create a new Email instance with provided value', () => {
      const email = new Email('test@example.com');
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe('test@example.com');
      expect(email.type).toBe('email');
    });
  });

  describe('value property type and validation', () => {
    it('should have a value property of type string', () => {
      const email = new Email('test@example.com');
      expect(typeof email.value).toBe('string');
    });

    it('should validate a valid email address', async () => {
      const email = new Email('test@example.com');
      const result = await email.validate();
      expect(result).toBe(true);
    });

    it('should validate another valid email address', async () => {
      const email = new Email('user.name+tag@example.co.uk');
      const result = await email.validate();
      expect(result).toBe(true);
    });

    it('should invalidate an invalid email address', async () => {
      const email = new Email('invalid-email');
      const result = await email.validate();
      expect(result).toBe(false);
    });

    it('should invalidate an empty email address', async () => {
      const email = new Email('');
      const result = await email.validate();
      expect(result).toBe(false);
    });



    it('should invalidate an invalid email address using the synchronous method', () => {
      const email = new Email('invalid-email');
      const result = email.validateSync();
      expect(result).toBe(false);
    });
  });

  describe('toString method', () => {
    it('should return the string value of the Email.value property', () => {
      const email = new Email('test@example.com');
      expect(email.toString()).toBe('test@example.com');
    });

    it('should properly cast value to string when using Yup schema', () => {
      const email = new Email(12345); // Passing a number to test casting
      expect(email.toString()).toBe('12345');
    });
  });

  describe('normalize method', () => {
    it('should normalize an email address to lowercase', () => {
      const email = new Email('Test@Example.Com');
      expect(email.normalize()).toBe('test@example.com');
    });

    it('should trim whitespace from the email address', () => {
      const email = new Email(' test@example.com ');
      expect(email.normalize()).toBe('test@example.com');
    });
  });

  describe('toJson method', () => {
    it('should return a JSON representation of the email', () => {
      const email = new Email('Test@Example.Com');
      const json = email.toJson();
      expect(json).toEqual({
        value: 'Test@Example.Com',
        type: 'email',
        normalizedValue: 'test@example.com'
      });
    });
  });
});