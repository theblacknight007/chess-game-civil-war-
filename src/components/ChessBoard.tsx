import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Board } from './Board';
import { Pieces } from './Pieces';
import { GameControls } from './GameControls';

export const ChessBoard = () => {
  return (
    <div className="w-full h-screen">
      <GameControls />
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        <Board />
        <Pieces />
        <OrbitControls
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};