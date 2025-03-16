import { TransformHandles, PivotHandles } from "@react-three/handle"
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { XRDomOverlay } from "@react-three/xr";

export default function Image({ position, scale }) {
  const images = [
    "waterpump/instructions/images/3ds.jpg",
    "waterpump/instructions/images/web.jpg",
    "waterpump/instructions/images/webxr.jpg",
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
    <>
      <mesh scale={0.1}>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial map={textureRef.current} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* <XRDomOverlay>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <button onClick={nextImage}>Next</button>
          <button onClick={prevImage}>Prev</button>
        </div>
      </XRDomOverlay> */}
    </>
  )
}
