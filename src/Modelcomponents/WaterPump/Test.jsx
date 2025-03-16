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
          if (results.length > 0 && meshRef.current) {
            getWorldMatrix(matrixHelper, results[0]);
            const newPosition = new THREE.Vector3().setFromMatrixPosition(matrixHelper);

            // Slight height adjustment
            newPosition.y += 0.05;

            console.log("Hit Test Position:", newPosition);

            // Directly update the mesh position (avoids re-render)
            meshRef.current.position.copy(newPosition);
          }
        }}
      />

      {/* Sphere Appears Where Hit Test Detects */}
     
        <mesh ref={meshRef} >
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>

    </>
  );
}
