import { create } from 'zustand';
import { ChessPiece, Faction, GameState, Position, GameMode, Difficulty } from '../types/chess';
import { getInitialPieces } from '../utils/boardSetup';
import { calculateValidMoves } from '../utils/moveCalculator';
import { calculateAIMove } from '../utils/aiPlayer';

interface GameStore extends GameState {
  selectPiece: (piece: ChessPiece | null) => void;
  movePiece: (from: Position, to: Position) => void;
  resetGame: () => void;
  setGameMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  gameStarted: boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  pieces: getInitialPieces(),
  currentTurn: 'zelnar',
  selectedPiece: null,
  validMoves: [],
  gameMode: 'pvp',
  difficulty: 'medium',
  isComputerThinking: false,
  gameStarted: false,

  selectPiece: (piece) => {
    const validMoves = piece ? calculateValidMoves(piece, get().pieces) : [];
    set({ selectedPiece: piece, validMoves });
  },

  movePiece: (from, to) => {
    const { pieces, currentTurn, gameMode, difficulty } = get();
    const updatedPieces = pieces.map(piece => {
      if (piece.position.x === from.x && piece.position.y === from.y) {
        return { ...piece, position: to };
      }
      if (piece.position.x === to.x && piece.position.y === to.y) {
        return { ...piece, captured: true };
      }
      return piece;
    });

    const newTurn = currentTurn === 'zelnar' ? 'xylian' : 'zelnar';

    set({
      pieces: updatedPieces,
      currentTurn: newTurn,
      selectedPiece: null,
      validMoves: [],
    });

    if (gameMode === 'ai' && newTurn === 'xylian') {
      set({ isComputerThinking: true });
      
      setTimeout(() => {
        const aiMove = calculateAIMove(updatedPieces, difficulty);
        if (aiMove) {
          get().movePiece(aiMove.piece.position, aiMove.to);
        }
        set({ isComputerThinking: false });
      }, 500);
    }
  },

  resetGame: () => {
    set({
      pieces: getInitialPieces(),
      currentTurn: 'zelnar',
      selectedPiece: null,
      validMoves: [],
      isComputerThinking: false,
      gameStarted: false,
    });
  },

  setGameMode: (mode) => {
    set({ gameMode: mode, gameStarted: true });
    get().resetGame();
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
    get().resetGame();
  },
}));