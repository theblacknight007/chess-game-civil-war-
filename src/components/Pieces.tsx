import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import { ChessPiece as ChessPieceType } from '../types/chess';
import { PieceModel } from './PieceModel';

export const Pieces = () => {
  const pieces = useGameStore(state => state.pieces);
  const selectPiece = useGameStore(state => state.selectPiece);
  const selectedPiece = useGameStore(state => state.selectedPiece);
  const currentTurn = useGameStore(state => state.currentTurn);

  const handlePieceClick = (piece: ChessPieceType) => {
    if (piece.faction === currentTurn) {
      selectPiece(selectedPiece === piece ? null : piece);
    }
  };

  return (
    <group>
      {pieces.filter(piece => !piece.captured).map((piece, index) => (
        <PieceModel
          key={index}
          piece={piece}
          isSelected={selectedPiece === piece}
          onClick={() => handlePieceClick(piece)}
        />
      ))}
    </group>
  );
};