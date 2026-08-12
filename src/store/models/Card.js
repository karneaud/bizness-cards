import { Phone } from './Phone.js';
import { Email } from './Email.js';
import { SocialLink } from './SocialLink.js';
import { Link } from './Link.js';
import { Model } from './Model.js';
import { generateId } from '../../lib/utils.js';
import * as yup from 'yup';

/**
 * Card class representing a business card
 */
export class Card extends Model {
  /**
   * Creates a new Card instance
   * @param {Object} options - Card properties
   * @param {string} options.id - Unique identifier for the card
   * @param {string} options.logo - Base64 encoded logo image
   * @param {string} options.organization - Organization name
   * @param {string} options.name - Contact person name
   * @param {string} options.title - Job title
   * @param {Array<Phone>} options.phones - Array of phone numbers
   * @param {Array<Email>} options.emails - Array of email addresses
   * @param {Array<SocialLink>} options.socialLinks - Array of social media links
   * @param {string} options.address - Physical address
   * @param {Date} options.createdAt - Creation timestamp
   * @param {Date} options.updatedAt - Last update timestamp
   */ 
  constructor({
    id = null,
    userId = null,
    logo = '',
    organization = '',
    name = '',
    title = '',
    phones = [],
    emails = [],
    socialLinks = [],
    websites = [],
    address = ''
  } = {}) {
    super();
    this.id = id || generateId('card');
    this.userId = userId || generateId('user');
    this.logo = logo;
    this.organization = organization;
    this.name = name;
    this.title = title;
    this.phones = phones.map(p => p instanceof Phone ? p : new Phone(p.value));
    this.emails = emails.map(e => e instanceof Email ? e : new Email(e.value));
    this.socialLinks = socialLinks.map(s => s instanceof SocialLink ? s : new SocialLink(s.value, s.platform));
    this.websites = websites.map(w => w instanceof Link ? w : new Link(w.value, w.type));
    this.address = address;
  }

  /**
   * Gets the Yup validation schema for Card
   * @returns {yup.ObjectSchema} - Yup schema for validation
   */
  static getSchema() {
    return yup.object({
      id: yup.string().required('Card ID is required'),
      userId: yup.string().required('User ID is required'),
      logo: yup.string().nullable(),
      organization: yup.string().required('Organization name is required').min(1, 'Organization name cannot be empty'),
      name: yup.string().required('Name is required').min(1, 'Name cannot be empty'),
      title: yup.string().nullable(),
      phones: yup.array().of(Phone.getSchema()).nullable(),
      emails: yup.array().of(Email.getSchema()).nullable(),
      socialLinks: yup.array().of(SocialLink.getSchema()).nullable(),
      websites: yup.array().of(Link.getSchema()).nullable(),
      address: yup.string().nullable()
    }).test(
      'has-contact-info',
      'At least one contact method (phone, email, social link, or website) is required',
      function(value) {
        const hasContactInfo = 
          (value.phones && value.phones.length > 0) || 
          (value.emails && value.emails.length > 0) || 
          (value.socialLinks && value.socialLinks.length > 0) ||
          (value.websites && value.websites.length > 0);
        
        return hasContactInfo;
      }
    );
  }

  /**
   * Generates a unique ID for the card
   * @returns {string} - Unique identifier
   */
  generateId() {
    return super.generateId();
  }

  /**
   * Validates the card data using Yup schema
   * @returns {Promise<boolean>} - Promise resolving to true if valid
   */
  async validate() {
    return this.validateWithSchema(Card.getSchema());
  }

  /**
   * Synchronously validates the card data using Yup schema
   * @returns {boolean} - True if valid
   */
  validateSync() {
    return this.validateSyncWithSchema(Card.getSchema());
  }

  /**
   * Adds a phone number to the card
   * @param {Phone|string} phone - Phone instance or phone number string
   */
  addPhone(phone) {
    if (typeof phone === 'string') {
      this.phones.push(new Phone(phone));
    } else if (phone instanceof Phone) {
      this.phones.push(phone);
    }
  }

