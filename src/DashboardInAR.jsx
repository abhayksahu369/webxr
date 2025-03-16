import { Html } from "@react-three/drei";
import { useState } from "react";
import Dashboard from "./Dashboard"

const DashboardInAR = () => {
  const [visible, setVisible] = useState(true);

  return (
    <mesh position={[0, 0.5, -0.5]} scale={[0.5, 0.5, 0.5]}>
      {/* 3D Plane for Dashboard */}
    

      {/* Render HTML inside AR */}
      <Html transform position={[0, 0, 0.01]}>
        <div >
        hellooooo
        {/* <Dashboard/> */}
        </div>
      </Html>
    </mesh>
  );
};

export default DashboardInAR;
