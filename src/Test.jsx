import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Model() {
  const { scene, animations } = useGLTF("/factory.glb");
  const mixer = useRef(null);
  const action = useRef(null);

  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      action.current = mixer.current.clipAction(animations[0]); // Use the first animation
      action.current.play();
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);

      // Stop animation at a specific time (e.g., 2 seconds)
      if (action.current && action.current.time >= 2) {
        action.current.paused = true;
      }
    }
  });

  return <primitive object={scene} scale={0.1} position={[0,0,-2]}/>;
}