  /**
   * Adds an email to the card
   * @param {Email|string} email - Email instance or email address string
   */
  addEmail(email) {
    if (typeof email === 'string') {
      this.emails.push(new Email(email));
    } else if (email instanceof Email) {
      this.emails.push(email);
    }
  }

  /**
   * Adds a social link to the card
   * @param {SocialLink|Object} socialLink - SocialLink instance or object with value and platform
   */
  addSocialLink(socialLink) {
    if (socialLink instanceof SocialLink) {
      this.socialLinks.push(socialLink);
    } else if (typeof socialLink === 'object' && socialLink.value && socialLink.platform) {
      this.socialLinks.push(new SocialLink(socialLink.value, socialLink.platform));
    }
  }


  /**
   * Gets all validated contact methods
   * @returns {Array<Link>} - Array of validated contact methods
   */
  getValidContacts() {
    const validPhones = this.phones.filter(p => p.validateSync ? p.validateSync() : p.validate());
    const validEmails = this.emails.filter(e => e.validateSync ? e.validateSync() : e.validate());
    const validSocialLinks = this.socialLinks.filter(s => s.validateSync ? s.validateSync() : s.validate());
    const validWebsites = this.websites.filter(w => w.validateSync ? w.validateSync() : w.validate());

    return [...validPhones, ...validEmails, ...validSocialLinks, ...validWebsites];
  }

  /**
   * Checks if the card has a logo
   * @returns {boolean} - True if card has a logo
   */
  hasLogo() {
    return !!this.logo;
  }

  /**
   * Getter for emails collection
   * @returns {Array<Email>} - Array of email objects
   */
  getEmails() {
    return this.emails;
  }

  /**
   * Setter for emails collection
   * @param {Array<Email>} emails - Array of email objects to set
   */
  setEmails(emails) {
    this.emails = emails.map(e => e instanceof Email ? e : new Email(e.value));
  }

  /**
   * Getter for phones collection
   * @returns {Array<Phone>} - Array of phone objects
   */
  getPhones() {
    return this.phones;
  }

  /**
   * Setter for phones collection
   * @param {Array<Phone>} phones - Array of phone objects to set
   */
  setPhones(phones) {
    this.phones = phones.map(p => p instanceof Phone ? p : new Phone(p.value));
  }

  /**
   * Getter for social links collection
   * @returns {Array<SocialLink>} - Array of social link objects
   */
  getSocialLinks() {
    return this.socialLinks;
  }

  /**
   * Setter for social links collection
   * @param {Array<SocialLink>} socialLinks - Array of social link objects to set
   */
  setSocialLinks(socialLinks) {
    this.socialLinks = socialLinks.map(s => s instanceof SocialLink ? s : new SocialLink(s.value, s.platform));
  }

  /**
   * Getter for websites collection
   * @returns {Array<Link>} - Array of website link objects
   */
  getWebsites() {
    return this.websites;
  }

  /**
   * Setter for websites collection
   * @param {Array<Link>} websites - Array of website link objects to set
   */
  setWebsites(websites) {
    this.websites = websites.map(w => w instanceof Link ? w : new Link(w.value, w.type));
  }

  /**
   * Gets a single email at the specified index
   * @param {number} index - Index of the email to retrieve
   * @param {'view'|'edit'} mode - Mode to determine return type ('view' returns string, 'edit' returns object)
   * @returns {string|Email|undefined} - Email value as string in 'view' mode, Email object in 'edit' mode, or undefined if not found
   */
  getEmailAt(index, mode = 'edit') {
    if (index < 0 || index >= this.emails.length) {
      return undefined;
    }

    const email = this.emails[index];
    if (mode === 'view') {
      return email.toString(); // Returns the string value of the email
    } else {
      return email; // Returns the Email object
    }
  }

