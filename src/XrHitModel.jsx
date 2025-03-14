import { useRef, useState } from "react";
import { useXRHitTest } from "@react-three/xr";
import Model from "./Model"; // Your 3D Model

const XrHitModel = () => {
  const reticleRef = useRef(); // Reticle shows where model will be placed
  const [modelPosition, setModelPosition] = useState(null);

  // Use hit testing to update the reticle's position
  useXRHitTest((hitMatrix) => {
    if (reticleRef.current) {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );
    }
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  // Place the model where the reticle is
  // const placeModel = () => {
  //   if (reticleRef.current) {
  //     setModelPosition([...reticleRef.current.position]);
  //   }
  // };

  return (
    <>
      {/* Display the model at the detected position */}
      {/* {modelPosition && <Model position={modelPosition} scale={0.1} />} */}

      {/* Reticle showing where the model will be placed */}
      <mesh ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.25, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
};

export default XrHitModel;
