const { SuccessCodes } = require('./succesCodes');
const { ResponseCodes } = require('./responseCodes');
const { ErrorCodes } = require('./errorCodes');

exports.successResponse = (
  res, { token, code = ResponseCodes.GENERAL_SUCCESS } = {},
) => {
  const responseData = SuccessCodes[code];
  if (token) {
    responseData.token = token;
  }

  return res.json(responseData);
};

exports.errorResponse = (
  res, { errors, code = ResponseCodes.GENERAL_ERROR } = {},
) => {
  const responseData = errors || ErrorCodes[code];
  console.error(responseData.msg, 'code:', code);
  return res.status(responseData.status).json(responseData);
};
