import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers'

// important to have use.. so React knows its a custom hook
export const usePlayer = () => {
  // use state gets the state and the setter and destructure it

  // const playerState = useState();
  // const player = playerState[0];
  // const setPlayer = playerState[1];
  const [player, setPlayer] = useState({
    // intial state for player
    pos: { x:0, y:0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided}) => {
    console.log(x,y)

    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: ( prev.pos.y += y)},
      collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
      tetromino: randomTetromino().shape,
      collided: false,
    })
  },[])

  return [player, updatePlayerPos, resetPlayer];

}
