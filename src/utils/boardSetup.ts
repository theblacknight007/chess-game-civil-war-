import { ChessPiece, Faction, PieceType } from '../types/chess';

const createPiece = (type: PieceType, faction: Faction, x: number, y: number): ChessPiece => ({
  type,
  faction,
  position: { x, y },
  captured: false,
});

const createPawnRow = (y: number, faction: Faction): ChessPiece[] =>
  Array.from({ length: 8 }, (_, i) => createPiece('pawn', faction, i, y));

const createBackRow = (y: number, faction: Faction): ChessPiece[] => {
  const pieces: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  return pieces.map((type, i) => createPiece(type as PieceType, faction, i, y));
};

export const getInitialPieces = (): ChessPiece[] => [
  ...createBackRow(0, 'zelnar'),
  ...createPawnRow(1, 'zelnar'),
  ...createPawnRow(6, 'xylian'),
  ...createBackRow(7, 'xylian'),
];