import * as yup from 'yup';
import { Model } from './Model.js';

/**
 * Base Link class for contact information
 */
export class Link extends Model {
  /**
   * Creates a new Link instance
   * @param {string} value - The link/value content
   * @param {string} type - The type of link (e.g., 'phone', 'email', 'social')
   */
  constructor(value = '', type = '') {
    super();
    this.value = value;
    this.type = type;
  }

  /**
   * Gets the Yup validation schema for Link
   * @returns {yup.ObjectSchema} - Yup schema for validation
   */
  static getSchema() {
    return yup.object({
      value: yup.string().required('Link value is required'),
      type: yup.string().oneOf(['phone', 'email', 'social', 'website']).required('Link type is required')
    });
  }

  /**
   * Validates the link value using Yup schema
   * @returns {Promise<boolean>} - Promise resolving to true if valid
   */
  async validate() {
    return this.validateWithSchema(Link.getSchema());
  }

  /**
   * Synchronously validates the link value using Yup schema
   * @returns {boolean} - True if valid
   */
  validateSync() {
    return this.validateSyncWithSchema(Link.getSchema());
  }

  /**
   * Converts the link to JSON object using Yup schema
   * @returns {Object} - JSON representation
   */
  toJson() {
    // Prepare the data for serialization
    const preparedData = {
      value: this.value,
      type: this.type
    };

    // Use Yup's cast method to ensure data conforms to schema
    return this.serializeWithSchema(Link.getSchema(), preparedData);
  } 

  /**
   * Returns the string value of the Link.value property
   * @returns {string} - The value property as a string
   */
  toString() {
    return this.toStringFromValue(this.value);
  }

  /**
   * Converts the link to JSON string
   * @returns {string} - JSON string representation
   */
  toJsonString() {
    return JSON.stringify(this.toJson());
  }
}