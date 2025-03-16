import { useEffect, useRef, useState } from "react";
import { useXR, useXRHitTest } from "@react-three/xr";
import Model from "./Model"; // Your 3D Model
import { useSearchParams } from "react-router-dom";
import ModelContainer from "./ModelContainer";

const XrHitModel = () => {
  const reticleRef = useRef(); // Reticle shows where model will be placed
  const [modelPosition, setModelPosition] = useState();
  const [faultyCom,setFaultyCom]=useState();

  const {session}=useXR();
   useEffect(() => {
   
    const queryParams = new URLSearchParams(window.location.search);
    let query = queryParams.get("query");
    if (query) {
      query = query.replace(/\?/g, "_"); 
      setFaultyCom(query);
    }
  }, []);

  // Use hit testing to update the reticle's position
  useXRHitTest((hitMatrix) => {
    // if (reticleRef.current) {
      console.log("testing")
    console.log(hitMatrix)
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );
    // }
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });
  if (reticleRef.current) {
    reticleRef.current.position.set(0, 0, -1); // Default position in front
  }
  if(reticleRef.current){
    console.log(reticleRef.current.position)
  }
 
  const placeModel = () => {
    if (reticleRef.current) {
      setModelPosition([...reticleRef.current.position]);
    }
  };

  return (
    <>
      {/* Display the model at the detected position */}
      {/* {modelPosition && <Model position={modelPosition} scale={0.1} />} */}

      {/* Reticle showing where the model will be placed */}
      {
        session&&(
          <mesh ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]} onClick={placeModel}>
          <ringGeometry args={[0.1, 0.25, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        )
      }
      
      {modelPosition&&<Model position={modelPosition} fault={faultyCom} scale={0.04} />}
      {!session&&<Model scale={0.1} position={[0,0,0]} fault={faultyCom} />}
    </>
  );
};

export default XrHitModel;
