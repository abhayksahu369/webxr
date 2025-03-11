import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";

const Model = () => {
    const gltf = useLoader(GLTFLoader, "factory.glb");
    const [rotation, setRotation] = useState([0, 0, 0]);

    const handleDrag = (event) => {
        setRotation([rotation[0], rotation[1] + event.movementX * 0.01, rotation[2]]);
    };

    return (
        <primitive
            object={gltf.scene}
            scale={0.1}
            position={[0, -1, -3]}
            rotation={rotation}
            onPointerDown={(event) => event.target.setPointerCapture(event.pointerId)}
            onPointerMove={handleDrag} // Rotate on drag
        />
    );
};

export default Model;
