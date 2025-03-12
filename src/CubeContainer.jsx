import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { XR, XRHitTest, createXRStore, useXR, XRDomOverlay,noEvents,PointerEvents } from "@react-three/xr";
import { useState } from "react";
import Model from "./Model";
import { Handle, HandleTarget } from "@react-three/handle"

const store = createXRStore();

export default function CubeContainer() {
  const [position, setPosition] = useState([0, 0, -5]); // Default position in front of the user
  

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas events={noEvents}>
        <XR store={store}>
          <OrbitControls />
          <PointerEvents/>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, -5, 5]} intensity={1.5} />
          <pointLight position={[0, 2, 2]} intensity={1.5} />

          {/* Hit Test to Detect Surfaces in AR */}
          {/* <XRHitTest
            onSelect={(hitMatrix) => {
              console.log("hitted", hitMatrix);
              setPosition([hitMatrix.elements[12], hitMatrix.elements[13], hitMatrix.elements[14]]);
            }}
          /> */}

      
  
          
                <Model position={position} fault="pCylinder4_lambert1_0"/>
               
        </XR>
      </Canvas>
    </>
  );
}





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

