class SessionError extends Error {
  constructor(message?: any) {
    super(message);
    this.name = 'SessionError';
    this.message = message;
  }
}

export default SessionError;
