exports.ResponseCodes = {
  // Sudoku
  NO_SUCH_SUDOKU: 1000,
  NO_SUDOKU_THIS_DATE: 1001,
  DELETE_FAILED: 1002,
  DELETE_SUCCESS: 1003,
  BATCH_DELETE_SUCCESS: 1004,

  // Signup
  EMAIL_TAKEN: 2000,
  HANDLE_TAKEN: 2001,
  HANDLE_EMPTY: 2002,
  EMAIL_EMPTY: 2003,
  EMAIL_NOT_VALID: 2004,
  PASSWORD_EMPTY: 2005,

  SIGN_UP_SUCCESS: 2010,

  // Login
  WRONG_CREDENTIALS: 3000,
  UNAUTHORIZED: 3001,
  INVALID_TOKEN: 3002,

  LOGIN_SUCCESS: 3010,

  // General
  GENERAL_ERROR: 9000,

  GENERAL_SUCCESS: 9010,
};
