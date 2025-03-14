import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
const store = createXRStore();

const XrHitModelContainer = () => {
  const sessionOptions = {
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["local-floor"], // Optional features like ground detection
  };
  
  return (
    <>
     <button onClick={() => store.enterAR(sessionOptions)}>Enter AR</button>;
      <Canvas >
        <XR store={store}>
          <XrHitModel />
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;