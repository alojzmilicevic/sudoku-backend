const { objSize } = require('../utils/util');

exports.validateNewSudokus = (sudokuList) => {
  const errors = {
    msg: 'Something went wrong, please check your input and try again',
    status: '400',
  };

  if (!sudokuList || sudokuList.length === 0) {
    errors.sudokuList = 'No list of sudokus provided';
    return { errors, valid: false };
  }

  sudokuList.forEach((group, index) => {
    const {
      easy, medium, hard, date,
    } = group;
    errors[index] = {};

    if (!easy || !medium || !hard) {
      errors[index].keyError = `Bad key at ${index},
       a valid group must contain keys easy & medium & hard`;
    }

    if (!date) {
      errors[index].dateError = 'No date supplied';
    }

    errors[index].lengthErrors = {};

    const wrongLengthString = (length) => `Wrong length: expected 81 found ${length}`;

    if (easy && easy.length !== 81) {
      errors[index].lengthErrors.easy = wrongLengthString(easy.length);
    }
    if (medium && medium.length !== 81) {
      errors[index].lengthErrors.medium = wrongLengthString(medium.length);
    }
    if (hard && hard.length !== 81) {
      errors[index].lengthErrors.hard = wrongLengthString(hard.length);
    }

    // If we have no length responseHelpers remove the key.
    if (objSize(errors[index].lengthErrors) === 0) {
      delete errors[index].lengthErrors;
    }

    if (objSize(errors[index]) === 0) {
      delete errors[index];
    }
  });

  return { errors, valid: objSize(errors) === 2 };
};

exports.batchDeleteValidation = (idList) => {
  const errors = {
    msg: 'Something went wrong, please check your input and try again',
    status: 400,
  };

  if (!idList) {
    errors.sudokuList = 'No list of id\'s provided';

    return { errors, valid: false };
  }

  const uniq = [...new Set(idList)];

  if (uniq.length !== idList.length) {
    errors.duplicate = 'No duplicates allowed';
  }

  return { errors, valid: objSize(errors) === 2 };
};

exports.batchDeleteErrors = (idList, objList, deleteCount) => {
  const errorList = {
    msg: 'Something went wrong, please check your input and try again',
    status: 400,
  };

  if (deleteCount < idList.length) {
    Object.keys(objList).forEach(id => {
      if (objList[id] === false) {
        errorList[id] = { error: `No such document ${id}` };
      }
    });
  }

  return { errorList, isValid: objSize(errorList) === 2 };
};
