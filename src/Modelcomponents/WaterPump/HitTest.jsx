import { Canvas } from "@react-three/fiber";
import {  XR, useXRRequestHitTest } from "@react-three/xr";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";



export default function HitTestRing() {
    const ringRef = useRef(); // Using ref instead of state
    const requestHitTest = useXRRequestHitTest();
  
    useEffect(() => {
      const updatePosition = async () => {
        const hitTest = await requestHitTest("viewer");
        if (hitTest?.results.length) {
          const matrix = new THREE.Matrix4();
          hitTest.getWorldMatrix(matrix, hitTest.results[0]);
          const pos = new THREE.Vector3().setFromMatrixPosition(matrix);
          
          if (ringRef.current) {
            ringRef.current.position.copy(pos); // Directly update position
          }
        }
        requestAnimationFrame(updatePosition);
      };
      updatePosition();
    }, [requestHitTest]);
  
    return (
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 100]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
    );
  }