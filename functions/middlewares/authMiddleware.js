const { admin, db } = require('../utils/admin');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  let idToken;
  if (authorization && authorization.startsWith('Bearer ')) {
    idToken = authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403)
      .json({ error: 'Unauthorized' });
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
    .catch((e) => {
      console.error('Error while verifying token', e);
      return res.status(403)
        .json({ error: e });
    });
}

module.exports = authMiddleware;
