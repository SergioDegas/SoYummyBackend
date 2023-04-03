const authenticate = require('./authenticate');
const isValidId = require('./isValidId');
const isBodyNotEmpty = require('./isBodyNotEmpty');
const schemaValidator = require('./schemaValidator');
const uploadCloud = require('./uploadMiddleware');

module.exports = {
  authenticate,
  isValidId,
  isBodyNotEmpty,
  schemaValidator,
  uploadCloud,
};
