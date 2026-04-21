import { describe, it, expect } from 'vitest';
import { Card } from '../../src/store/models/Card.js';
import { Phone } from '../../src/store/models/Phone.js';
import { Email } from '../../src/store/models/Email.js';
import { SocialLink } from '../../src/store/models/SocialLink.js';
import { Link } from '../../src/store/models/Link.js';

describe('Card', () => {
  describe('constructor', () => {
    it('should create a new Card instance with default values', () => {
      const card = new Card();
      expect(card).toBeInstanceOf(Card);
      expect(card.id).toBeDefined();
      expect(card.logo).toBe('');
      expect(card.organization).toBe('');
      expect(card.name).toBe('');
      expect(card.title).toBe('');
      expect(Array.isArray(card.phones)).toBe(true);
      expect(Array.isArray(card.emails)).toBe(true);
      expect(Array.isArray(card.socialLinks)).toBe(true);
      expect(card.address).toBe('');
    });

    it('should create a new Card instance with provided values', () => {
      const card = new Card({
        id: 'test-id',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        organization: 'Test Org',
        name: 'John Doe',
        title: 'Developer',
        phones: [new Phone('123-456-7890')],
        emails: [new Email('test@example.com')],
        socialLinks: [new SocialLink('johndoe', 'twitter')],
        websites: [new Link('https://example.com', 'website')],
        address: '123 Main St'
      });
      expect(card.id).toBe('test-id');
      expect(card.logo).toContain('base64');
      expect(card.organization).toBe('Test Org');
      expect(card.name).toBe('John Doe');
      expect(card.title).toBe('Developer');
      expect(card.phones).toHaveLength(1);
      expect(card.emails).toHaveLength(1);
      expect(card.socialLinks).toHaveLength(1);
      expect(card.address).toBe('123 Main St');
    });
  });

  describe('validation', () => {
    it('should validate a card with at least one contact method', async () => {
      const card = new Card({
        organization: 'Test Org',
        name: 'John Doe',
        emails: [new Email('test@example.com')]
      });
      const result = await card.validate();
      expect(result).toBe(true);
    });

    it('should validate a card with websites as contact method', async () => {
      const card = new Card({
        organization: 'Test Org',
        name: 'John Doe',
        websites: [new Link('https://example.com', 'website')]
      });
      const result = await card.validate();
      expect(result).toBe(true);
    });

    it('should invalidate a card without any contact methods', async () => {
      const card = new Card({
        organization: 'Test Org',
        name: 'John Doe'
      });
      const result = await card.validate();
      expect(result).toBe(false);
    });

    it('should validate using the synchronous method', () => {
      const card = new Card({
        organization: 'Test Org',
        name: 'John Doe',
        phones: [new Phone('123-456-7890')]
      });
      const result = card.validateSync();
      expect(result).toBe(true);
    });
  });

  describe('collection getters and setters', () => {
    it('should get emails collection', () => {
      const emails = [new Email('test1@example.com'), new Email('test2@example.com')];
      const card = new Card({ emails });
      expect(card.getEmails()).toEqual(emails);
    });

    it('should set emails collection', () => {
      const card = new Card();
      const emails = [new Email('test1@example.com'), new Email('test2@example.com')];
      card.setEmails(emails);
      expect(card.getEmails()).toEqual(emails);
    });

    it('should get phones collection', () => {
      const phones = [new Phone('123-456-7890'), new Phone('098-765-4321')];
      const card = new Card({ phones });
      expect(card.getPhones()).toEqual(phones);
    });

    it('should set phones collection', () => {
      const card = new Card();
      const phones = [new Phone('123-456-7890'), new Phone('098-765-4321')];
      card.setPhones(phones);
      expect(card.getPhones()).toEqual(phones);
    });

    it('should get social links collection', () => {
      const socialLinks = [new SocialLink('johndoe', 'twitter'), new SocialLink('johndoe', 'linkedin')];
      const card = new Card({ socialLinks });
      expect(card.getSocialLinks()).toEqual(socialLinks);
    });

    it('should set social links collection', () => {
      const card = new Card();
      const socialLinks = [new SocialLink('johndoe', 'twitter'), new SocialLink('johndoe', 'linkedin')];
      card.setSocialLinks(socialLinks);
      expect(card.getSocialLinks()).toEqual(socialLinks);
    });

    it('should get websites collection', () => {
      const websites = [new Link('https://example.com', 'website'), new Link('https://blog.example.com', 'blog')];
      const card = new Card({ websites });
      expect(card.getWebsites()).toEqual(websites);
    });

    it('should set websites collection', () => {
      const card = new Card();
      const websites = [new Link('https://example.com', 'website'), new Link('https://blog.example.com', 'blog')];
      card.setWebsites(websites);
      expect(card.getWebsites()).toEqual(websites);
    });
  });

  describe('individual item getters', () => {
    it('should get email at specific index in edit mode', () => {
      const emails = [new Email('test1@example.com'), new Email('test2@example.com')];
      const card = new Card({ emails });
      const email = card.getEmailAt(0, 'edit');
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe('test1@example.com');
    });

    it('should get email at specific index in view mode', () => {
      const emails = [new Email('test1@example.com'), new Email('test2@example.com')];
      const card = new Card({ emails });
      const emailValue = card.getEmailAt(0, 'view');
      expect(emailValue).toBe('test1@example.com');
    });

    it('should return undefined for invalid email index', () => {
      const emails = [new Email('test1@example.com')];
      const card = new Card({ emails });
      const email = card.getEmailAt(5, 'edit');
      expect(email).toBeUndefined();
    });

    it('should get phone at specific index in edit mode', () => {
      const phones = [new Phone('123-456-7890'), new Phone('098-765-4321')];
      const card = new Card({ phones });
      const phone = card.getPhoneAt(1, 'edit');
      expect(phone).toBeInstanceOf(Phone);
      expect(phone.value).toBe('098-765-4321');
    });

    it('should get phone at specific index in view mode', () => {
      const phones = [new Phone('123-456-7890'), new Phone('098-765-4321')];
      const card = new Card({ phones });
      const phoneValue = card.getPhoneAt(1, 'view');
      expect(phoneValue).toBe('098-765-4321');
    });

    it('should return undefined for invalid phone index', () => {
      const phones = [new Phone('123-456-7890')];
      const card = new Card({ phones });
      const phone = card.getPhoneAt(5, 'edit');
      expect(phone).toBeUndefined();
    });

    it('should get social link at specific index in edit mode', () => {
      const socialLinks = [new SocialLink('johndoe', 'twitter'), new SocialLink('janedoe', 'linkedin')];
      const card = new Card({ socialLinks });
      const socialLink = card.getSocialLinkAt(0, 'edit');
      expect(socialLink).toBeInstanceOf(SocialLink);
      expect(socialLink.value).toBe('johndoe');
      expect(socialLink.platform).toBe('twitter');
    });

    it('should get social link at specific index in view mode', () => {
      const socialLinks = [new SocialLink('johndoe', 'twitter'), new SocialLink('janedoe', 'linkedin')];
      const card = new Card({ socialLinks });
      const socialLinkValue = card.getSocialLinkAt(0, 'view');
      expect(socialLinkValue).toBe('johndoe');
    });

    it('should return undefined for invalid social link index', () => {
      const socialLinks = [new SocialLink('johndoe', 'twitter')];
      const card = new Card({ socialLinks });
      const socialLink = card.getSocialLinkAt(5, 'edit');
      expect(socialLink).toBeUndefined();
    });

    it('should get website at specific index in edit mode', () => {
      const websites = [new Link('https://example.com', 'website'), new Link('https://blog.example.com', 'blog')];
      const card = new Card({ websites });
      const website = card.getWebsiteAt(0, 'edit');
      expect(website).toBeInstanceOf(Link);
      expect(website.value).toBe('https://example.com');
      expect(website.type).toBe('website');
    });

    it('should get website at specific index in view mode', () => {
      const websites = [new Link('https://example.com', 'website'), new Link('https://blog.example.com', 'blog')];
      const card = new Card({ websites });
      const websiteValue = card.getWebsiteAt(0, 'view');
      expect(websiteValue).toBe('https://example.com');
    });

    it('should return undefined for invalid website index', () => {
      const websites = [new Link('https://example.com', 'website')];
      const card = new Card({ websites });
      const website = card.getWebsiteAt(5, 'edit');
      expect(website).toBeUndefined();
    });
  });

  describe('contact methods', () => {
    it('should add a phone number', () => {
      const card = new Card();
      card.addPhone('123-456-7890');
      expect(card.phones).toHaveLength(1);
      expect(card.phones[0]).toBeInstanceOf(Phone);
      expect(card.phones[0].value).toBe('123-456-7890');
    });

    it('should add an email address', () => {
      const card = new Card();
      card.addEmail('test@example.com');
      expect(card.emails).toHaveLength(1);
      expect(card.emails[0]).toBeInstanceOf(Email);
      expect(card.emails[0].value).toBe('test@example.com');
    });

    it('should add a social link', () => {
      const card = new Card();
      card.addSocialLink({ value: 'johndoe', platform: 'twitter' });
      expect(card.socialLinks).toHaveLength(1);
      expect(card.socialLinks[0]).toBeInstanceOf(SocialLink);
      expect(card.socialLinks[0].value).toBe('johndoe');
      expect(card.socialLinks[0].platform).toBe('twitter');
    });

    it('should get valid contacts', () => {
      const card = new Card({
        phones: [new Phone('123-456-7890')],
        emails: [new Email('test@example.com')],
        socialLinks: [new SocialLink('johndoe', 'twitter')],
        websites: [new Link('https://example.com', 'website')]
      });
      const validContacts = card.getValidContacts();
      expect(validContacts).toHaveLength(4);
      expect(validContacts[0]).toBeInstanceOf(Phone);
      expect(validContacts[1]).toBeInstanceOf(Email);
      expect(validContacts[2]).toBeInstanceOf(SocialLink);
      expect(validContacts[3]).toBeInstanceOf(Link);
    });
  });

  describe('logo methods', () => {
    it('should check if card has a logo', () => {
      const cardWithoutLogo = new Card();
      expect(cardWithoutLogo.hasLogo()).toBe(false);

      const cardWithLogo = new Card({ logo: 'data:image/png;base64,test' });
      expect(cardWithLogo.hasLogo()).toBe(true);
    });
  });

  describe('serialization', () => {
    it('should convert card to JSON', () => {
      const card = new Card({
        id: 'test-id',
        organization: 'Test Org',
        name: 'John Doe',
        emails: [new Email('test@example.com')],
        phones: [new Phone('123-456-7890')],
        websites: [new Link('https://example.com', 'website')]
      });
      const json = card.toJson();
      expect(json.id).toBe('test-id');
      expect(json.organization).toBe('Test Org');
      expect(json.name).toBe('John Doe');
      expect(json.emails).toHaveLength(1);
      expect(json.phones).toHaveLength(1);
      expect(json.websites).toHaveLength(1);
    });

    it('should convert card to JSON string', () => {
      const card = new Card({
        id: 'test-id',
        organization: 'Test Org',
        name: 'John Doe',
        emails: [new Email('test@example.com')],
        websites: [new Link('https://example.com', 'website')]
      });
      const jsonString = card.toJsonString();
      const parsed = JSON.parse(jsonString);
      expect(parsed.id).toBe('test-id');
      expect(parsed.organization).toBe('Test Org');
      expect(parsed.name).toBe('John Doe');
      expect(parsed.emails).toHaveLength(1);
      expect(parsed.websites).toHaveLength(1);
    });
  });
});