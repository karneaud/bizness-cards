import { Link } from './Link.js';
import * as yup from 'yup';

/**
 * SocialLink class extending Link
 */
export class SocialLink extends Link {
  /**
   * Creates a new SocialLink instance
   * @param {string} value - The social media URL/handle
   * @param {string} platform - The social media platform (e.g., 'facebook', 'twitter', 'linkedin')
   */
  constructor(value = '', platform = '') {
    super(value, 'social');
    this.platform = platform;
  }

  /**
   * Gets the Yup validation schema for SocialLink
   * @returns {yup.ObjectSchema} - Yup schema for validation
   */
  static getSchema() {
    return yup.object({
      value: yup.string()
        .required('Social link value is required'),
      type: yup.string().oneOf(['social']).required(),
      platform: yup.string()
        .required('Social platform is required')
        .oneOf([
          'facebook', 'twitter', 'linkedin', 'instagram', 'youtube',
          'github', 'pinterest', 'google', 'tumblr', 'reddit',
          'flickr', 'dribbble', 'skype', 'whatsapp', 'snapchat',
          'medium', 'soundcloud', 'vimeo', 'twitch', 'discord'
        ], 'Invalid social platform')
    });
  }

  /**
   * Validates the social link using Yup schema
   * @returns {Promise<boolean>} - Promise resolving to true if valid
   */
  async validate() {
    try {
      await SocialLink.getSchema().validate(this);
      // Additional validation for URL or handle format
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const handlePattern = /^[a-zA-Z0-9._-]+$/;

      if (!(urlPattern.test(this.value.trim()) || handlePattern.test(this.value.trim()))) {
        console.error('SocialLink validation error: Invalid URL or handle format');
        return false;
      }
      return true;
    } catch (error) {
      console.error('SocialLink validation error:', error.message);
      return false;
    }
  }

  /**
   * Synchronously validates the social link using Yup schema
   * @returns {boolean} - True if valid
   */
  validateSync() {
    try {
      SocialLink.getSchema().validateSync(this);
      // Additional validation for URL or handle format
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const handlePattern = /^[a-zA-Z0-9._-]+$/;

      if (!(urlPattern.test(this.value.trim()) || handlePattern.test(this.value.trim()))) {
        console.error('SocialLink validation error: Invalid URL or handle format');
        return false;
      }
      return true;
    } catch (error) {
      console.error('SocialLink validation error:', error.message);
      return false;
    }
  }

  /**
   * Gets the platform-specific icon class
   * @returns {string} - Icon class name
   */
  getIconClass() {
    const platformIcons = {
      facebook: 'socicon-facebook',
      twitter: 'socicon-twitter',
      linkedin: 'socicon-linkedin',
      instagram: 'socicon-instagram',
      youtube: 'socicon-youtube',
      github: 'socicon-github',
      pinterest: 'socicon-pinterest',
      google: 'socicon-google',
      tumblr: 'socicon-tumblr',
      reddit: 'socicon-reddit',
      flickr: 'socicon-flickr',
      dribbble: 'socicon-dribbble',
      skype: 'socicon-skype',
      whatsapp: 'socicon-whatsapp',
      snapchat: 'socicon-snapchat',
      medium: 'socicon-medium',
      soundcloud: 'socicon-soundcloud',
      vimeo: 'socicon-vimeo',
      twitch: 'socicon-twitch',
      discord: 'socicon-discord'
    };

    return platformIcons[this.platform] || 'socicon-' + this.platform;
  }

  /**
   * Normalizes the social link URL
   * @returns {string} - Normalized URL
   */
  normalizeUrl() {
    if (!this.value) return '';

    // If it looks like a handle (no protocol/domain), return as is
    if (!this.value.includes('http') && !this.value.includes('.')) {
      return this.value;
    }

    // Add protocol if missing
    if (!this.value.startsWith('http')) {
      return 'https://' + this.value;
    }

    return this.value;
  }


  /**
   * Converts the social link to JSON object using Yup schema
   * @returns {Object} - JSON representation
   */
  toJson() {
    // Use Yup schema to ensure consistent serialization
    const socialLinkSchema = SocialLink.getSchema();
    
    // Prepare the data for serialization
    const preparedData = {
      ...super.toJson(),
      platform: this.platform,
      iconClass: this.getIconClass(),
      normalizedUrl: this.normalizeUrl()
    };

    // Use Yup's cast method to ensure data conforms to schema
    try {
      const serializedData = socialLinkSchema.cast(preparedData);
      return serializedData;
    } catch (error) {
      console.error('Error serializing social link data:', error.message);
      // Fallback to manual serialization if Yup casting fails
      return {
        ...super.toJson(),
        platform: this.platform,
        iconClass: this.getIconClass(),
        normalizedUrl: this.normalizeUrl()
      };
    }
  }
}