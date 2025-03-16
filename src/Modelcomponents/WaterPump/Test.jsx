import { Canvas } from "@react-three/fiber";
import { XR, XRHitTest } from "@react-three/xr";
import { useState, useRef } from "react";
import * as THREE from "three";


export default function Test() {
  const matrixHelper = new THREE.Matrix4();
  const [hitPosition, setHitPosition] = useState(null);
  const meshRef = useRef();

  return (
    <>
      {/* Hit Test Logic */}
      <XRHitTest
        onResults={(results, getWorldMatrix) => {
            console.log(results);
          if (results.length > 0) {
            getWorldMatrix(matrixHelper, results[0]);
            const newPosition = new THREE.Vector3().setFromMatrixPosition(matrixHelper);
            setHitPosition(newPosition);
          }
        }}
      />

      {/* Sphere Appears Where Hit Test Detects */}
      {hitPosition && (
        <mesh ref={meshRef} position={hitPosition}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </>
  );
}
