const router = require('express').Router();
const firebase = require('firebase');
const { validateLoginData } = require('../utils/validators');

module.exports = router;

router.route('/')
  /**
   * Login
   *
   * # POST /login
   */
  .post((req, res) => {
    console.log(' == = == == = :::: LOGIN :::: == = == = == == = ');
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const { valid, errors } = validateLoginData(user);

    if (!valid) res.status(400).json({ errors });

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => data.user.getIdToken())
      .then((token) => res.json({ token }))
      .catch((e) => {
        console.error(e);
        if (e.code === 'auth/wrong-password') {
          return res.status(403).json({ general: 'Wrong credentials, please try again' });
        }
        return res.status(500).json({ error: e });
      });
  });
