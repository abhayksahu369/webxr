import {Canvas} from '@react-three/fiber'
import {OrbitControls} from "@react-three/drei"
import {XR,XRHitTest,createXRStore,XRDomOverlay} from "@react-three/xr"
import Model from './Model'
import { useState } from 'react'


const store = createXRStore()

export default function CubeContainer() {
  const [message, setMessage] = useState("Welcome to WebXR!");
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
        <XRDomOverlay
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div
              style={{ backgroundColor: 'green', padding: '1rem 2rem' }}
            >
 Hello World
            </div>
          </XRDomOverlay>

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
