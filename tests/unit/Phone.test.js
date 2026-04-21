import { describe, it, expect } from 'vitest';
import { Phone } from '../../src/store/models/Phone.js';

describe('Phone', () => {
  describe('constructor', () => {
    it('should create a new Phone instance with default values', () => {
      const phone = new Phone();
      expect(phone).toBeInstanceOf(Phone);
      expect(phone.value).toBe('');
      expect(phone.type).toBe('phone');
    });

    it('should create a new Phone instance with provided value', () => {
      const phone = new Phone('123-456-7890');
      expect(phone).toBeInstanceOf(Phone);
      expect(phone.value).toBe('123-456-7890');
      expect(phone.type).toBe('phone');
    });
  });

  describe('value property type and validation', () => {
    it('should have a value property of type string', () => {
      const phone = new Phone('123-456-7890');
      expect(typeof phone.value).toBe('string');
    });

    it('should validate a valid phone number', async () => {
      const phone = new Phone('123-456-7890');
      const result = await phone.validate();
      expect(result).toBe(true);
    });

    it('should validate a valid international phone number', async () => {
      const phone = new Phone('+1-234-567-8900');
      const result = await phone.validate();
      expect(result).toBe(true);
    });

    it('should invalidate an invalid phone number', async () => {
      const phone = new Phone('invalid-phone');
      const result = await phone.validate();
      expect(result).toBe(false);
    });

    it('should invalidate an empty phone number', async () => {
      const phone = new Phone('');
      const result = await phone.validate();
      expect(result).toBe(false);
    });

    it('should validate using the synchronous method', () => {
      const phone = new Phone('123-456-7890');
      const result = phone.validateSync();
      expect(result).toBe(true);
    });

    it('should invalidate an invalid phone number using the synchronous method', () => {
      const phone = new Phone('invalid-phone');
      const result = phone.validateSync();
      expect(result).toBe(false);
    });
  });

  describe('toString method', () => {
    it('should return the string value of the Phone.value property', () => {
      const phone = new Phone('123-456-7890');
      expect(phone.toString()).toBe('123-456-7890');
    });

    it('should properly cast value to string when using Yup schema', () => {
      const phone = new Phone(1234567890); // Passing a number to test casting
      expect(phone.toString()).toBe('1234567890');
    });
  });

  describe('format method', () => {
    it('should format a 10-digit phone number correctly', () => {
      const phone = new Phone('1234567890');
      expect(phone.format()).toBe('(123) 456-7890');
    });

    it('should return the original value if it has less than 10 digits', () => {
      const phone = new Phone('123');
      expect(phone.format()).toBe('123');
    });

    it('should return the original value if it starts with + and has more than 11 digits', () => {
      const phone = new Phone('+123456789012');
      expect(phone.format()).toBe('+123456789012');
    });
  });

  describe('toJson method', () => {
    it('should return a JSON representation of the phone', () => {
      const phone = new Phone('123-456-7890');
      const json = phone.toJson();
      expect(json).toEqual({
        value: '123-456-7890',
        type: 'phone',
        formattedValue: '(123) 456-7890'
      });
    });
  });
});