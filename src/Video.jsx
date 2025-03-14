
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PivotHandles, TransformHandles } from "@react-three/handle";


export default function Video({position}) {
    console.log(position)
  const videoRef = useRef(null);
  const [videoTexture, setVideoTexture] = useState(null);

  useEffect(() => {
    // Create a video element
    const video = document.createElement("video");
    video.src = "/test.mp4"; // Place video in the public folder
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = false; // Change to true if needed
    videoRef.current = video;

    // Create a texture from the video
    const texture = new THREE.VideoTexture(video);
    setVideoTexture(texture);
  }, []);

  return (
    <>
       <PivotHandles position={position} size={0.5}>
        <group>
      {videoTexture && (
        <mesh  scale={0.2} renderOrder={1}>
          <planeGeometry args={[3, 2]}  />
          <meshBasicMaterial map={videoTexture} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} depthTest={false}/>
        </mesh>
      )}
      {/* Video Controls */}
      <mesh position={[-0.1,-0.3,0]} onClick={() => videoRef.current.play()}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[0.1,-0.3,0]} onClick={() => videoRef.current.pause()}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      </group>
      </PivotHandles>
    </>
  );
}

