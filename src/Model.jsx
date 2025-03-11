import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
    const gltf = useLoader(GLTFLoader, "factory.glb"); // Ensure correct path

    return <primitive  object={gltf.scene} scale={0.1}  position={[0, -2, -2]}/>;
};
export default Model;