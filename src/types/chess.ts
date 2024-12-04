export type Faction = 'zelnar' | 'xylian';
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'pvp' | 'ai';

export interface Position {
  x: number;
  y: number;
}

export interface ChessPiece {
  type: PieceType;
  faction: Faction;
  position: Position;
  captured: boolean;
}

export interface GameState {
  pieces: ChessPiece[];
  currentTurn: Faction;
  selectedPiece: ChessPiece | null;
  validMoves: Position[];
  gameMode: GameMode;
  difficulty: Difficulty;
  isComputerThinking: boolean;
}