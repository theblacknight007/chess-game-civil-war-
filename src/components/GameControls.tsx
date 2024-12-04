import React from 'react';
import { GameMode, Difficulty } from '../types/chess';
import { useGameStore } from '../store/gameStore';

export const GameControls = () => {
  const gameMode = useGameStore(state => state.gameMode);
  const difficulty = useGameStore(state => state.difficulty);
  const setGameMode = useGameStore(state => state.setGameMode);
  const setDifficulty = useGameStore(state => state.setDifficulty);
  const resetGame = useGameStore(state => state.resetGame);
  const isComputerThinking = useGameStore(state => state.isComputerThinking);

  return (
    <div className="absolute top-4 right-4 z-10 space-y-4">
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg space-y-4">
        <div className="space-y-2">
          <label className="block text-white text-sm font-medium">Game Mode</label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            className="w-full bg-white/10 text-white border border-gray-600 rounded-md p-2"
          >
            <option value="pvp">Player vs Player</option>
            <option value="ai">Player vs Computer</option>
          </select>
        </div>

        {gameMode === 'ai' && (
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full bg-white/10 text-white border border-gray-600 rounded-md p-2"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Reset Game
        </button>
      </div>

      {isComputerThinking && (
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-white text-center">
          Computer is thinking...
        </div>
      )}
    </div>
  );
};