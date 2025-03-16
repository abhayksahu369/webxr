import { Canvas } from "@react-three/fiber";
import {  XR, useXRRequestHitTest } from "@react-three/xr";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";



export default function HitTestRing() {
    const ringRef = useRef();
    const [position, setPosition] = useState(null); // Store ring position
    const requestHitTest = useXRRequestHitTest();
  
    useEffect(() => {
      const updatePosition = async () => {
        const hitTest = await requestHitTest("viewer"); // Hit test based on viewer's position
        if (hitTest?.results.length > 0) {
            
          const matrix = new THREE.Matrix4();
          hitTest.getWorldMatrix(matrix, hitTest.results[0]);
  
          const newPosition = new THREE.Vector3().setFromMatrixPosition(matrix);
          setPosition([newPosition.x, newPosition.y + 0.01, newPosition.z]); // Slight offset
        }
        requestAnimationFrame(updatePosition);
      };
  
      updatePosition(); // Start checking position continuously
    }, [requestHitTest]);
  
    return position ? (
      <mesh ref={ringRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 100]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
    ) : null;
  }