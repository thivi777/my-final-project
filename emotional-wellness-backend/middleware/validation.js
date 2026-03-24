const { validationResult } = require('express-validator');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Middleware to handle express-validator errors
 */
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    return sendResponse(res, 400, false, 'Validation failed', { errors: extractedErrors });
  };
};

module.exports = { validate };
