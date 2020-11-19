const express = require('express');
const admin = require('firebase-admin');
let router = express.Router();
module.exports = router;

const db = admin.firestore();
const mainRoute = 'login';

router.route('/')
  /**
   * Login
   *
   * # POST /login
   */
  .post((req, res) => {
    const { email, password } = req.body;
    console.log(" == = == == = :::: CREDENTIALS :::: == = == = == == = ");
    console.log(email, password)

    setTimeout(() => res.send("Logged in"), 2000);
  })

