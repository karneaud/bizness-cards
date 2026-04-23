import { Link } from './Link.js';
import * as yup from 'yup';

/**
 * SocialLink class extending Link
 */
export class SocialLink extends Link {
  /**
   * Static configuration for all supported platforms
   * Single source of truth for platform data
   */
  static PLATFORM_CONFIG = {
    facebook: {
      pattern: /facebook\.com\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://facebook.com/',
      iconClass: 'socicon-facebook',
      label: 'Facebook'
    },
    twitter: {
      pattern: /(?:twitter\.com|x\.com)\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://twitter.com/',
      iconClass: 'socicon-twitter',
      label: 'Twitter'
    },
    linkedin: {
      pattern: /linkedin\.com\/in\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://linkedin.com/in/',
      iconClass: 'socicon-linkedin',
      label: 'LinkedIn'
    },
    instagram: {
      pattern: /instagram\.com\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://instagram.com/',
      iconClass: 'socicon-instagram',
      label: 'Instagram'
    },
    youtube: {
      pattern: /youtube\.com\/(?:@|channel\/)(.+?)(?:\?|\/|$)/,
      urlBase: 'https://youtube.com/',
      iconClass: 'socicon-youtube',
      label: 'YouTube'
    },
    github: {
      pattern: /github\.com\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://github.com/',
      iconClass: 'socicon-github',
      label: 'GitHub'
    },
    dribbble: {
      pattern: /dribbble\.com\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://dribbble.com/',
      iconClass: 'socicon-dribbble',
      label: 'Dribbble'
    },
    skype: {
      pattern: /skype:(.+?)(?:\?|$)/,
      urlBase: 'skype:',
      iconClass: 'socicon-skype',
      label: 'Skype'
    },
    whatsapp: {
      pattern: /whatsapp\.com\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://whatsapp.com/',
      iconClass: 'socicon-whatsapp',
      label: 'WhatsApp'
    },
    soundcloud: {
      pattern: /soundcloud\.com\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://soundcloud.com/',
      iconClass: 'socicon-soundcloud',
      label: 'SoundCloud'
    },
    vimeo: {
      pattern: /vimeo\.com\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://vimeo.com/',
      iconClass: 'socicon-vimeo',
      label: 'Vimeo'
    },
    twitch: {
      pattern: /twitch\.tv\/(.+?)(?:\?|\/|$)/,
      urlBase: 'https://twitch.tv/',
      iconClass: 'socicon-twitch',
      label: 'Twitch'
    }
  };

  /**
   * Array of supported platform names
   */
  static getSupportedPlatforms() {
    return Object.keys(SocialLink.PLATFORM_CONFIG);
  }

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
   * Detects platform from a URL
   * @param {string} url - The URL to check
   * @returns {string|null} - Platform name or null if not detected
   */
  static detectPlatform(url) {
    if (!url) return null;
    for (const [platform, config] of Object.entries(SocialLink.PLATFORM_CONFIG)) {
      if (config.pattern.test(url)) {
        return platform;
      }
    }
    return null;
  }

  /**
   * Gets platform configuration
   * @param {string} platform - The platform name
   * @returns {Object|null} - Platform config or null
   */
  static getPlatformConfig(platform) {
    return SocialLink.PLATFORM_CONFIG[platform] || null;
  }

  /**
   * Gets the label for a platform
   * @param {string} platform - The platform name
   * @returns {string} - Platform label
   */
  static getPlatformLabel(platform) {
    const config = SocialLink.getPlatformConfig(platform);
    return config ? config.label : platform.charAt(0).toUpperCase() + platform.slice(1);
  }

  /**
   * Extracts handle from URL for a given platform
   * @param {string} url - The URL to extract from
   * @param {string} targetPlatform - The platform to use (defaults to this.platform)
   * @returns {string|null} - The extracted handle or null
   */
  extractHandle(url = null, targetPlatform = null) {
    const platform = targetPlatform || this.platform;
    const targetUrl = url || this.value;
    if (!targetUrl || !platform) return null;
    const config = SocialLink.getPlatformConfig(platform);
    if (!config) return null;
    const match = targetUrl.match(config.pattern);
    return match ? match[1] : null;
  }

  /**
   * Builds full URL from handle for the current platform
   * @param {string} handle - The handle/username
   * @returns {string} - The full URL
   */
  buildUrl(handle) {
    if (!handle) return '';
    const config = SocialLink.getPlatformConfig(this.platform);
    if (!config) return handle;
    return config.urlBase + handle;
  }

  /**
   * Gets display handle (without @ prefix)
   * @returns {string} - The handle or full URL if not parseable
   */
  getDisplayHandle() {
    const handle = this.extractHandle();
    if (handle) return handle;
    return this.value;
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
        .oneOf(SocialLink.getSupportedPlatforms(), 'Invalid social platform')
    });
  }

  /**
   * Validates the social link using Yup schema
   * @returns {Promise<boolean>} - Promise resolving to true if valid
   */
  async validate() {
    try {
      await SocialLink.getSchema().validate(this);
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
    const config = SocialLink.getPlatformConfig(this.platform);
    return config ? config.iconClass : 'socicon-' + this.platform;
  }

  /**
   * Normalizes the social link URL
   * @returns {string} - Normalized URL
   */
  normalizeUrl() {
    if (!this.value) return '';
    if (!this.value.includes('http') && !this.value.includes('.')) {
      return this.value;
    }
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
    const socialLinkSchema = SocialLink.getSchema();
    const preparedData = {
      ...super.toJson(),
      platform: this.platform,
      iconClass: this.getIconClass(),
      normalizedUrl: this.normalizeUrl()
    };

    try {
      return socialLinkSchema.cast(preparedData);
    } catch (error) {
      console.error('Error serializing social link data:', error.message);
      return {
        ...super.toJson(),
        platform: this.platform,
        iconClass: this.getIconClass(),
        normalizedUrl: this.normalizeUrl()
      };
    }
  }
}