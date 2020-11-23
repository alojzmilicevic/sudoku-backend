const router = require('express')
  .Router();
const admin = require('firebase-admin');

module.exports = router;

const db = admin.firestore();
const mainRoute = 'sudoku';

router.route('/')
  /**
   * Get All Sudokus
   *
   * # GET /sudoku
   */
  .get((req, res) => {
    console.log('=========== GET SUDOKU ============');
    db.collection(mainRoute)
      .get()
      .then((snapshot) => {
        const docs = snapshot.docs;
        const totalDocs = docs.length;
        let doc;

        if (totalDocs > 0) {
          doc = docs[0];
          return res.send(doc.data());
        }

        res.status(404).json({ error: 'No Sudoku found for this date' });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ error: err });
      });
  })
  /**
   * Create a new Sudoku
   *
   * # POST /sudoku
   */
  .post((req, res) => {
    console.log('=========== POST SUDOKU ============');
    // TODO: Require authentication to do this request
    // TODO error handling

    const easyData = {};
    const mediumData = {};
    const hardData = {};
    const easy = '000790040010500609709000050000800700070050800080007095000920086090103500805600000';
    const medium = '510000609367000000084010702000000000290000067000001250120060905406925810000073026';
    const hard = '352001000400080230089025400193002874200000000008003000031200007000000102800100953';

    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(parseInt(easy[j + (9 * i)], 10));
      }
      easyData[i] = row;
    }

    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(parseInt(medium[j + (9 * i)], 10));
      }
      mediumData[i] = row;
    }

    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(parseInt(hard[j + (9 * i)], 10));
      }
      hardData[i] = row;
    }

    const newSudoku = {
      metadata: {},
      data: {
        easy: easyData,
        medium: mediumData,
        hard: hardData,
      },
      type: 0,
      difficulty: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: 'The third',
    };

    db.collection('sudoku')
      .add(newSudoku)
      .then((doc) => {
        res.json({ message: `document ${doc.id} created successfully NEW` });
      })
      .catch((err) => {
        res.status(500)
          .json({ error: 'something went wrong' });
        console.error(err);
      });
  });

router.route('/:sudokuId')
  /**
   * Delete sudoku with {ID}
   *
   * # DELETE
   */
  .delete((req, res) => {
    res.send(`hi delete /sudoku/${req.params.sudokuId}`);
  });
