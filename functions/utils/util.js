const toInt = (s) => parseInt(s, 10);

exports.stringToBoard = (sudokuString) => {
  const board = {};

  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push(toInt(sudokuString[j + (9 * i)], 10));
    }
    board[i] = row;
  }

  return board;
};

exports.objSize = obj => Object.keys(obj).length;
