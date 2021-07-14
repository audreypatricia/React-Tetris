import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers'

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

  const rotate = (matrix, dir) => {
    // matrix = tetromino , dir = direction
    // Make the rows to become cols (transpose)
    const rotatedTetro = matrix.map( (_, i) => matrix.map( col => col[i]));
    // Reverse each row to get a rotated matrix
    if( dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    // make a deep clone, dont mutate the state
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while(checkCollision(clonedPlayer, stage, { x:0, y:0 })){
      // the computer checks the tetromino to go back and forth accross the stage to check if it will collide and move in away as the user rotates
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length){
        rotate(clonedPlayer.tetromino, -dir); // reverse the direction, rotate it back because it will collided
        clonedPlayer.pos.x = pos;
        return
      }
    }

    setPlayer(clonedPlayer);
  }

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

  return [player, updatePlayerPos, resetPlayer, playerRotate];

}
