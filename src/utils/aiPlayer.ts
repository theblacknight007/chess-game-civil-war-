import { ChessPiece, Position, Difficulty, Faction } from '../types/chess';
import { calculateValidMoves } from './moveCalculator';

// Piece values for evaluation
const PIECE_VALUES: Record<string, number> = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: 100
};

// Position bonus for controlling the center
const POSITION_BONUS = [
  [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  [0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1],
  [0.1, 0.2, 0.3, 0.3, 0.3, 0.3, 0.2, 0.1],
  [0.1, 0.2, 0.3, 0.4, 0.4, 0.3, 0.2, 0.1],
  [0.1, 0.2, 0.3, 0.4, 0.4, 0.3, 0.2, 0.1],
  [0.1, 0.2, 0.3, 0.3, 0.3, 0.3, 0.2, 0.1],
  [0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1],
  [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
];

interface Move {
  piece: ChessPiece;
  to: Position;
  score: number;
}

const evaluatePosition = (pieces: ChessPiece[], faction: Faction): number => {
  let score = 0;

  pieces.forEach(piece => {
    if (!piece.captured) {
      const value = PIECE_VALUES[piece.type];
      const positionBonus = POSITION_BONUS[piece.position.y][piece.position.x];
      const multiplier = piece.faction === faction ? 1 : -1;
      
      score += (value + positionBonus) * multiplier;
    }
  });

  return score;
};

const getAllPossibleMoves = (pieces: ChessPiece[], faction: Faction): Move[] => {
  const moves: Move[] = [];
  
  pieces
    .filter(piece => piece.faction === faction && !piece.captured)
    .forEach(piece => {
      const validMoves = calculateValidMoves(piece, pieces);
      validMoves.forEach(move => {
        // Simulate move
        const newPieces = pieces.map(p => ({...p}));
        const movedPiece = newPieces.find(p => 
          p.position.x === piece.position.x && p.position.y === piece.position.y
        )!;
        const capturedPiece = newPieces.find(p => 
          p.position.x === move.x && p.position.y === move.y
        );
        
        if (capturedPiece) {
          capturedPiece.captured = true;
        }
        
        movedPiece.position = move;
        
        moves.push({
          piece,
          to: move,
          score: evaluatePosition(newPieces, faction)
        });
      });
    });
    
  return moves;
};

const getRandomMove = (moves: Move[]): Move => {
  return moves[Math.floor(Math.random() * moves.length)];
};

const getBestMove = (moves: Move[]): Move => {
  return moves.reduce((best, current) => 
    current.score > best.score ? current : best
  , moves[0]);
};

export const calculateAIMove = (
  pieces: ChessPiece[],
  difficulty: Difficulty
): { piece: ChessPiece, to: Position } | null => {
  const moves = getAllPossibleMoves(pieces, 'xylian');
  
  if (moves.length === 0) return null;

  switch (difficulty) {
    case 'easy':
      // Random moves
      return getRandomMove(moves);
      
    case 'medium':
      // 70% best move, 30% random
      return Math.random() < 0.7 ? getBestMove(moves) : getRandomMove(moves);
      
    case 'hard':
      // Always best move
      return getBestMove(moves);
      
    default:
      return null;
  }
};