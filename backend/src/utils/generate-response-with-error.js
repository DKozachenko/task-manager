const generateResponseWithError = (message) => ({
  data: undefined,
  error: true,
  message
});

module.exports = generateResponseWithError;