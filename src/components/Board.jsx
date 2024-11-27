import React from 'react';
import Button from './Button';

// Componente que representa o tabuleiro do jogo
const Board = ({ playerClick }) => {
  return (
    <div id="game-board">
      <Button color="green" onClick={playerClick} />
      <Button color="red" onClick={playerClick} />
      <Button color="yellow" onClick={playerClick} />
      <Button color="blue" onClick={playerClick} />
    </div>
  );
};

export default Board;
