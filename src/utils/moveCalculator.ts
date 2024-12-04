import { ChessPiece, Position } from '../types/chess';

const isValidPosition = (x: number, y: number): boolean => 
  x >= 0 && x < 8 && y >= 0 && y < 8;

const isOccupiedByAlly = (x: number, y: number, faction: string, pieces: ChessPiece[]): boolean =>
  pieces.some(p => p.position.x === x && p.position.y === y && p.faction === faction);

const isOccupiedByEnemy = (x: number, y: number, faction: string, pieces: ChessPiece[]): boolean =>
  pieces.some(p => p.position.x === x && p.position.y === y && p.faction !== faction);

const addMove = (moves: Position[], x: number, y: number, faction: string, pieces: ChessPiece[]): boolean => {
  if (!isValidPosition(x, y) || isOccupiedByAlly(x, y, faction, pieces)) return false;
  moves.push({ x, y });
  return !isOccupiedByEnemy(x, y, faction, pieces);
};

const addLinearMoves = (
  moves: Position[],
  startX: number,
  startY: number,
  directions: [number, number][],
  faction: string,
  pieces: ChessPiece[],
  maxDistance = 8
) => {
  directions.forEach(([dx, dy]) => {
    let distance = 1;
    while (distance <= maxDistance) {
      const x = startX + dx * distance;
      const y = startY + dy * distance;
      if (!addMove(moves, x, y, faction, pieces)) break;
      distance++;
    }
  });
};

const calculatePawnMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const { x, y } = piece.position;
  const direction = piece.faction === 'zelnar' ? 1 : -1;
  const startRow = piece.faction === 'zelnar' ? 1 : 6;

  // Forward move
  if (!pieces.some(p => p.position.x === x && p.position.y === y + direction)) {
    moves.push({ x, y: y + direction });
    
    // Double move from starting position
    if (y === startRow && !pieces.some(p => p.position.x === x && p.position.y === y + 2 * direction)) {
      moves.push({ x, y: y + 2 * direction });
    }
  }

  // Capture moves
  [-1, 1].forEach(dx => {
    if (isOccupiedByEnemy(x + dx, y + direction, piece.faction, pieces)) {
      moves.push({ x: x + dx, y: y + direction });
    }
  });

  return moves.filter(move => isValidPosition(move.x, move.y));
};

const calculateRookMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const directions: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  addLinearMoves(moves, piece.position.x, piece.position.y, directions, piece.faction, pieces);
  return moves;
};

const calculateKnightMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const { x, y } = piece.position;
  const offsets = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  offsets.forEach(([dx, dy]) => {
    addMove(moves, x + dx, y + dy, piece.faction, pieces);
  });

  return moves;
};

const calculateBishopMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const directions: [number, number][] = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  addLinearMoves(moves, piece.position.x, piece.position.y, directions, piece.faction, pieces);
  return moves;
};

const calculateQueenMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const directions: [number, number][] = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];
  addLinearMoves(moves, piece.position.x, piece.position.y, directions, piece.faction, pieces);
  return moves;
};

const calculateKingMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const directions: [number, number][] = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];
  addLinearMoves(moves, piece.position.x, piece.position.y, directions, piece.faction, pieces, 1);
  return moves;
};

export const calculateValidMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  switch (piece.type) {
    case 'pawn':
      return calculatePawnMoves(piece, pieces);
    case 'rook':
      return calculateRookMoves(piece, pieces);
    case 'knight':
      return calculateKnightMoves(piece, pieces);
    case 'bishop':
      return calculateBishopMoves(piece, pieces);
    case 'queen':
      return calculateQueenMoves(piece, pieces);
    case 'king':
      return calculateKingMoves(piece, pieces);
    default:
      return [];
  }
};