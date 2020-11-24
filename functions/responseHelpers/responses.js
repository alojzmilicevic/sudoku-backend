const { SuccessCodes } = require('./constants/succesCodes');
const { ResponseCodes } = require('./constants/responseCodes');
const { ErrorCodes } = require('./constants/errorCodes');

exports.successResponse = (
  res, { token, code = ResponseCodes.GENERAL_SUCCESS } = {},
) => {
  const responseData = SuccessCodes[code];
  if (token) {
    responseData.token = token;
  }
  console.log(responseData);

  return res.json(responseData);
};

exports.errorResponse = (
  res, { errors, code = ResponseCodes.GENERAL_ERROR } = {},
) => {
  const responseData = errors || ErrorCodes[code];
  console.error(responseData.msg, 'code:', code);
  return res.status(responseData.status).json(responseData);
};
