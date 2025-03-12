import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";

const Model = () => {
    const gltf = useLoader(GLTFLoader, "factory.glb");
    const [rotation, setRotation] = useState([0, 0, 0]);

    const handleDrag = (event) => {
        setRotation([rotation[0], rotation[1] + event.movementX * 0.01, rotation[2]]);
    };
    const [hoveredPart, setHoveredPart] = useState(null);

    // 🔥 Hover Effect
    const handlePointerOver = (e) => {
        console.log(e);
        console.log(e.object.name);
        // e.stopPropagation();
        // setHoveredPart(e.object.name);
        e.object.material = e.object.material.clone();
        e.object.material.color.set("red"); // Highlight only this part // Highlight in red
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        // setHoveredPart(null);
        e.object.material.color.set("white"); // Reset color
    };


    return (
        <group position={[0,0,-5]} scale={0.1}>
            {gltf.scene.children.map((child) => (
                <primitive 
                    key={child.name} 
                    object={child} 
                    onPointerOver={handlePointerOver} 
                    onPointerOut={handlePointerOut} 
                />
            ))}
            {/* {hoveredPart && (
                <div style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    background: "black",
                    color: "white",
                    padding: "5px",
                    borderRadius: "3px",
                }}>
                    Hovered: {hoveredPart}
                </div>
            )} */}
        </group>
    );
};

export default Model;
