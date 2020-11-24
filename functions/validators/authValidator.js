const { ResponseCodes } = require('../responseHelpers/responseCodes');
const { ErrorCodes } = require('../responseHelpers/errorCodes');

const { objSize } = require('../utils/util');

const isEmpty = (string) => string.trim() === '';
const isEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email.match(regEx);
};

exports.validateSignupData = (data) => {
  const errors = {
    msg: 'Empty or invalid credentials',
    status: 400,
  };

  if (isEmpty(data.email)) {
    errors.email = ErrorCodes[ResponseCodes.EMAIL_EMPTY];
  } else if (!isEmail(data.email)) {
    errors.email = ErrorCodes[ResponseCodes.EMAIL_NOT_VALID];
  }

  if (isEmpty(data.password)) {
    errors.password = ErrorCodes[ResponseCodes.PASSWORD_EMPTY];
  }

  if (isEmpty(data.handle)) {
    errors.handle = ErrorCodes[ResponseCodes.HANDLE_EMPTY];
  }

  return {
    errors,
    valid: objSize(errors) === 2,
  };
};

exports.validateLoginData = (data) => {
  const errors = {
    msg: 'Must not be empty',
    status: 400,
  };

  if (isEmpty(data.email)) {
    errors.email = ErrorCodes[ResponseCodes.EMAIL_EMPTY];
  }
  if (isEmpty(data.password)) {
    errors.password = ErrorCodes[ResponseCodes.PASSWORD_EMPTY];
  }

  return {
    errors,
    valid: objSize(errors) === 2,
  };
};
