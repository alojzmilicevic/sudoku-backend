const { ResponseCodes } = require('./responseCodes');

exports.ErrorCodes = {
  /* = = = = = = = Sudoku = = = = = = = = = */
  [ResponseCodes.NO_SUCH_SUDOKU]: {
    code: ResponseCodes.NO_SUCH_SUDOKU,
    msg: 'No such sudoku',
    status: 404,
  },
  [ResponseCodes.NO_SUDOKU_THIS_DATE]: {
    code: ResponseCodes.NO_SUDOKU_THIS_DATE,
    msg: 'No sudoku found for this date',
    status: 404,
  },
  [ResponseCodes.DELETE_FAILED]: {
    code: ResponseCodes.DELETE_FAILED,
    msg: 'Error while deleting',
    status: 400,
  },

  /* = = = = = = = Signup = = = = = = = = = */
  [ResponseCodes.EMAIL_TAKEN]: {
    code: ResponseCodes.EMAIL_TAKEN,
    msg: 'This email is taken',
    status: 400,
  },
  [ResponseCodes.HANDLE_TAKEN]: {
    code: ResponseCodes.HANDLE_TAKEN,
    msg: 'This handle is already taken',
    status: 400,
  },
  [ResponseCodes.EMAIL_NOT_VALID]: {
    code: ResponseCodes.EMAIL_NOT_VALID,
    msg: 'Must be a valid email address',
    status: 400,
  },

  // Empty fields, used for signup and login
  [ResponseCodes.HANDLE_EMPTY]: {
    code: ResponseCodes.HANDLE_EMPTY,
    msg: 'Must not be empty',
    status: 400,
  },
  [ResponseCodes.EMAIL_EMPTY]: {
    code: ResponseCodes.EMAIL_EMPTY,
    msg: 'Must not be empty',
    status: 400,
  },
  [ResponseCodes.PASSWORD_EMPTY]: {
    code: ResponseCodes.PASSWORD_EMPTY,
    msg: 'Must not be empty',
    status: 400,
  },

  /* = = = = = = = Login = = = = = = = = = */
  [ResponseCodes.WRONG_CREDENTIALS]: {
    code: ResponseCodes.WRONG_CREDENTIALS,
    msg: 'Wrong credentials, please try again',
    status: 400,
  },

  [ResponseCodes.UNAUTHORIZED]: {
    code: ResponseCodes.UNAUTHORIZED,
    msg: 'Unauthorized',
    status: 403,
  },
  [ResponseCodes.INVALID_TOKEN]: {
    code: ResponseCodes.INVALID_TOKEN,
    msg: 'Unauthorized',
    status: 403,
  },

  /* = = = = = = = General = = = = = = = = = */
  [ResponseCodes.GENERAL_ERROR]: {
    code: ResponseCodes.GENERAL_ERROR,
    msg: 'Something went wrong, please try again',
    status: 500,
  },
};
