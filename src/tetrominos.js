export const TETROMINOS = {
  0: { shape: [[0]], color: '0, 0, 0'}, // this is the clean cell - that shows nothing - for the start of the game
  I: {
        shape: [
          [0, 'I', 0, 0],
          [0, 'I', 0, 0],
          [0, 'I', 0, 0],
          [0, 'I', 0, 0]
        ],
        color: '80, 227, 230', //rgb color
  },
  J: {
        shape: [
          [0, 'J', 0],
          [0, 'J', 0],
          ['J', 'J', 0]
        ],
        color: '36, 95, 223', //rgb color
  },
  L: {
        shape: [
          [0, 'L', 0],
          [0, 'L', 0],
          [0, 'L', 'L']
        ],
        color: '223, 173, 36', //rgb color
  },
  O: {
        shape: [
          ['O', 'O'],
          ['O', 'O'],
        ],
        color: '223, 217, 36', //rgb color
  },
  S: {
        shape: [
          [0, 'S', 'S'],
          ['S', 'S', 0],
          [0, 0, 0]
        ],
        color: '48, 211, 56', //rgb color
  },
  T: {
        shape: [
          [0, 0, 0],
          ['T', 'T', 'T'],
          [0, 'T',0]
        ],
        color: '132, 61, 36', //rgb color
  },
  Z: {
        shape: [
          ['Z', 'Z', 0],
          [0, 'Z', 'Z'],
          [0, 0, 0]
        ],
        color: '227, 78, 78', //rgb color
  },

}

// function to generate random tetrominos
export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randomTetromino =
    tetrominos[Math.floor(Math.ramdom() * tetrominos.length)];
  return TETROMINOS[randomTetromino];
}
