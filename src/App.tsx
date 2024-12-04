import React from 'react';
import { ChessBoard } from './components/ChessBoard';
import { StartScreen } from './components/StartScreen';
import { useGameStore } from './store/gameStore';

function App() {
  const gameStarted = useGameStore(state => state.gameStarted);

  return (
    <div className="w-full h-screen bg-gray-900">
      {!gameStarted ? <StartScreen /> : <ChessBoard />}
    </div>
  );
}

export default App;