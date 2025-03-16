import { Canvas } from "@react-three/fiber";
import { ARButton, XR, useXRRequestHitTest } from "@react-three/xr";
import { useRef, useEffect, Suspense, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";


export default function HitTestScene() {
  const torusRef = useRef(); // Ref for torus
  const modelRef = useRef(); // Ref for model
  const requestHitTest = useXRRequestHitTest();
  const [position,setPosition]=useState([]);

  useEffect(() => {
    const updatePosition = async () => {
      const hitTest = await requestHitTest("viewer");
      if (hitTest?.results.length) {
        const matrix = new THREE.Matrix4();
        hitTest.getWorldMatrix(matrix, hitTest.results[0]);
        const pos = new THREE.Vector3().setFromMatrixPosition(matrix);

        if (torusRef.current) {
          torusRef.current.position.copy(pos); // Move torus to valid position
        }
      }
      requestAnimationFrame(updatePosition);
    };
    updatePosition();
  }, [requestHitTest]);

  const placeModel = () => {
    if (torusRef.current && modelRef.current) {

      setPosition([...torusRef.current.position]); // Place model where torus is
      modelRef.current.visible = true; // Show model when tapped
    }
  };

  return (
    <>
      {/* Ring (Torus) to tap on */}
      <mesh ref={torusRef} onClick={placeModel} rotation={[-Math.PI / 2, 0, 0]} >
        <ringGeometry args={[0.1, 0.25, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      {/* 3D Model (Initially hidden) */}
      <group ref={modelRef} scale={0.05}  visible={false}>
        <Model position={position} />
      </group>
    </>
  );
}

function Model() {
  const gltf = useRef(null);
  useEffect(() => {
    new GLTFLoader().load("/waterpump/waterpump.glb", (loadedGltf) => {
      gltf.current = loadedGltf.scene;
    });
  }, []);

  return gltf.current ? <primitive object={gltf.current} /> : null;
}
