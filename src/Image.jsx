import {TransformHandles,PivotHandles} from "@react-three/handle"
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export default function Image({position,scale}) {
  const images = [
    "/3ds.jpg",
    "/web.jpg",
    "/webxr.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const textureRef = useRef(new THREE.TextureLoader().load(images[0])); // Load once

  useEffect(() => {
    textureRef.current = new THREE.TextureLoader().load(images[currentIndex]);
  }, [currentIndex]); // Only update when index changes
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <PivotHandles position={position}  scale={false} size={0.5}>
      <mesh position={[-0.1, -0.2, 0]} onClick={prevImage} renderOrder={1}>
        <boxGeometry args={[0.15, 0.09, 0.1]} />
        <meshBasicMaterial color="blue"  depthTest={false} />
      </mesh>

      <mesh position={[0.1, -0.2, 0]} onClick={nextImage}>
        <boxGeometry args={[0.15, 0.09, 0.1]} />
        <meshBasicMaterial color="green" />
      </mesh>
        <mesh scale={0.1}>
            <planeGeometry args={[5, 3]}  />
            <meshBasicMaterial map={textureRef.current} side={THREE.DoubleSide} depthWrite={false}/>
        </mesh>
   </PivotHandles>
  )
}
