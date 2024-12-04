import React from 'react';
import { GameMode, Difficulty } from '../types/chess';
import { useGameStore } from '../store/gameStore';
import { Swords } from 'lucide-react';

export const StartScreen = () => {
  const setGameMode = useGameStore(state => state.setGameMode);
  const setDifficulty = useGameStore(state => state.setDifficulty);
  const [selectedMode, setSelectedMode] = React.useState<GameMode>('pvp');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>('medium');

  const handleStartGame = () => {
    setGameMode(selectedMode);
    setDifficulty(selectedDifficulty);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-3">
          <Swords className="w-16 h-16 text-indigo-400 mx-auto" />
          <h1 className="text-3xl font-bold text-white">Cosmic Chess</h1>
          <p className="text-gray-300">Choose your game mode to begin</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">Game Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedMode === 'pvp'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
                onClick={() => setSelectedMode('pvp')}
              >
                Player vs Player
              </button>
              <button
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedMode === 'ai'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
                onClick={() => setSelectedMode('ai')}
              >
                Player vs Computer
              </button>
            </div>
          </div>

          {selectedMode === 'ai' && (
            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">Difficulty</label>
              <div className="grid grid-cols-3 gap-3">
                {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                  <button
                    key={difficulty}
                    className={`px-4 py-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                      selectedDifficulty === difficulty
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleStartGame}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};