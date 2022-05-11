import { map } from 'lodash';
import { ValidationError, UniqueConstraintError } from 'sequelize';

class BulkUploadError extends Error {
  errors: string[];
  constructor(errorObject: any) {
    super(errorObject.message);
    if (errorObject instanceof ValidationError || UniqueConstraintError) {
      this.errors = map(errorObject.errors, (error) => {
        return error;
      });
    } else {
      this.errors = [`${errorObject.message}`];
    }
  }
}

export default BulkUploadError;
