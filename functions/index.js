const functions = require('firebase-functions');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express')
const admin = require('firebase-admin');
const firebase = require('firebase');

const serviceAccount = require('./serviceAccountKey.json');

//const csrfMiddleware = csrf({ cookie: true });

const app = express();

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
//app.use(cookieParser());
//app.use(csrfMiddleware);


//Enable cors from all origins
app.use(cors());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://alojz-sudoku-firebase-project.firebaseio.com',
});

const firebaseConfig = {
  apiKey: "AIzaSyBXCF5lmP7oXq_TP3ML6m3VExiCU2T7BHk",
  authDomain: "alojz-sudoku-firebase-project.firebaseapp.com",
  databaseURL: "https://alojz-sudoku-firebase-project.firebaseio.com",
  projectId: "alojz-sudoku-firebase-project",
  storageBucket: "alojz-sudoku-firebase-project.appspot.com",
  messagingSenderId: "116495097801",
  appId: "1:116495097801:web:861ec811cde82f76a0d218"
};

firebase.initializeApp(firebaseConfig);

const sudoku = require('./routes/sudoku')
const login = require('./routes/login');

// use sudoku file to handle
// everything related to /sudoku
app.use('/sudoku', sudoku)
app.use('/login', login)

app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: 'Not Found'
  });
});

// Error handler
app.use((err, req, res, next) => {

})

// Sign up route
app.post('/signup', (req, res) => {
  const body = req.body;

  const newUser = {
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  }
  //TODO validate data

  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      return res.status(201).json({ message: `user ${data.user.uid} signed up successfully` })
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.api = functions.https.onRequest(app);

