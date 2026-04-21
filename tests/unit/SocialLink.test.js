import { describe, it, expect } from 'vitest';
import { SocialLink } from '../../src/store/models/SocialLink.js';

describe('SocialLink', () => {
  describe('constructor', () => {
    it('should create a new SocialLink instance with default values', () => {
      const socialLink = new SocialLink();
      expect(socialLink).toBeInstanceOf(SocialLink);
      expect(socialLink.value).toBe('');
      expect(socialLink.type).toBe('social');
      expect(socialLink.platform).toBe('');
    });

    it('should create a new SocialLink instance with provided values', () => {
      const socialLink = new SocialLink('username', 'twitter');
      expect(socialLink).toBeInstanceOf(SocialLink);
      expect(socialLink.value).toBe('username');
      expect(socialLink.type).toBe('social');
      expect(socialLink.platform).toBe('twitter');
    });
  });

  describe('value property type and validation', () => {
    it('should have a value property of type string', () => {
      const socialLink = new SocialLink('username', 'twitter');
      expect(typeof socialLink.value).toBe('string');
    });

    it('should validate a valid social link URL', async () => {
      const socialLink = new SocialLink('https://twitter.com/username', 'twitter');
      const result = await socialLink.validate();
      expect(result).toBe(true);
    });

    it('should validate a valid social link handle', async () => {
      const socialLink = new SocialLink('username', 'twitter');
      const result = await socialLink.validate();
      expect(result).toBe(true);
    });

    it('should invalidate an invalid social link', async () => {
      const socialLink = new SocialLink('', 'twitter');
      const result = await socialLink.validate();
      expect(result).toBe(false);
    });

    it('should invalidate a social link without platform', async () => {
      const socialLink = new SocialLink('username', '');
      const result = await socialLink.validate();
      expect(result).toBe(false);
    });

    it('should validate using the synchronous method', () => {
      const socialLink = new SocialLink('https://twitter.com/username', 'twitter');
      const result = socialLink.validateSync();
      expect(result).toBe(true);
    });

    it('should invalidate an invalid social link using the synchronous method', () => {
      const socialLink = new SocialLink('', 'twitter');
      const result = socialLink.validateSync();
      expect(result).toBe(false);
    });
  });

  describe('toString method', () => {
    it('should return the string value of the SocialLink.value property', () => {
      const socialLink = new SocialLink('https://twitter.com/username', 'twitter');
      expect(socialLink.toString()).toBe('https://twitter.com/username');
    });

    it('should properly cast value to string when using Yup schema', () => {
      const socialLink = new SocialLink(12345, 'twitter'); // Passing a number to test casting
      expect(socialLink.toString()).toBe('12345');
    });
  });

  describe('getIconClass method', () => {
    it('should return the correct icon class for a known platform', () => {
      const socialLink = new SocialLink('username', 'twitter');
      expect(socialLink.getIconClass()).toBe('socicon-twitter');
    });

    it('should return a generic icon class for an unknown platform', () => {
      const socialLink = new SocialLink('username', 'unknown');
      expect(socialLink.getIconClass()).toBe('socicon-unknown');
    });
  });

  describe('normalizeUrl method', () => {
    it('should return the value as is if it looks like a handle', () => {
      const socialLink = new SocialLink('username', 'twitter');
      expect(socialLink.normalizeUrl()).toBe('username');
    });

    it('should add protocol if missing from URL', () => {
      const socialLink = new SocialLink('twitter.com/username', 'twitter');
      expect(socialLink.normalizeUrl()).toBe('https://twitter.com/username');
    });

    it('should return the value as is if it already has protocol', () => {
      const socialLink = new SocialLink('https://twitter.com/username', 'twitter');
      expect(socialLink.normalizeUrl()).toBe('https://twitter.com/username');
    });
  });

  describe('toJson method', () => {
    it('should return a JSON representation of the social link', () => {
      const socialLink = new SocialLink('https://twitter.com/username', 'twitter');
      const json = socialLink.toJson();
      expect(json).toEqual({
        value: 'https://twitter.com/username',
        type: 'social',
        platform: 'twitter',
        iconClass: 'socicon-twitter',
        normalizedUrl: 'https://twitter.com/username'
      });
    });
  });
});