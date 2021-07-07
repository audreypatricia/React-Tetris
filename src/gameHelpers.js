// create a stage (with width and height) to be exported

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// the stage will be a multi dimensional array that represents columns and Rows

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
)

// fill each cell with [0, 'clear']. here 0 means that the space is not currently occupied by a tetrominos
