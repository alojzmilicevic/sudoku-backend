const firebase = require('firebase');
const { successResponse, errorResponse } = require('../responseHelpers/responses');
const { ResponseCodes } = require('../responseHelpers/constants/responseCodes');
const { validateLoginData } = require('../validators/authValidator');

/**
 * Login
 *
 * # POST /login
 */
exports.login = (req, res) => {
  console.log(' == = == == = :::: LOGIN :::: == = == = == == = ');
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) {
    return errorResponse(res, { errors });
  }

  firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => data.user.getIdToken())
    .then((token) => successResponse(res, { token }))
    .catch(() => errorResponse(res, { code: ResponseCodes.WRONG_CREDENTIALS }));
};
