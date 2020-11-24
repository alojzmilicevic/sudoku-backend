const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const FBAuth = require('./middlewares/authMiddleware');
const Routes = require('./routes/routes');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(cors());

const { signup } = require('./routes/signup');
const { login } = require('./routes/login');

const {
  postSudokus, getTodaysSudoku, deleteSudoku, batchDeleteSudokus,
} = require('./routes/sudoku');

// Signup routes
app.post(Routes.SIGNUP, signup);

// Sudoku routes
app.post(Routes.SUDOKU, FBAuth, postSudokus);
app.delete(Routes.SUDOKU_ID, FBAuth, deleteSudoku);
app.delete(Routes.DELETE_SUDOKU, FBAuth, batchDeleteSudokus);
app.get(Routes.SUDOKU, getTodaysSudoku);

// Login routes
app.post(Routes.LOGIN, login);

exports.api = functions.region('europe-west1').https.onRequest(app);
