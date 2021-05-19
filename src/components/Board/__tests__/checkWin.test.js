import checkForWin, { isInBounds, getLine } from '../checkWin.js';

const buildBoard = () => {
  return [[0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]];
};

describe('checkForWin', () => {
  let board;
  beforeEach(() => board = buildBoard());

  test('returns empty list if there are no lines', () => {
    expect(checkForWin(board)).toEqual([]);
  });
  
  describe('return coordinate list if there is a line', () => {
    test('➡️', () => {
      board[3][3] = board[3][4] = board[3][5] = board[3][6] = 1;
      expect(checkForWin(board)).toEqual([[3, 3], [3, 4], [3, 5], [3, 6]]);
    });
    test('↘️', () => {
      board[2][3] = board[3][4] = board[4][5] = board[5][6] = 1;
      expect(checkForWin(board)).toEqual([[2, 3], [3, 4], [4, 5], [5, 6]]);
    });
    test('⬇️', () => {
      board[2][2] = board[3][2] = board[4][2] = board[5][2] = 1;
      expect(checkForWin(board)).toEqual([[2, 2], [3, 2], [4, 2], [5, 2]]);
    });
    test('↙️', () => {
      board[2][3] = board[3][2] = board[4][1] = board[5][0] = 1;
      expect(checkForWin(board)).toEqual([[2, 3], [3, 2], [4, 1], [5, 0]]);
    });
  });
});

describe('isInBounds', () => {
  let board;
  beforeEach(() => board = buildBoard());

  const testBoardBoundaries = (rowDirection, colDirection) => {
    test('returns false if outside the board’s actual boundaries', () => {
      expect(isInBounds(board, -1, 0, rowDirection, colDirection)).toBeFalsy();
      expect(isInBounds(board, 0, -1, rowDirection, colDirection)).toBeFalsy();
      expect(isInBounds(board, 7, 5, rowDirection, colDirection)).toBeFalsy();
      expect(isInBounds(board, 6, 6, rowDirection, colDirection)).toBeFalsy();
    });
  };

  describe('➡️', () => {
    const rowDirection = 0;
    const colDirection = 1;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 0, 4, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 0, 3, rowDirection, colDirection)).toBeTruthy();
    });
  });

  describe('↘️', () => {
    const rowDirection = 1;
    const colDirection = 1;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 0, 4, rowDirection, colDirection)).toBeFalsy();
      expect(isInBounds(board, 3, 0, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 2, 3, rowDirection, colDirection)).toBeTruthy();
    });
  });

  describe('⬇️', () => {
    const rowDirection = 1;
    const colDirection = 0;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 3, 0, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 2, 0, rowDirection, colDirection)).toBeTruthy();
    });
  });

  describe('↙️', () => {
    const rowDirection = 1;
    const colDirection = -1;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 0, 2, rowDirection, colDirection)).toBeFalsy();
      expect(isInBounds(board, 3, 6, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 2, 3, rowDirection, colDirection)).toBeTruthy();
    });
  });

  describe('⬅️', () => {
    const rowDirection = 0;
    const colDirection = -1;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 0, 2, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 0, 3, rowDirection, colDirection)).toBeTruthy();
    });
  });

  describe('↖️', () => {
    const rowDirection = -1;
    const colDirection = -1;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 5, 2, rowDirection, colDirection)).toBeFalsy();
      expect(isInBounds(board, 2, 6, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 3, 3, rowDirection, colDirection)).toBeTruthy();
    });
  });

  describe('⬆️', () => {
    const rowDirection = -1;
    const colDirection = 0;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 2, 0, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 3, 0, rowDirection, colDirection)).toBeTruthy();
    });
  });

  describe('↗️', () => {
    const rowDirection = -1;
    const colDirection = 1;

    testBoardBoundaries(rowDirection, colDirection);
    test('returns false if line of 4 isn’t possible', () => {
      expect(isInBounds(board, 2, 0, rowDirection, colDirection)).toBeFalsy();
      expect(isInBounds(board, 5, 4, rowDirection, colDirection)).toBeFalsy();
    });
    test('returns true if line of 4 is possible', () => {
      expect(isInBounds(board, 3, 3, rowDirection, colDirection)).toBeTruthy();
    });
  });
});

