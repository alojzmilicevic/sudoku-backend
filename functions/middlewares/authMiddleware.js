const { ResponseCodes } = require('../responseHelpers/constants/responseCodes');
const { errorResponse } = require('../responseHelpers/responses');
const { admin, db } = require('../admin/admin');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  let idToken;
  if (authorization && authorization.startsWith('Bearer ')) {
    idToken = authorization.split('Bearer ')[1];
  } else {
    return errorResponse(res, { code: ResponseCodes.INVALID_TOKEN });
  }

  admin.auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      return next();
    })
    .catch(() => errorResponse(res, { code: ResponseCodes.UNAUTHORIZED }));
}

module.exports = authMiddleware;
