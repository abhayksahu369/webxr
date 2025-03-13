import {TransformHandles,PivotHandles} from "@react-three/handle"
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Image({position,scale}) {
  const texture = useLoader(THREE.TextureLoader, "/3ds.jpg");
  return (
    <PivotHandles position={position}  scale={false} size={0.5}>
        <mesh scale={0.1}>
            <planeGeometry args={[5, 3]}  />
            <meshBasicMaterial map={texture} />
        </mesh>
   </PivotHandles>
  )
}
