import React, { useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage } from '../gameHelpers';

// Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
// custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('re-render');

  const movePlayer = dir => {
    // takes care of player left and right movements
    console.log(dir);
    updatePlayerPos({ x:dir, y: 0});
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    // drops the tetromino when we press the down arrow
    updatePlayerPos({ x:0, y:1, collided: false});
  }

  const dropPlayer = () => {
    drop();
  }

  const move = ({ keyCode }) => {
    // destructure key code from event, e.keyCode
    if(!gameOver){
      if(keyCode) {
        if (keyCode === 37){
          // keycode for left arrow
          console.log("left")
          movePlayer(-1);
        } else if (keyCode === 39){
          // keycode 39 i for the right arrow
          console.log("right")
          movePlayer(1);
        } else if (keyCode === 40){
          // down arrow key
          console.log("down")
          dropPlayer();
        }
      }
    }
  }

  return(
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage}/>
        <aside>
          { gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ):(
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
};

export default Tetris;
