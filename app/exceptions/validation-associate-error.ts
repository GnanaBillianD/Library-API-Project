class AssociationValidationError extends Error {
  constructor(message?: any) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
  }
}

export default AssociationValidationError;
