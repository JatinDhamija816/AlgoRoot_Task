class ApiResponse {
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

    Object.freeze(this);
  }

  _formatData(data) {
    if (data === null || data === undefined) return null;
    if (Array.isArray(data) || typeof data === 'object') return data;
    return { value: data };
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      ...(this.data !== null && { data: this.data }),
      timestamp: this.timestamp,
    };
  }

  toString() {
    return `[${this.timestamp}] ApiResponse (${this.statusCode}): ${this.message}`;
  }
}

export default ApiResponse;
