// create a stage (with width and height) to be exported

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// the stage will be a multi dimensional array that represents columns and Rows

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
)

// fill each cell with [0, 'clear']. here 0 means that the space is not currently occupied by a tetrominos

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for(let y = 0; y < player.tetromino.length; y += 1) {
    for(let x = 0; x < player.tetromino[y].length; x += 1) {
      // looping through tetromino

      // 1. Check that we're on an actual tetromino cell - anything that is not 0
      if(player.tetromino[y][x] !== 0){
        if(
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell that we are moving too is not set to clear, because if its clear we are not colliding
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }

    }
  }
}
