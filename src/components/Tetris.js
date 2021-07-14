import React, { useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage, checkCollision } from '../gameHelpers';

// Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
// custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  const movePlayer = dir => {
    // takes care of player left and right movements
    if (!checkCollision(player, stage, { x: dir, y: 0})){
      // if we do not collide that move, or not dont do anything
      updatePlayerPos({ x:dir, y: 0});
    }

  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  }

  const drop = () => {
    // drops the tetromino when we press the down arrow
    if(!checkCollision(player, stage, { x: 0, y:1 })){
      updatePlayerPos({ x:0, y:1, collided: false});
    } else {
      // if we collide something when we drop we need to set the collide property to true, because we need to merge it into the Stage
      if( player.pos.y < 1 ){ // means the player is on the top of the stage
        console.log('GAME OVER');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
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
          movePlayer(-1);
        } else if (keyCode === 39){
          // keycode 39 i for the right arrow
          movePlayer(1);
        } else if (keyCode === 40){
          // down arrow key
          dropPlayer();
        } else if (keyCode === 38){
          // up arrow key
          playerRotate(stage, 1);
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
