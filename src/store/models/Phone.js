import { Link } from './Link.js';
import * as yup from 'yup';

/**
 * Phone class extending Link
 */
export class Phone extends Link {
  /**
   * Creates a new Phone instance
   * @param {string} value - The phone number
   */
  constructor(value = '') {
    super(value, 'phone');
  }

  /**
   * Gets the Yup validation schema for Phone
   * @returns {yup.ObjectSchema} - Yup schema for validation
   */
  static getSchema() {
    return yup.object({
      value: yup.string()
        .required('Phone number is required')
        .matches(/^[\+]?[1-9][\d\s\-\(\)]{7,}$/, 'Invalid phone number format'),
      type: yup.string().oneOf(['phone']).required()
    });
  }

  /**
   * Validates the phone number using Yup schema
   * @returns {Promise<boolean>} - Promise resolving to true if valid
   */
  async validate() {
    try {
      await Phone.getSchema().validate(this);
      return true;
    } catch (error) {
      console.error('Phone validation error:', error.message);
      return false;
    }
  }

  /**
   * Synchronously validates the phone number using Yup schema
   * @returns {boolean} - True if valid
   */
  validateSync() {
    try {
      Phone.getSchema().validateSync(this);
      return true;
    } catch (error) {
      console.error('Phone validation error:', error.message);
      return false;
    }
  }

  /**
   * Formats the phone number for display
   * @returns {string} - Formatted phone number
   */
  format() {
    // Remove all non-digit characters except +
    const digitsOnly = this.value.replace(/[^\d+]/g, '');

    // If it starts with + and has 11+ digits, format as international
    if (digitsOnly.startsWith('+') && digitsOnly.length > 11) {
      return digitsOnly;
    }

    // If it has 10 digits, format as US number
    if (digitsOnly.length === 10) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    }

    return this.value;
  }


  /**
   * Converts the phone to JSON object using Yup schema
   * @returns {Object} - JSON representation
   */
  toJson() {
    // Use Yup schema to ensure consistent serialization
    const phoneSchema = Phone.getSchema();
    
    // Prepare the data for serialization
    const preparedData = {
      ...super.toJson(),
      formattedValue: this.format()
    };

    // Use Yup's cast method to ensure data conforms to schema
    try {
      const serializedData = phoneSchema.cast(preparedData);
      return serializedData;
    } catch (error) {
      console.error('Error serializing phone data:', error.message);
      // Fallback to manual serialization if Yup casting fails
      return {
        ...super.toJson(),
        formattedValue: this.format()
      };
    }
  }
}