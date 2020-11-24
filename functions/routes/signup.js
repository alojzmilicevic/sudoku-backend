const firebase = require('firebase');

const config = require('../utils/config');
const { successResponse, errorResponse } = require('../responseHelpers/responses');
const { ResponseCodes } = require('../responseHelpers/constants/responseCodes');

firebase.initializeApp(config);

const { validateSignupData } = require('../validators/authValidator');

const { db } = require('../admin/admin');

/**
   *
   * # POST /signup
   */
exports.signup = (req, res) => {
  console.log(' == = == == = :::: SIGNUP :::: == = == = == == = ');
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    handle: req.body.handle,
  };

  let token, userId;

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) {
    return errorResponse(res, { errors });
  }

  const docRef = `/users/${newUser.handle}`;

  db.doc(docRef).get().then((doc) => {
    if (doc.exists) {
      return errorResponse(res, { code: ResponseCodes.HANDLE_TAKEN });
    }
    return firebase.auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId,
        };

        return db.doc(docRef).set(userCredentials);
      })
      .then(() => successResponse(res,
        { code: ResponseCodes.SIGN_UP_SUCCESS, token }))
      .catch((e) => {
        if (e.code === 'auth/email-already-in-use') {
          return errorResponse(res, { code: ResponseCodes.EMAIL_TAKEN });
        }
        return errorResponse(res);
      });
  });
};
