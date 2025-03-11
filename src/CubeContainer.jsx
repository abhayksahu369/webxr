import {Canvas} from '@react-three/fiber'
import {OrbitControls} from "@react-three/drei"
import {XR,createXRStore} from "@react-three/xr"
import Model from './Model'

const store = createXRStore()

export default function CubeContainer() {
  return (
    <>
    <button onClick={() => store.enterAR()}>Enter AR</button>
    <Canvas>
        <XR store={store}>
        <OrbitControls/>
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[0, 2, 2]} intensity={1.5} />

        <mesh position-z={0}>
            {/* <boxGeometry args={[2,2,2]}/> */}
            <Model />
            {/* <meshStandardMaterial color={"mediumpurple"}/> */}
        </mesh>
        </XR>
    </Canvas>
    </>
  )
}
