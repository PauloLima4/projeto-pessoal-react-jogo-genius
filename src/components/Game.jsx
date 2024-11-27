import React, { Component } from 'react';
import Board from './Board';

// Componente principal do jogo que controla a lógica
class Game extends Component {
  state = {
    sequence: [], // Sequência de cores gerada pela máquina
    playerSequence: [], // Sequência de cores inserida pelo jogador
    status: 'Clique em "Começar Jogo" para iniciar!' // Status do jogo
  };

  // Função para iniciar o jogo
  startGame = () => {
    this.setState({
      sequence: [],
      playerSequence: [],
      status: 'Iniciando o jogo...'
    }, this.addNewColorToSequence);
  };

  // Função para adicionar uma nova cor à sequência
  addNewColorToSequence = () => {
    const nextColor = this.generateRandomColor();
    this.setState(prevState => ({
      sequence: [...prevState.sequence, nextColor],
      playerSequence: [],
      status: 'Observe a sequência'
    }), this.playSequence);
  };

  // Função para gerar uma cor aleatória
  generateRandomColor = () => {
    const colors = ['green', 'red', 'yellow', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Função para tocar a sequência de cores
  playSequence = () => {
    this.state.sequence.forEach((color, index) => {
      setTimeout(() => {
        this.flashColor(color);
      }, 500 * (index + 1));
    });
    setTimeout(() => {
      this.setState({ status: 'Sua vez' });
    }, 500 * this.state.sequence.length + 500);
  };

  // Função para fazer o botão piscar em cinza
  flashColor = (color) => {
    const button = document.getElementById(color);
    button.classList.add('flash');
    setTimeout(() => {
      button.classList.remove('flash');
    }, 300);
  };

  // Função para lidar com o clique do jogador
  playerClick = (color) => {
    const { playerSequence, sequence } = this.state;
    const newPlayerSequence = [...playerSequence, color];
    this.setState({ playerSequence: newPlayerSequence });

    // Verifica a sequência do jogador
    if (!this.checkPlayerSequence(newPlayerSequence)) {
      this.setState({ status: 'Você perdeu! Tente novamente.' });
      document.getElementById('start-btn').disabled = false;
      return;
    }

    // Se a sequência estiver correta e completa, avança para a próxima cor
    if (newPlayerSequence.length === sequence.length) {
      this.setState({ status: 'Correto! Aguarde a próxima sequência.' });
      setTimeout(this.addNewColorToSequence, 1000);
    }
  };

  // Função para verificar a sequência do jogador
  checkPlayerSequence = (playerSequence) => {
    const { sequence } = this.state;
    for (let i = 0; i < playerSequence.length; i++) {
      if (playerSequence[i] !== sequence[i]) {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <div>
        <Board playerClick={this.playerClick} />
        <button id="start-btn" onClick={this.startGame}>Começar Jogo</button>
        <p>{this.state.status}</p>
      </div>
    );
  }
}

export default Game;
