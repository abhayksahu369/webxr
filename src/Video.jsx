
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";


export default function Video() {
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
      {videoTexture && (
        <mesh position={[0, 1.5, -2]}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>
      )}
      {/* Video Controls */}
      <mesh position={[0, 0.5, -1.9]} onClick={() => videoRef.current.play()}>
        <boxGeometry args={[0.5, 0.2, 0.1]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[1, 0.5, -1.9]} onClick={() => videoRef.current.pause()}>
        <boxGeometry args={[0.5, 0.2, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
}

