import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { HandleTarget, Handle } from "@react-three/handle";
import { useRef, useState } from "react";
import { usePinch } from "@use-gesture/react";
import { XRDomOverlay } from "@react-three/xr";

const Model = ({ position, fault }) => {
    const gltf = useLoader(GLTFLoader, "factory.glb");
    const modelRef = useRef();
    const { gl } = useThree(); // ✅ Get access to the canvas domElement
    const [scale, setScale] = useState(0.06);
    const [isAnimating, setIsAnimating] = useState(true);

    // ✅ Fix: Attach usePinch to gl.domElement (Canvas)
    usePinch(
        ({ offset: [d] }) => {
            const newScale = Math.min(Math.max(0.03, d / 100), 0.2);
            setScale(newScale);
        },
        {
            target: gl.domElement, // ✅ Fix: Attach gesture to canvas
            eventOptions: { passive: false },
        }
    );

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

    // ✅ Function to toggle animation
    const toggleAnimation = () => {
        setIsAnimating((prev) => !prev);
    };

    return (
        <>
            <HandleTarget>
                <Handle>
                    <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
                </Handle>
            </HandleTarget>

            {/* ✅ Button to Start/Stop Animation */}
            <XRDomOverlay>
                <button
                    onClick={toggleAnimation}
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        background: isAnimating ? "red" : "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    {isAnimating ? "Pause" : "Play"}
                </button>
            </XRDomOverlay>
        </>
    );
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
