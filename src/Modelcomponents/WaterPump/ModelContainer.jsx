import { Canvas} from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import { XR, PointerEvents, XRDomOverlay, createXRStore,useXR ,requestXRAnchor} from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import HitTest from "./HitTest"
const store = createXRStore();


export default function ModelContainer() {
  // const [position, setPosition] = useState([0, 0, -1]); // Default position in front of the user
  return (
    <>
      <button onClick={() => store.enterAR()} >Enter AR</button>
      <Canvas >
        <XR store={store} sessionInit={{ requiredFeatures: ["hit-test"] }}>
          <OrbitControls />
          <PointerEvents />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, -5, 5]} intensity={1.5} />
          <pointLight position={[0, 2, 2]} intensity={1.5} />

          
          {/* <Model position={position} fault="pasted__pCylinder2_lambert1_0001" /> */}
          {/* <XrHitModel/> */}
          <HitTest/>
        

        </XR>
      </Canvas>
    </>
  );
}


const buttonStyle = (color) => ({
  position: "absolute",
  top: 20,
  left: 20,
  padding: "10px 15px",
  fontSize: "14px",
  cursor: "pointer",
  background: color,
  color: "white",
  border: "none",
  borderRadius: "5px",
});

// ✅ Styling helper for XRDomOverlay exit button
const overlayButtonStyle = (color) => ({
  position: "absolute",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  padding: "12px 18px",
  fontSize: "16px",
  cursor: "pointer",
  background: color,
  color: "white",
  border: "none",
  borderRadius: "5px",
});

