import { Link } from './Link.js';
import * as yup from 'yup';

/**
 * Email class extending Link
 */
export class Email extends Link {
  /**
   * Creates a new Email instance
   * @param {string} value - The email address
   */
  constructor(value = '') {
    super(value, 'email');
  }

  /**
   * Gets the Yup validation schema for Email
   * @returns {yup.ObjectSchema} - Yup schema for validation
   */
  static getSchema() {
    return yup.object({
      value: yup.string()
        .required('Email address is required')
        .email('Invalid email format'),
      type: yup.string().oneOf(['email']).required()
    });
  }

  /**
   * Validates the email address using Yup schema
   * @returns {Promise<boolean>} - Promise resolving to true if valid
   */
  async validate() {
    try {
      await Email.getSchema().validate(this);
      return true;
    } catch (error) {
      console.error('Email validation error:', error.message);
      return false;
    }
  }

  /**
   * Synchronously validates the email address using Yup schema
   * @returns {boolean} - True if valid
   */
  validateSync() {
    try {
      Email.getSchema().validateSync(this);
      return true;
    } catch (error) {
      console.error('Email validation error:', error.message);
      return false;
    }
  }

  /**
   * Normalizes the email address (lowercase)
   * @returns {string} - Normalized email address
   */
  normalize() {
    return this.value.toLowerCase().trim();
  }


  /**
   * Converts the email to JSON object using Yup schema
   * @returns {Object} - JSON representation
   */
  toJson() {
    // Use Yup schema to ensure consistent serialization
    const emailSchema = Email.getSchema();
    
    // Prepare the data for serialization
    const preparedData = {
      ...super.toJson(),
      normalizedValue: this.normalize()
    };

    // Use Yup's cast method to ensure data conforms to schema
    try {
      const serializedData = emailSchema.cast(preparedData);
      return serializedData;
    } catch (error) {
      console.error('Error serializing email data:', error.message);
      // Fallback to manual serialization if Yup casting fails
      return {
        ...super.toJson(),
        normalizedValue: this.normalize()
      };
    }
  }
}