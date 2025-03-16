import { Canvas } from '@react-three/fiber';
import { XR, XRButton, XRHitTest } from '@react-three/xr';
import { useState } from 'react';
import { Matrix4, Vector3 } from 'three';

const matrixHelper = new Matrix4();

export default function HitTestComponent() {
  const [hitDetected, setHitDetected] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [hitTestPosition, setHitTestPosition] = useState(new Vector3());

  return (
    <>
      <XRHitTest
        onResults={(results, getWorldMatrix) => {
          if (results.length === 0) return; // Remove plane check until verified
          console.log(results); // Debugging output
          getWorldMatrix(matrixHelper, results[0]);
          setHitTestPosition(new Vector3().setFromMatrixPosition(matrixHelper));
          setHitDetected(true);
        }}
      />
      {hitDetected && <Ring onPointerDown={() => setPlaced(true)} position={hitTestPosition} />}
      {placed && <PlacedModel position={hitTestPosition} />}
    </>
  );
}

function Ring({ onPointerDown, position }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} onPointerDown={onPointerDown}>
      <ringGeometry args={[0.1, 0.25, 32]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

function PlacedModel({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
