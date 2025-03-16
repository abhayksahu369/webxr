import { Html } from "@react-three/drei";
import { useState } from "react";
import Dashboard from "./Dashboard"

const DashboardInAR = () => {
  const [visible, setVisible] = useState(true);

  return (
    <mesh position={[0, 1.5, -2]} scale={[1, 1, 1]}>
      {/* 3D Plane for Dashboard */}
      <planeGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="white" transparent opacity={0.5} />

      {/* Render HTML inside AR */}
      <Html transform position={[0, 0, 0.01]}>
        <Dashboard/>
      </Html>
    </mesh>
  );
};

export default DashboardInAR;
