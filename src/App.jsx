import React from 'react';
import Game from './components/Game';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Jogo do Genius</h1>
        </header>
        <main>
          <Game />
        </main>
      </div>
    );
  }
}

export default App;
