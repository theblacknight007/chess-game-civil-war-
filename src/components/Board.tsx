import { useRef } from 'react';
import { Mesh } from 'three';
import { useGameStore } from '../store/gameStore';

export const Board = () => {
  const ref = useRef<Mesh>(null);
  const validMoves = useGameStore(state => state.validMoves);

  return (
    <group>
      {/* Board squares */}
      {Array.from({ length: 8 }, (_, i) =>
        Array.from({ length: 8 }, (_, j) => {
          const isValid = validMoves.some(move => move.x === i && move.y === j);
          const isLight = (i + j) % 2 === 0;
          
          return (
            <mesh
              key={`${i}-${j}`}
              position={[i - 3.5, 0, j - 3.5]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial
                color={isValid ? '#4ade80' : isLight ? '#f3f4f6' : '#1f2937'}
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>
          );
        })
      )}

      {/* Board frame */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[9, 0.2, 9]} />
        <meshStandardMaterial color="#4b5563" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
};