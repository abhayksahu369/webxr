import {Canvas} from '@react-three/fiber'
import {OrbitControls} from "@react-three/drei"
import {XR,XRHitTest,createXRStore} from "@react-three/xr"
import Model from './Model'

const store = createXRStore()

export default function CubeContainer() {
  return (
    <>
    <button onClick={() => store.enterAR()}>Enter AR</button>
    <Canvas>
        <XR store={store}>
        <OrbitControls/>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -5, 5]} intensity={1.5} />
        <pointLight position={[0, 2, 2]} intensity={1.5} />

        <XRHitTest>
            {/* <boxGeometry args={[2,2,2]}/> */}
            <Model />
            {/* <meshStandardMaterial color={"mediumpurple"}/> */}

        </XRHitTest>
            
        </XR>
    </Canvas>
    </>
  )
}
