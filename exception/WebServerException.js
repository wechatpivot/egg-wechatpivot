module.exports = class WebServerException extends Error {
  constructor(status, code, message, developerMessage) {
    if (!message) {
      message = code;
      code = status;
      status = 422;
    }

    super(message);

    this.name = 'WebServerException';
    this.status = status;
    this.code = code;
    if (developerMessage) {
      this.developerMessage = developerMessage;
    }
  }
}
