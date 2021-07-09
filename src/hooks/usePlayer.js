import { useState } from 'react';

import { randomTetromino } from '../tetrominos';

// important to have use.. so React knows its a custom hook
export const usePlayer = () => {
  // use state gets the state and the setter and destructure it

  // const playerState = useState();
  // const player = playerState[0];
  // const setPlayer = playerState[1];
  const [player, setPlayer] = useState({
    // intial state for player
    pos: { x:0, y:0 },
    tetromino: randomTetromino().shape,
    collided: false,
  })

  return [player];

}
