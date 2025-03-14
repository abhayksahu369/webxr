import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { XRHitTest, useXR,useXRHitTest } from "@react-three/xr";
import { useRef, useState } from "react";
import Model from "./Model";

const XrHitModel = () => {
  const [modelpos, setModelPos] = useState([]);
  const { isPresenting } = useXR();
  const reticleRef = useRef();
  
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
const placeModel = () => {
  if (reticleRef.current) {
    setModelPos([...reticleRef.current.position.toArray()]);
  }
};
console.log(modelpos);
  
  

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, -5, 5]} intensity={1.5} />
      <pointLight position={[0, 2, 2]} intensity={1.5} />

    
     

    
     
        <XRHitTest>
          {/* Reticle Indicator */}
          <mesh rotation-x={-Math.PI / 2} ref={reticleRef} onClick={placeModel}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </XRHitTest>
        {modelpos && <Model fault="pasted__pCylinder2_lambert1_0001" position={modelpos}/>}
   

      
    </>
  );
};

export default XrHitModel;

// import { Canvas,useLoader } from "@react-three/fiber";
// import { OrbitControls} from "@react-three/drei";
// import { XR, PointerEvents, XRDomOverlay, createXRStore,useXR } from "@react-three/xr";
// import { useState } from "react";
// import Model from "./Model";
// import * as THREE from "three";




// export default function CubeContainer() {
//   const [position, setPosition] = useState([0, 0, -0.5]); // Default position in front of the user
  
  

//   return (
//     <>





//       <Canvas >
//         <XR store={store} >
//           <OrbitControls />
//           <PointerEvents />
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[5, 5, 5]} intensity={2} />
//           <directionalLight position={[-5, -5, 5]} intensity={1.5} />
//           <pointLight position={[0, 2, 2]} intensity={1.5} />
          
//           <Model position={position} fault="pasted__pCylinder2_lambert1_0001" />
//         </XR>
//       </Canvas>
//     </>
//   );
// }

// // ✅ Styling helper for enter AR button
// const buttonStyle = (color) => ({
//   position: "absolute",
//   top: 20,
//   left: 20,
//   padding: "10px 15px",
//   fontSize: "14px",
//   cursor: "pointer",
//   background: color,
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
// });

// // ✅ Styling helper for XRDomOverlay exit button
// const overlayButtonStyle = (color) => ({
//   position: "absolute",
//   bottom: 20,
//   left: "50%",
//   transform: "translateX(-50%)",
//   padding: "12px 18px",
//   fontSize: "16px",
//   cursor: "pointer",
//   background: color,
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
// });





// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { XR, XRHitTest, createXRStore, useXR, XRDomOverlay,noEvents,PointerEvents } from "@react-three/xr";
// import { useState } from "react";
// import Model from "./Model";
// import { Handle, HandleTarget } from "@react-three/handle"

// const store = createXRStore();

// export default function CubeContainer() {
//   const [position, setPosition] = useState([0, 0, -5]); // Default position in front of the user
  

//   return (
//     <>
//       <button onClick={() => store.enterAR()}>Enter AR</button>
//       <Canvas events={noEvents}>
//         <XR store={store}>
//           <OrbitControls />
//           <PointerEvents/>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[5, 5, 5]} intensity={2} />
//           <directionalLight position={[-5, -5, 5]} intensity={1.5} />
//           <pointLight position={[0, 2, 2]} intensity={1.5} />

//           {/* Hit Test to Detect Surfaces in AR */}
//           {/* <XRHitTest
//             onSelect={(hitMatrix) => {
//               console.log("hitted", hitMatrix);
//               setPosition([hitMatrix.elements[12], hitMatrix.elements[13], hitMatrix.elements[14]]);
//             }}
//           /> */}

      
  
          
//                 <Model position={position} fault="pCylinder4_lambert1_0"/>
               
//         </XR>
//       </Canvas>
//     </>
//   );
// }





// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { XR, XRHitTest, createXRStore, useXRHitTest, useXR, XRDomOverlay } from "@react-three/xr";
// import { useState, useRef } from "react";
// import Model from "./Model";

// const store = createXRStore();

// export default function CubeContainer() {
//   return (
//     <>
//       <button onClick={() => store.enterAR()}>Enter AR</button>
//       <Canvas>
//         <XR store={store}>
//           <OrbitControls />
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[5, 5, 5]} intensity={2} />
//           <directionalLight position={[-5, -5, 5]} intensity={1.5} />
//           <pointLight position={[0, 2, 2]} intensity={1.5} />

//           <Model />
//         </XR>
//       </Canvas>
//     </>
//   );
// }

