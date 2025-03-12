import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { XR, XRHitTest, createXRStore, useXRHitTest, useXR, XRDomOverlay } from "@react-three/xr";
import { useState, useRef } from "react";
import Model from "./Model";

const store = createXRStore();

export default function CubeContainer() {
    return (
        <>
            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas>
                <XR store={store}>
                    <ARScene /> {/* 🔥 Move WebXR hooks inside this component */}
                </XR>
            </Canvas>
        </>
    );
}

// 🔥 Separate Component for AR Logic
const ARScene = () => {
    const [modelPosition, setModelPosition] = useState(null);
    const reticleRef = useRef();
    const { isPresenting } = useXR(); // ✅ Now inside <XR>

    // ✅ useHitTest is now inside <XR>
    useXRHitTest((hitMatrix) => {
        if (reticleRef.current) {
            hitMatrix.decompose(
                reticleRef.current.position,
                reticleRef.current.quaternion,
                reticleRef.current.scale
            );
        }
    });

    // 📌 Places model at touched position
    const placeModel = () => {
        if (reticleRef.current) {
            setModelPosition([...reticleRef.current.position.toArray()]);
        }
    };

    return (
        <>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <directionalLight position={[-5, -5, 5]} intensity={1.5} />
            <pointLight position={[0, 2, 2]} intensity={1.5} />

            {/* 📌 UI Overlay for Instructions */}
            <XRDomOverlay
                style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <div style={{ backgroundColor: "green", padding: "1rem 2rem" }}>
                    Tap anywhere to place the model
                </div>
            </XRDomOverlay>

            {/* 📌 Reticle for Placement */}
            <XRHitTest>
                <mesh ref={reticleRef} onClick={placeModel}>
                    <ringGeometry args={[0.1, 0.25, 32]} />
                    <meshStandardMaterial color="white" transparent opacity={0.7} />
                </mesh>
            </XRHitTest>

            {/* 📌 Place Model at Clicked Position */}
            {modelPosition && <Model position={modelPosition} />}
        </>
    );
};
