const router = require('express').Router();
const firebase = require('firebase');

const config = require('../utils/config');

firebase.initializeApp(config);

const { validateSignupData } = require('../utils/validators');

const { db } = require('../utils/admin');

module.exports = router;

// TODO testa att detta är exports...
router.route('/')
  /**
   * Login
   *
   * # POST /signup
   */
  .post((req, res) => {
    console.log(' == = == == = :::: SIGNUP :::: == = == = == == = ');
    console.log(db);
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      handle: req.body.handle,
    };

    let token,
      userId;

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json({ errors });

    db.doc(`/users/${newUser.handle}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400)
            .json({ handle: 'this handle is already taken' });
        }
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      })
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

        return db.doc(`/users/${newUser.handle}`)
          .set(userCredentials);
      })
      .then(() => res.status(201)
        .json({ token }))
      .catch((e) => {
        console.error(e);
        if (e.code === 'auth/email-already-in-use') {
          return res.status(400)
            .json({ email: 'Email is already in use' });
        }
        res.status(500)
          .json({ error: e.code });
      });
  });
