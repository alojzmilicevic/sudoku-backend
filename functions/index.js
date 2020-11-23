const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const FBAuth = require('./middlewares/authMiddleware');
const Routes = require('./routes/routes');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(cors());

const signup = require('./routes/signup');
const sudoku = require('./routes/sudoku');
const login = require('./routes/login');

// Signup routes
app.use(Routes.SIGNUP, signup);

// Sudoku routes
app.post(Routes.SUDOKU, FBAuth, sudoku);
app.use(Routes.SUDOKU, sudoku);

// Login routes
app.use(Routes.LOGIN, login);

exports.api = functions.https.onRequest(app);