  /**
   * Gets a single phone at the specified index
   * @param {number} index - Index of the phone to retrieve
   * @param {'view'|'edit'} mode - Mode to determine return type ('view' returns string, 'edit' returns object)
   * @returns {string|Phone|undefined} - Phone value as string in 'view' mode, Phone object in 'edit' mode, or undefined if not found
   */
  getPhoneAt(index, mode = 'edit') {
    if (index < 0 || index >= this.phones.length) {
      return undefined;
    }

    const phone = this.phones[index];
    if (mode === 'view') {
      return phone.toString(); // Returns the string value of the phone
    } else {
      return phone; // Returns the Phone object
    }
  }

  /**
   * Gets a single social link at the specified index
   * @param {number} index - Index of the social link to retrieve
   * @param {'view'|'edit'} mode - Mode to determine return type ('view' returns string, 'edit' returns object)
   * @returns {string|SocialLink|undefined} - Social link value as string in 'view' mode, SocialLink object in 'edit' mode, or undefined if not found
   */
  getSocialLinkAt(index, mode = 'edit') {
    if (index < 0 || index >= this.socialLinks.length) {
      return undefined;
    }

    const socialLink = this.socialLinks[index];
    if (mode === 'view') {
      return socialLink.toString(); // Returns the string value of the social link
    } else {
      return socialLink; // Returns the SocialLink object
    }
  }

  /**
   * Gets a single website at the specified index
   * @param {number} index - Index of the website to retrieve
   * @param {'view'|'edit'} mode - Mode to determine return type ('view' returns string, 'edit' returns object)
   * @returns {string|Link|undefined} - Website value as string in 'view' mode, Link object in 'edit' mode, or undefined if not found
   */
  getWebsiteAt(index, mode = 'edit') {
    if (index < 0 || index >= this.websites.length) {
      return undefined;
    }

    const website = this.websites[index];
    if (mode === 'view') {
      return website.toString(); // Returns the string value of the website
    } else {
      return website; // Returns the Link object
    }
  }

  /**
   * Converts the card to JSON object using Yup schema
   * @param {Object} schema - Optional schema to customize output
   * @returns {Object} - JSON representation
   */
  toJson(schema = null) {
    if (schema) {
      // If a custom schema is provided, return only the fields specified in the schema
      const result = {};
      for (const [key, include] of Object.entries(schema)) {
        if (include && this.hasOwnProperty(key)) {
          if (Array.isArray(this[key])) {
            result[key] = this[key].map(item => item.toJson ? item.toJson() : item);
          } else if (this[key] && typeof this[key].toJson === 'function') {
            result[key] = this[key].toJson();
          } else {
            result[key] = this[key];
          }
        }
      }
      return result;
    }

    // Prepare the data for serialization
    const preparedData = {
      id: this.id,
      userId: this.userId,
      logo: this.logo,
      organization: this.organization,
      name: this.name,
      title: this.title,
      phones: this.phones.map(phone => phone.toJson()),
      emails: this.emails.map(email => email.toJson()),
      socialLinks: this.socialLinks.map(socialLink => socialLink.toJson()),
      websites: this.websites.map(website => website.toJson()),
      address: this.address
    };

    // Use Yup's cast method to ensure data conforms to schema
    return this.serializeWithSchema(Card.getSchema(), preparedData);
  }

  /**
   * Converts the card to JSON string
   * @param {Object} schema - Optional schema to customize output
   * @returns {string} - JSON string representation
   */
  toJsonString(schema = null) {
    return JSON.stringify(this.toJson(schema));
  }

  /**
   * Creates a Card instance from a JSON object
   * @param {Object} json - JSON object representing a card
   * @returns {Card} - New Card instance
   */
  static fromJson(json) {
    if (!json) return null;

    return new Card({
      id: json.id,
      userId: json.userId,
      logo: json.logo,
      organization: json.organization,
      name: json.name,
      title: json.title,
      phones: (json.phones || []).map(p => new Phone(p.value)),
      emails: (json.emails || []).map(e => new Email(e.value)),
      socialLinks: (json.socialLinks || []).map(s => new SocialLink(s.value, s.platform)),
      websites: (json.websites || []).map(w => new Link(w.value, w.type)),
      address: json.address
    });
  }
}