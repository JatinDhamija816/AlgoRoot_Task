class ApiResponse {
  /**
   * Constructs an ApiResponse instance.
   *
   * @param {number} statusCode - HTTP status code (e.g., 200, 201, 400).
   * @param {string} [message="Success"] - Response message.
   * @param {any} [data=null] - The response payload.
   */
  constructor(statusCode = 200, message = 'Success', data = null) {
    if (
      !Number.isInteger(statusCode) ||
      statusCode < 100 ||
      statusCode >= 600
    ) {
      throw new TypeError(
        `Invalid statusCode: ${statusCode}. Must be between 100-599.`
      );
    }

    if (typeof message !== 'string') {
      throw new TypeError(`Invalid message: ${message}. Must be a string.`);
    }

    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = this._formatData(data);
    this.timestamp = new Date().toISOString();

    Object.freeze(this); // Prevent modifications
  }

  /**
   * Ensures data is in a structured format.
   * - Keeps objects and arrays unchanged.
   * - Wraps primitive values (string, number, boolean) inside an object.
   *
   * @param {any} data - The response payload.
   * @returns {object|null}
   */
  _formatData(data) {
    if (data === null || data === undefined) return null;
    if (Array.isArray(data) || typeof data === 'object') return data;
    return { value: data }; // Wrap primitives only
  }

  /**
   * Converts ApiResponse instance to a JSON-friendly format.
   * Removes `data` field if it is `null`.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      ...(this.data !== null && { data: this.data }), // Exclude data if null
      timestamp: this.timestamp,
    };
  }

  /**
   * Returns a string representation of the response.
   *
   * @returns {string}
   */
  toString() {
    return `[${this.timestamp}] ApiResponse (${this.statusCode}): ${this.message}`;
  }
}

export default ApiResponse;
