import { useEffect, useState, forwardRef } from "react";
import * as THREE from "three";

const Video = forwardRef(({ position }, videoRef) => {
  const [videoTexture, setVideoTexture] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/centrifugalpump/instructions/videos/centrifugal.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = false; // Change to true if needed

    if (videoRef) videoRef.current = video; // Assign the ref

    const texture = new THREE.VideoTexture(video);
    setVideoTexture(texture);
  }, [videoRef]);

  return (
    <group position={position}>
      {videoTexture && (
        <mesh scale={0.2} renderOrder={1}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial
            map={videoTexture}
            depthWrite={false}
            toneMapped={false}
            side={THREE.DoubleSide}
            depthTest={false}
          />
        </mesh>
      )}
    </group>
  );
});

export default Video;


// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { PivotHandles, TransformHandles } from "@react-three/handle";
// import { XRDomOverlay } from "@react-three/xr";


// export default function Video({ position }) {
//   const videoRef = useRef(null);
//   const [videoTexture, setVideoTexture] = useState(null);

//   useEffect(() => {
//     // Create a video element
//     const video = document.createElement("video");
//     video.src = "waterpump/instructions/videos/test.mp4"; // Place video in the public folder
//     video.crossOrigin = "anonymous";
//     video.loop = true;
//     video.muted = false; // Change to true if needed
//     videoRef.current = video;

//     // Create a texture from the video
//     const texture = new THREE.VideoTexture(video);
//     setVideoTexture(texture);
//   }, []);

//   return (
//     <>
//         <group position={position}>
//           {videoTexture && (
//             <mesh scale={0.2} renderOrder={1}>
//               <planeGeometry args={[3, 2]} />
//               <meshBasicMaterial map={videoTexture} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} depthTest={false} />
//             </mesh>
//           )}
//         </group>
//         <XRDomOverlay>
//           <div
//             style={{
//               position: "absolute",
//               bottom: 40,
//               left: "50%",
//               transform: "translateX(-50%)",
//               display: "flex",
//               gap: "10px",
//               background: "rgba(0, 0, 0, 0.5)",
//               padding: "10px",
//               borderRadius: "10px",
//             }}
//           >
//             <button onClick={() => videoRef.current.play()}>Play video</button>
//             <button onClick={() => videoRef.current.pause()}>Pause video</button>
//           </div>
//         </XRDomOverlay>
//     </>
//   );
// }

