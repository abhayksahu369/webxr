import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { HandleTarget, Handle } from "@react-three/handle";
import { useRef, useState } from "react";
import { createXRStore, XRDomOverlay } from "@react-three/xr";
const store = createXRStore();
const Model = ({ position, fault }) => {
    const gltf = useLoader(GLTFLoader, "factory.glb");
    const modelRef = useRef();
    
    // ✅ State for scale & position
    const [scale, setScale] = useState(0.06);
    const [modelPosition, setModelPosition] = useState(position);
    const [isAnimating, setIsAnimating] = useState(true);

    // ✅ Rotation animation (controlled)
    useFrame(() => {
        if (modelRef.current && isAnimating) {
            modelRef.current.rotation.y += 0.01;
        }
    });

    // ✅ Modify only the faulty part
    gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === fault) {
            child.material = child.material.clone();
            child.material.color.set("red");
        }
    });

    // ✅ Functions to manually change scale
    const increaseSize = () => setScale((prev) => Math.min(prev + 0.01, 0.2));
    const decreaseSize = () => setScale((prev) => Math.max(prev - 0.01, 0.03));

    // ✅ Functions to manually change position
    const moveLeft = () => setModelPosition((prev) => [prev[0] - 0.1, prev[1], prev[2]]);
    const moveRight = () => setModelPosition((prev) => [prev[0] + 0.1, prev[1], prev[2]]);
    const moveUp = () => setModelPosition((prev) => [prev[0], prev[1] + 0.1, prev[2]]);
    const moveDown = () => setModelPosition((prev) => [prev[0], prev[1] - 0.1, prev[2]]);
    const moveForward = () => setModelPosition((prev) => [prev[0], prev[1], prev[2] - 0.1]);
    const moveBackward = () => setModelPosition((prev) => [prev[0], prev[1], prev[2] + 0.1]);

    // ✅ Toggle animation
    const toggleAnimation = () => setIsAnimating((prev) => !prev);

    return (
        <>
            <HandleTarget>
                <Handle>
                    <primitive ref={modelRef} object={gltf.scene} position={modelPosition} scale={scale} />
                </Handle>
            </HandleTarget>

            {/* ✅ UI Controls */}
            <XRDomOverlay>
                <div style={containerStyle}>
                    {/* Rotation Control */}
                    <button onClick={toggleAnimation} style={buttonStyle(isAnimating ? "red" : "green")}>
                        {isAnimating ? "Pause" : "Play"}
                    </button>

                    {/* Scale Control */}
                    <button onClick={increaseSize} style={buttonStyle("blue")}>➕ Increase</button>
                    <button onClick={decreaseSize} style={buttonStyle("orange")}>➖ Decrease</button>

                    {/* Position Control */}
                    <div>
                        <button onClick={moveLeft} style={buttonStyle("gray")}>⬅ Left</button>
                        <button onClick={moveRight} style={buttonStyle("gray")}>➡ Right</button>
                    </div>
                    <div>
                        <button onClick={moveUp} style={buttonStyle("gray")}>⬆ Up</button>
                        <button onClick={moveDown} style={buttonStyle("gray")}>⬇ Down</button>
                    </div>
                    <div>
                        <button onClick={moveForward} style={buttonStyle("gray")}>🔼 Forward</button>
                        <button onClick={moveBackward} style={buttonStyle("gray")}>🔽 Backward</button>
                    </div>
                    <button onClick={()=>store.exitXRSession()} style={exitButtonStyle}>
                        Exit AR
                    </button>
                </div>
            </XRDomOverlay>
        </>
    );
};

// ✅ Button styling helper function
// ✅ Button styling helper function for landscape mode
const buttonStyle = (color) => ({
    padding: "12px 20px",
    margin: "5px",
    fontSize: "16px",
    cursor: "pointer",
    background: color,
    color: "white",
    border: "none",
    borderRadius: "8px",
    minWidth: "80px",
    textAlign: "center"
});

// ✅ Container styling for landscape mode
const containerStyle = {
    position: "absolute",
    bottom: 20,  // Moved buttons to the bottom for easy access
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexWrap: "wrap",  // Buttons wrap if needed
    justifyContent: "center",
    gap: "10px",
    background: "rgba(0, 0, 0, 0.5)", // Slight background for visibility
    padding: "10px",
    borderRadius: "10px",
};

// ✅ Exit AR button style (always fixed at bottom)
const exitButtonStyle = {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    padding: "14px 24px",
    fontSize: "18px",
    cursor: "pointer",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "10px",
};


export default Model;



// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { HandleTarget, Handle ,pivo} from "@react-three/handle";
// import { useRef, useState } from "react";
// import { usePinch } from "@use-gesture/react";
// import {XRDomOverlay} from "@react-three/xr"


// const Model = ({ position, fault }) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();
//     const [scale, setScale] = useState(0.06);
//     const [isAnimating, setIsAnimating] = useState(true); // ✅ State to control animation

