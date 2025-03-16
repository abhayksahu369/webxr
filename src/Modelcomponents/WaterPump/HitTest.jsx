import { Canvas } from '@react-three/fiber';
import { XR, XRHitTest } from '@react-three/xr';
import { useState, useRef } from 'react';
import { Matrix4, Vector3 } from 'three';

const matrixHelper = new Matrix4();
const hitTestPosition = new Vector3();

export default function HitTestComponent() {
  const [hitDetected, setHitDetected] = useState(false);
  const [placed, setPlaced] = useState(false);

  return (
    <>
      <XRHitTest
        onResults={(results, getWorldMatrix) => {
          if (results.length === 0 || results[0].target !== 'plane') return; // Ensure hit test detects only plane surfaces
          getWorldMatrix(matrixHelper, results[0]);
          hitTestPosition.setFromMatrixPosition(matrixHelper);
          setHitDetected(true);
        }}
      />
      {hitDetected && <Ring onClick={() => setPlaced(true)} position={hitTestPosition.clone()} />}
      {placed && <PlacedModel position={hitTestPosition.clone()} />}
    </>
  );
}

function Ring({ onClick, position }) {
  return (
    <mesh position={position} onClick={onClick}>
      <ringGeometry args={[0.03, 0.05, 32]} />
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