describe('getLine', () => {
  let board;
  beforeEach(() => board = buildBoard());

  const testEmpty = (startRow, startCol, rowDirection, colDirection) => {
    test('returns empty list if the board is blank', () => {
      expect(getLine(board, startRow, startCol, rowDirection, colDirection)).toEqual([]);
    });
  };

  const testBrokenLine = (startRow, startCol, rowDirection, colDirection) => {
    describe('when full line of 4 isn’t made', () => {
      beforeEach(() => {
        board[startRow][startCol] = 1;
        board[startRow + 1 * rowDirection][startCol + 1 * colDirection] = 1;
        board[startRow + 2 * rowDirection][startCol + 2 * colDirection] = 1;
        board[startRow + 3 * rowDirection][startCol + 3 * colDirection] = 1;
      });

      test('return empty list when first slot is empty', () => {
        board[startRow][startCol] = 2;
        expect(getLine(board, startRow, startCol, rowDirection, colDirection)).toEqual([]);
      });

      test('return empty list when second slot is empty', () => {
        board[startRow + 1 * rowDirection][startCol + 1 * colDirection] = 2;
        expect(getLine(board, startRow, startCol, rowDirection, colDirection)).toEqual([]);
      });

      test('return empty list when third slot is empty', () => {
        board[startRow + 2 * rowDirection][startCol + 2 * colDirection] = 2;
        expect(getLine(board, startRow, startCol, rowDirection, colDirection)).toEqual([]);
      });

      test('return empty list when fourth slot is empty', () => {
        board[startRow + 3 * rowDirection][startCol + 3 * colDirection] = 2;
        expect(getLine(board, startRow, startCol, rowDirection, colDirection)).toEqual([]);
      });
    });
  };

  const testLineExists = (startRow, startCol, rowDirection, colDirection) => {
    test('returns coordinates of each spot in line if line exists', () => {
      board[startRow][startCol] = 1;
      board[startRow + 1 * rowDirection][startCol + 1 * colDirection] = 1;
      board[startRow + 2 * rowDirection][startCol + 2 * colDirection] = 1;
      board[startRow + 3 * rowDirection][startCol + 3 * colDirection] = 1;

      expect(getLine(board, startRow, startCol, rowDirection, colDirection)).toEqual([
        [startRow, startCol],
        [startRow + 1 * rowDirection, startCol + 1 * colDirection],
        [startRow + 2 * rowDirection, startCol + 2 * colDirection],
        [startRow + 3 * rowDirection, startCol + 3 * colDirection]
      ]);
    });
  };

  describe('➡️', () => {
    const startRow = 0;
    const startCol = 3;
    const rowDirection = 0;
    const colDirection = 1;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });

  describe('↘️', () => {
    const startRow = 2;
    const startCol = 3;
    const rowDirection = 1;
    const colDirection = 1;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });

  describe('⬇️', () => {
    const startRow = 2;
    const startCol = 0;
    const rowDirection = 1;
    const colDirection = 0;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });

  describe('↙️', () => {
    const startRow = 2;
    const startCol = 3;
    const rowDirection = 1;
    const colDirection = -1;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });

  describe('⬅️', () => {
    const startRow = 0;
    const startCol = 3;
    const rowDirection = 0;
    const colDirection = -1;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });

  describe('↖️', () => {
    const startRow = 3;
    const startCol = 3;
    const rowDirection = -1;
    const colDirection = -1;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });

  describe('⬆️', () => {
    const startRow = 3;
    const startCol = 0;
    const rowDirection = -1;
    const colDirection = 0;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });

  describe('↗️', () => {
    const startRow = 3;
    const startCol = 3;
    const rowDirection = -1;
    const colDirection = 1;

    testEmpty(startRow, startCol, rowDirection, colDirection);
    testBrokenLine(startRow, startCol, rowDirection, colDirection);
    testLineExists(startRow, startCol, rowDirection, colDirection);
  });
});
