import * as yup from 'yup';

/**
 * Base Model class containing common methods for all models
 */
export class Model {
  /**
   * Validates the model instance using Yup schema
   * @param {yup.ObjectSchema} schema - The Yup schema to validate against
   * @returns {Promise<boolean>} - Promise resolving to true if valid
   */
  async validateWithSchema(schema) {
    try {
      await schema.validate(this);
      return true;
    } catch (error) {
      console.error(`${this.constructor.name} validation error:`, error.message);
      return false;
    }
  }

  /**
   * Synchronously validates the model instance using Yup schema
   * @param {yup.ObjectSchema} schema - The Yup schema to validate against
   * @returns {boolean} - True if valid
   */
  validateSyncWithSchema(schema) {
    try {
      schema.validateSync(this);
      return true;
    } catch (error) {
      console.error(`${this.constructor.name} validation error:`, error.message);
      return false;
    }
  }

  /**
   * Serializes the model instance to JSON using Yup schema
   * @param {yup.ObjectSchema} schema - The Yup schema to use for serialization
   * @param {Object} data - The data to serialize
   * @returns {Object} - Serialized data
   */
  serializeWithSchema(schema, data) {
    try {
      return schema.cast(data);
    } catch (error) {
      console.error(`Error serializing ${this.constructor.name} data:`, error.message);
      // Fallback to manual serialization if Yup casting fails
      return data;
    }
  }

  /**
   * Returns the string value of the model's primary value property
   * @param {*} value - The value to convert to string
   * @returns {string} - The value as a string or empty string if null/undefined
   */
  toStringFromValue(value) {
    if (value == null) {
      return '';
    }
    // Use Yup's casting to ensure proper string conversion if schema exists
    try {
      // If the class has a getSchema method, use it for casting
      if (this.constructor.getSchema) {
        const schema = this.constructor.getSchema();
        // Create a minimal object with the value to cast
        const result = schema.cast({ value, ...this });
        return result.value || String(value);
      } else {
        return String(value);
      }
    } catch (error) {
      // Fallback to string conversion if Yup casting fails
      return String(value);
    }
  }

  /**
   * Generates a unique ID
   * @returns {string} - Unique identifier
   */
  generateId() {
    return this.constructor.name.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Converts the model to JSON string
   * @returns {string} - JSON string representation
   */
  toJsonString() {
    return JSON.stringify(this.toJson());
  }
}