const express = require('express');
const admin = require('firebase-admin');
let router = express.Router();
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
    let found = false;
    db.collection(mainRoute).get()
      .then(snapshot => {
        const totalDocs = snapshot.docs.length;
        if (totalDocs > 0) {
          snapshot.docs.forEach((doc) => {
            //const date = doc.data().date.toDate().toDateString();
            //if (date === new Date().toDateString()) {
              found = true;
              res.send(doc.data())
            //}
          });
        }
        if (!found || totalDocs === 0) {
          res.sendStatus(404);
        }
      })
      .catch(err => {
        console.error(err);
      })
  })
  /**
   * Create a new Sudoku
   *
   * # POST /sudoku
   */
  .post((req, res) => {
    console.log(req.headers)
    return;
    //TODO: Require authentication to do this request
    //TODO error handling

    const easyData = {};
    const mediumData = {};
    const hardData = {};
    const easy = '000790040010500609709000050000800700070050800080007095000920086090103500805600000';
    const medium = '510000609367000000084010702000000000290000067000001250120060905406925810000073026';
    const hard = '352001000400080230089025400193002874200000000008003000031200007000000102800100953';

    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(parseInt(easy[j + (9 * i)]))
      }
      easyData[i] = row;
    }

    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(parseInt(medium[j + (9 * i)]))
      }
      mediumData[i] = row;
    }

    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(parseInt(hard[j + (9 * i)]))
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
    }

    db.collection('sudoku')
      .add(newSudoku)
      .then((doc) => {
        res.json({ message: `document ${doc.id} created successfully NEW` });
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong' });
        console.error(err);
      })
  })

router.route('/:sudokuId')
  /**
   * Delete sudoku with {ID}
   *
   * # DELETE
   */
  .delete((req, res) => {
    res.send("hi delete /sudoku/" + req.params.sudokuId)
  })

