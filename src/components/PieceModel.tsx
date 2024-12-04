import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { ChessPiece } from '../types/chess';

interface PieceModelProps {
  piece: ChessPiece;
  isSelected: boolean;
  onClick: () => void;
}

export const PieceModel = ({ piece, isSelected, onClick }: PieceModelProps) => {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current && isSelected) {
      ref.current.rotation.y += 0.02;
      ref.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getGeometry = () => {
    switch (piece.type) {
      case 'pawn':
        return <cylinderGeometry args={[0.2, 0.3, 0.8]} />;
      case 'rook':
        return <boxGeometry args={[0.4, 0.8, 0.4]} />;
      case 'knight':
        return <torusKnotGeometry args={[0.2, 0.1, 64, 8]} />;
      case 'bishop':
        return <coneGeometry args={[0.3, 1, 32]} />;
      case 'queen':
        return <dodecahedronGeometry args={[0.3]} />;
      case 'king':
        return <octahedronGeometry args={[0.3]} />;
    }
  };

  const getMaterial = () => {
    const baseColor = piece.faction === 'zelnar' ? '#60a5fa' : '#f87171';
    return (
      <meshStandardMaterial
        color={hovered ? '#ffffff' : baseColor}
        emissive={isSelected ? baseColor : '#000000'}
        emissiveIntensity={isSelected ? 0.5 : 0}
        metalness={0.8}
        roughness={0.2}
      />
    );
  };

  return (
    <mesh
      ref={ref}
      position={[
        piece.position.x - 3.5,
        isSelected ? 0.5 : 0.4,
        piece.position.y - 3.5 // Changed from position.z to position.y
      ]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      {getGeometry()}
      {getMaterial()}
    </mesh>
  );
};