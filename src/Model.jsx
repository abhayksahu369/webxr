import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { HandleTarget, Handle } from "@react-three/handle";
import { useRef, useState } from "react";
import { usePinch } from "@use-gesture/react";

const Model = ({ position, fault }) => {
    const gltf = useLoader(GLTFLoader, "factory.glb");
    const modelRef = useRef();
    const [scale, setScale] = useState(0.06);

    // Handle pinch gesture for scaling
    usePinch(({ offset: [d] }) => {
        const newScale = Math.min(Math.max(0.03, d / 100), 0.2); // Set scale range
        setScale(newScale);
    }, {
        target: modelRef
    });

    // Rotation animation
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01; // Adjust speed if needed
        }
    });

    // Modify only the faulty part
    gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === fault) {
            child.material = child.material.clone();
            child.material.color.set("red");
        }
    });

    return (
        <HandleTarget>
            <Handle rotate={{ x: false, y: true, z: false }}>
                <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
            </Handle>
        </HandleTarget>
    );
};

export default Model;



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
