const { ResponseCodes } = require('./responseCodes');

exports.SuccessCodes = {
  /* = = = = = = = Sudoku = = = = = = = = = */
  [ResponseCodes.DELETE_SUCCESS]: {
    code: ResponseCodes.DELETE_SUCCESS,
    msg: 'Sudoku deleted successfully',
    status: 200,
  },

  [ResponseCodes.BATCH_DELETE_SUCCESS]: {
    code: ResponseCodes.BATCH_DELETE_SUCCESS,
    msg: 'Sudoku\'s deleted successfully',
    status: 200,
  },

  /* = = = = = = = Signup = = = = = = = = = */
  [ResponseCodes.SIGN_UP_SUCCESS]: {
    code: ResponseCodes.SIGN_UP_SUCCESS,
    msg: 'Ok',
    status: 201,
  },

  /* = = = = = = = Login = = = = = = = = = */
  [ResponseCodes.LOGIN_SUCCESS]: {
    code: ResponseCodes.LOGIN_SUCCESS,
    msg: 'Ok',
    status: 200,
  },

  /* = = = = = = = General = = = = = = = = = */
  [ResponseCodes.GENERAL_SUCCESS]: {
    code: ResponseCodes.GENERAL_SUCCESS,
    msg: 'Ok',
    status: 200,
  },
};
