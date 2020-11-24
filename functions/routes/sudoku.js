const Routes = require('./routes');
const { ResponseCodes } = require('../responseHelpers/constants/responseCodes');
const { successResponse, errorResponse } = require('../responseHelpers/responses');
const { stringToBoard } = require('../utils/util');
const { validateNewSudokus, batchDeleteValidation, batchDeleteErrors } = require('../validators/sudokuValidator');

const { db } = require('../admin/admin');
/**
 * Get the sudoku of today
 *
 * # GET /sudoku
 */
exports.getTodaysSudoku = (req, res) => {
  console.log('=========== GET SUDOKU ============');

  db.collection('sudoku').get().then((snapshot) => {
    const docs = snapshot.docs;
    const totalDocs = docs.length;
    let doc;

    // TODO Match date
    if (totalDocs > 0) {
      doc = docs[0];
      return res.send(doc.data());
    }

    return errorResponse(res, { code: ResponseCodes.NO_SUDOKU_THIS_DATE });
  }).catch(() => errorResponse(res));
};

/**
 * Create a new Sudoku
 *
 * # POST /sudoku
 */
exports.postSudokus = (req, res) => {
  console.log('=========== POST SUDOKU ============');

  // Should contain a list of Sudoku groups,
  // where each group contains three Sudoku's (easy, medium, hard)
  const sudokuList = req.body.sudokuList;

  const { valid, errors } = validateNewSudokus(sudokuList);

  if (!valid) {
    return errorResponse(res, { errors });
  }

  const batch = db.batch();

  // All sudokus are valid, now we just need to update the db;
  sudokuList.forEach((group) => {
    const {
      easy, medium, hard, date,
    } = group;

    const newSudoku = {
      data: {
        easy: stringToBoard(easy),
        medium: stringToBoard(medium),
        hard: stringToBoard(hard),
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      date,
    };

    const docRef = db.collection(Routes.SUDOKU).doc(); // automatically generate unique id
    batch.set(docRef, newSudoku);
  });

  batch.commit()
    .then(() => successResponse(res))
    .catch(() => errorResponse(res));
};

exports.deleteSudoku = (req, res) => {
  console.log('== = = == = == == == DELETE SUDOKU BY ID == = == == = == = == == ');
  const id = req.params.sudokuId;
  const document = db.doc(`${Routes.SUDOKU}/${id}`);

  document.get().then(doc => {
    if (!doc.exists) {
      return errorResponse(res, { code: ResponseCodes.NO_SUCH_SUDOKU });
    }

    return document.delete()
      .then(() => successResponse(res, { code: ResponseCodes.DELETE_SUCCESS }));
  }).catch(() => errorResponse(res));
};

exports.batchDeleteSudokus = async (req, res) => {
  console.log('= = == = == = == == = = BATCH DELETE SUDOKUS = = == = == == = = ');

  const idList = req.body.idList;

  const { valid, errors } = batchDeleteValidation(idList);

  if (!valid) {
    return errorResponse(res, { errors });
  }

  // list of id's is valid
  const batch = db.batch();

  const objList = {};

  idList.forEach(id => {
    objList[id] = false;
  });

  db.collection('sudoku').get().then((snapshot) => {
    const docs = snapshot.docs;

    let deleteCount = 0;

    docs.forEach(doc => {
      const document = db.doc(`${Routes.SUDOKU}/${doc.id}`);

      if (idList.includes(doc.id)) {
        deleteCount++;
        objList[doc.id] = true;
        batch.delete(document);
      }
    });

    // We weren't able to delete all the objects
    const { isValid, errorList } = batchDeleteErrors(idList, objList, deleteCount);

    if (!isValid) {
      return errorResponse(res,
        { code: ResponseCodes.DELETE_FAILED, errors: errorList });
    }

    return batch.commit()
      .then(() => successResponse(res, { code: ResponseCodes.BATCH_DELETE_SUCCESS }))
      .catch(() => errorResponse(res));
  });
};