//     // Handle pinch gesture for scaling
//     usePinch(({ offset: [d] }) => {
//         const newScale = Math.min(Math.max(0.03, d / 100), 0.2);
//         setScale(newScale);
//     }, {
//         target: modelRef
//     });

//     // Rotation animation (controlled)
//     // useFrame(() => {
//     //     if (modelRef.current && isAnimating) {
//     //         modelRef.current.rotation.y += 0.01;
//     //     }
//     // });

//     // Modify only the faulty part
//     gltf.scene.traverse((child) => {
//         if (child.isMesh && child.name === fault) {
//             child.material = child.material.clone();
//             child.material.color.set("red");
//         }
//     });

//     // ✅ Function to toggle animation
//     const toggleAnimation = () => {
//         setIsAnimating((prev) => !prev);
//     };

//     return (
//         <>
//             <HandleTarget>
//                 <Handle  >
//                     <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
//                 </Handle>
//             </HandleTarget>

//             {/* ✅ Button to Start/Stop Animation */}
//             <XRDomOverlay>
//             <button
//                 onClick={toggleAnimation}
//                 style={{
//                     position: "absolute",
//                     top: 20,
//                     left: 20,
//                     padding: "10px 20px",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                     background: isAnimating ? "red" : "green",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px"
//                 }}
//             >
//                 {isAnimating ? "Pause" : "Play"}
//             </button>

//             </XRDomOverlay>
//         </>
//     );
// };

// export default Model;





// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { HandleTarget, Handle } from "@react-three/handle";
// import { useRef, useState } from "react";
// import { usePinch } from "@use-gesture/react";

// const Model = ({ position, fault }) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();
//     const [scale, setScale] = useState(0.06);

//     // Handle pinch gesture for scaling
//     usePinch(({ offset: [d] }) => {
//         const newScale = Math.min(Math.max(0.03, d / 100), 0.2); // Set scale range
//         setScale(newScale);
//     }, {
//         target: modelRef
//     });

//     // Rotation animation
//     useFrame(() => {
//         if (modelRef.current) {
//             modelRef.current.rotation.y += 0.01; // Adjust speed if needed
//         }
//     });

//     // Modify only the faulty part
//     gltf.scene.traverse((child) => {
//         if (child.isMesh && child.name === fault) {
//             child.material = child.material.clone();
//             child.material.color.set("red");
//         }
//     });

//     return (
//         <HandleTarget>
//             <Handle rotate={{ x: false, y: true, z: false }}>
//                 <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
//             </Handle>
//         </HandleTarget>
//     );
// };

// export default Model;



// import { useLoader,useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { HandleTarget, Handle } from "@react-three/handle";
// import { useRef } from "react";

// const Model = ({ position, fault }) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();

//         // Rotation animation
//         useFrame(() => {
//             if (modelRef.current) {
//                 modelRef.current.rotation.y += 0.01; // Adjust speed if needed
//             }
//         });

//     // Modify only the faulty part
//     gltf.scene.traverse((child) => {
//         if (child.isMesh && child.name === fault) {
//             child.material = child.material.clone();
//             child.material.color.set("red");
//         }
//     });

//     return (
//         <HandleTarget>
//             <Handle rotate={{ x: false, y: true, z: false }}>
//                 <primitive ref={modelRef} object={gltf.scene} position={position} scale={0.06} />
//             </Handle>
//         </HandleTarget>
//     );
// };

// export default Model;



// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useRef } from "react";
// import {HandleTarget,Handle} from "@react-three/handle"

// const Model = ({position}) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();

//     // Rotation animation
//     // useFrame(() => {
//     //     if (modelRef.current) {
//     //         modelRef.current.rotation.y += 0.005; // Adjust speed if needed
//     //     }
//     // });

//     const handlePointerDown = (e) => {
//         e.stopPropagation();
//         e.object.material = e.object.material.clone();
//         e.object.material.color.set("red");
//     };

//     return (
//         <HandleTarget>
//             <Handle translate>
//             <group ref={modelRef} position={position} scale={0.08}>
//             {gltf.scene.children.map((child) => (
//                 <primitive key={child.name} object={child} onPointerDown={handlePointerDown} />
//             ))}
//         </group>

//             </Handle>
//         </HandleTarget>
        
//     );
// };

// export default Model;





// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const Model = () => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
   
//     const handlePointerDown=(e)=>{
//         console.log(e);
//         console.log(e.object.material.color);
//         e.stopPropagation();
//         e.object.material = e.object.material.clone();
//          e.object.material.color.set("red");

//     }

//     return (
//         <group position={[0,0,-3]} scale={0.08}>
//             {gltf.scene.children.map((child) => (
//                 <primitive 
//                     key={child.name} 
//                     object={child} 

//                     onPointerDown={handlePointerDown}
//                 />
//             ))}
//         </group>
//     );
// };

// export default Model;
