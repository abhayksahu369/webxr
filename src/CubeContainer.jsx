import {Canvas} from '@react-three/fiber'
import {OrbitControls} from "@react-three/drei"
import {XR,createXRStore} from "@react-three/xr"

const store = createXRStore()

export default function CubeContainer() {
  return (
    <>
    <button onClick={() => store.enterAR()}>Enter AR</button>
    <Canvas>
        <XR store={store}>
        <OrbitControls/>
        <ambientLight/>
        <mesh position-z={-2}>
            <boxGeometry args={[2,2,2]}/>
            <meshStandardMaterial color={"mediumpurple"}/>
        </mesh>
        </XR>
    </Canvas>
    </>
  )
}
