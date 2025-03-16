import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useEffect, useState, useMemo } from "react";
import { PivotHandles } from "@react-three/handle";
import { useAnimations, useGLTF } from "@react-three/drei";
import Video from "./Video";
import { useXR, XRDomOverlay } from "@react-three/xr";
import * as THREE from "three";
import SensorDashboard from "./Dashboard";

const AnimatedModel = ({position,fault,scale }) => {
  console.log(position)
  const[showIns,setShowIns]=useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHandles, setShowHandles] = useState(0);
  const {session}=useXR();
  const positionRef = useRef(position);
  const mixer = useRef(null);
  const action = useRef(null);
  const { scene, animations } = useGLTF("/waterpump/waterpump.glb");
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

const playVideo = () => {
  if (videoRef.current) {
    videoRef.current.play();
  }
};

const pauseVideo = () => {
  if (videoRef.current) {
    videoRef.current.pause();
  }
};

  
  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      action.current = mixer.current.clipAction(animations[0]);
      action.current.play();
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current && isPlaying) {
      mixer.current.update(delta);
    }
  });
  
  
  scene.traverse((child) => {
    if (child.isMesh && child.name === fault) {
      child.material = child.material.clone();
      child.material.color.set("red");
    }
  });
     
  
  
  
  
  const exitAR = () => {
       if (session) session.end();
     };
  
  const toggleAnimation = () => {
    if (action.current) {
      if (isPlaying) {
        action.current.paused = true; // Pause animation
      } else {
        action.current.play(); // Start animation
        action.current.paused = false;
      }
      setIsPlaying(!isPlaying);
    }
  };
    
  const resetModel = () => {
    if (action.current) {
      action.current.stop(); 
      action.current.reset(); 
    }
    setIsPlaying(false); 
  };
   
    const handlePointerDown=(e)=>{
        e.stopPropagation();
        if(e.object.name===fault){
            console.log("falty region touched");
            setShowIns(true);
        }
       
    
    
    }
    const toggleHandles = () => {
        if(showHandles==0){
          setShowHandles(0.5)
        }else{
          setShowHandles(0)
        }
      };
  //***************************image section***********************/
  const images = [
      "waterpump/instructions/images/3ds.jpg",
      "waterpump/instructions/images/web.jpg",
      "waterpump/instructions/images/webxr.jpg",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const textureRef = useRef(new THREE.TextureLoader().load(images[0])); // Load once
  
    useEffect(() => {
      textureRef.current = new THREE.TextureLoader().load(images[currentIndex]);
    }, [currentIndex]); 
    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
    <>
      <group position={position}>
        {showIns ? (
          <>
             <PivotHandles size={showHandles} position={[-0.3, 1, 0]} >
             <mesh scale={0.1}>
                     <planeGeometry args={[5, 3]} />
                     <meshBasicMaterial map={textureRef.current} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
             </PivotHandles>
           
            <PivotHandles size={showHandles} position={[0.3, 1, 0]} >
            <Video ref={videoRef} />
            </PivotHandles>
           

          </>
        ) : <></>}
    
          <PivotHandles size={showHandles}>
            <primitive object={scene} scale={scale} onPointerDown={handlePointerDown}  rotation={[0, Math.PI, 0]} />
          </PivotHandles>

      </group>

      <XRDomOverlay>
        <SensorDashboard/>
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <button onClick={toggleAnimation}>
            {isPlaying ? "Pause Animation" : "Play Animation"}
          </button>
          <button onClick={resetModel}>Reset Model</button>
          <button onClick={toggleHandles}>{showHandles ? "Done" : "Adjust"}</button>
          <button onClick={exitAR}>Exit</button>
            
        </div>
        {showIns && (
              <div
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "10px",
                background: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
                <button onClick={playVideo}>Play Video</button>
                <button onClick={pauseVideo}>Pause Video</button>
              <button onClick={nextImage}>Next</button>
              <button onClick={prevImage}>Prev</button>
            </div>
          

            )}
      </XRDomOverlay>
    </>

  );
};

export default AnimatedModel;


// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useRef, useEffect } from "react";
// import { useAnimations } from "@react-three/drei";
// import {TransformHandles,PivotHandles} from "@react-three/handle"

// const AnimatedModel = ({position,fault}) => {
//     // Load model and animations
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     console.log(gltf)
//     const modelRef = useRef();
//     const { animations } = gltf;
//     const { actions } = useAnimations(animations, modelRef);

//     // useEffect(() => {
//     //     if (actions && animations.length > 0) {
//     //         actions[animations[0].name]?.play(); // Play first animation
//     //         console.log("Animation Started:", animations[0].name);
//     //     } else {
//     //         console.log("No animations found in model.");
//     //     }
//     // }, [actions, animations]);

//     return(
        
            
//             <group ref={modelRef}  scale={0.06}>
//             {gltf.scene.traverse((child) => {
//                 console.log(child)
//                 if (child.isMesh && child.name === fault) {
//              child.material = child.material.clone();
//              child.material.color.set("red");
//             //  return(
//             //     <TransformHandles>
//             //         <primitive key={child.name} object={child} />
//             //     </TransformHandles>

//             //  )
//                }
//                return <primitive key={child.name} object={child} />
               
//             }
//         )}
//          </group>
            
//     ) 
// };

// export default AnimatedModel;





// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { HandleTarget, Handle } from "@react-three/handle";
// import { useRef, useState } from "react";
// import { createXRStore, XRDomOverlay } from "@react-three/xr";
// const store = createXRStore();
// const Model = ({ position, fault }) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();
    
//     // ✅ State for scale & position
//     const [scale, setScale] = useState(0.06);
//     const [modelPosition, setModelPosition] = useState(position);
//     const [isAnimating, setIsAnimating] = useState(true);

//     // ✅ Rotation animation (controlled)
//     // useFrame(() => {
//     //     if (modelRef.current && isAnimating) {
//     //         modelRef.current.rotation.y += 0.01;
//     //     }
//     // });

//     // ✅ Modify only the faulty part
//     gltf.scene.traverse((child) => {
//         if (child.isMesh && child.name === fault) {
//             child.material = child.material.clone();
//             child.material.color.set("red");
//         }
//     });

//     // ✅ Functions to manually change scale
//     const increaseSize = () => setScale((prev) => Math.min(prev + 0.01, 0.2));
//     const decreaseSize = () => setScale((prev) => Math.max(prev - 0.01, 0.03));

//     // ✅ Functions to manually change position
//     const moveLeft = () => setModelPosition((prev) => [prev[0] - 0.1, prev[1], prev[2]]);
//     const moveRight = () => setModelPosition((prev) => [prev[0] + 0.1, prev[1], prev[2]]);
//     const moveUp = () => setModelPosition((prev) => [prev[0], prev[1] + 0.1, prev[2]]);
//     const moveDown = () => setModelPosition((prev) => [prev[0], prev[1] - 0.1, prev[2]]);
//     const moveForward = () => setModelPosition((prev) => [prev[0], prev[1], prev[2] - 0.1]);
//     const moveBackward = () => setModelPosition((prev) => [prev[0], prev[1], prev[2] + 0.1]);

//     // ✅ Toggle animation
//     const toggleAnimation = () => setIsAnimating((prev) => !prev);

//     return (
//         <>
//             <HandleTarget>
//                 <Handle>
//                     <primitive ref={modelRef} object={gltf.scene} position={modelPosition} scale={scale} />
//                 </Handle>
//             </HandleTarget>

//             {/* ✅ UI Controls */}
//             <XRDomOverlay>
//                 <div style={containerStyle}>
//                     {/* Rotation Control */}
//                     <button onClick={toggleAnimation} style={buttonStyle(isAnimating ? "red" : "green")}>
//                         {isAnimating ? "Pause" : "Play"}
//                     </button>

//                     {/* Scale Control */}
//                     <button onClick={increaseSize} style={buttonStyle("blue")}>➕ Increase</button>
//                     <button onClick={decreaseSize} style={buttonStyle("orange")}>➖ Decrease</button>

//                     {/* Position Control */}
//                     <div>
//                         <button onClick={moveLeft} style={buttonStyle("gray")}>⬅ Left</button>
//                         <button onClick={moveRight} style={buttonStyle("gray")}>➡ Right</button>
//                     </div>
//                     <div>
//                         <button onClick={moveUp} style={buttonStyle("gray")}>⬆ Up</button>
//                         <button onClick={moveDown} style={buttonStyle("gray")}>⬇ Down</button>
//                     </div>
//                     <div>
//                         <button onClick={moveForward} style={buttonStyle("gray")}>🔼 Forward</button>
//                         <button onClick={moveBackward} style={buttonStyle("gray")}>🔽 Backward</button>
//                     </div>
//                     <button onClick={()=>store.exitXRSession()} style={exitButtonStyle}>
//                         Exit AR
//                     </button>
//                 </div>
//             </XRDomOverlay>
//         </>
//     );
// };

// // ✅ Button styling helper function
// // ✅ Button styling helper function for landscape mode
// const buttonStyle = (color) => ({
//     padding: "12px 20px",
//     margin: "5px",
//     fontSize: "16px",
//     cursor: "pointer",
//     background: color,
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     minWidth: "80px",
//     textAlign: "center"
// });

// // ✅ Container styling for landscape mode
// const containerStyle = {
//     position: "absolute",
//     bottom: 20,  // Moved buttons to the bottom for easy access
//     left: "50%",
//     transform: "translateX(-50%)",
//     display: "flex",
//     flexWrap: "wrap",  // Buttons wrap if needed
//     justifyContent: "center",
//     gap: "10px",
//     background: "rgba(0, 0, 0, 0.5)", // Slight background for visibility
//     padding: "10px",
//     borderRadius: "10px",
// };

// // ✅ Exit AR button style (always fixed at bottom)
// const exitButtonStyle = {
//     position: "absolute",
//     bottom: 20,
//     left: "50%",
//     transform: "translateX(-50%)",
//     padding: "14px 24px",
//     fontSize: "18px",
//     cursor: "pointer",
//     background: "red",
//     color: "white",
//     border: "none",
//     borderRadius: "10px",
// };


// export default Model;



// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { HandleTarget, Handle ,pivo} from "@react-three/handle";
// import { useRef, useState } from "react";
// import { usePinch } from "@use-gesture/react";
// import {XRDomOverlay} from "@react-three/xr"


// const Model = ({ position, fault }) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();
//     const [scale, setScale] = useState(0.06);
//     const [isAnimating, setIsAnimating] = useState(true); // ✅ State to control animation

//     // Handle pinch gesture for scaling
//     usePinch(({ offset: [d] }) => {
//         const newScale = Math.min(Math.max(0.03, d / 100), 0.2);
//         setScale(newScale);
//     }, {
//         target: modelRef
//     });

//     // Rotation animation (controlled)
//     // useFrame(() => {
//     //     if (modelRef.current && isAnimating) {
//     //         modelRef.current.rotation.y += 0.01;
//     //     }
//     // });

//     // Modify only the faulty part
//     gltf.scene.traverse((child) => {
//         if (child.isMesh && child.name === fault) {
//             child.material = child.material.clone();
//             child.material.color.set("red");
//         }
//     });

//     // ✅ Function to toggle animation
//     const toggleAnimation = () => {
//         setIsAnimating((prev) => !prev);
//     };

//     return (
//         <>
//             <HandleTarget>
//                 <Handle  >
//                     <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
//                 </Handle>
//             </HandleTarget>

//             {/* ✅ Button to Start/Stop Animation */}
//             <XRDomOverlay>
//             <button
//                 onClick={toggleAnimation}
//                 style={{
//                     position: "absolute",
//                     top: 20,
//                     left: 20,
//                     padding: "10px 20px",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                     background: isAnimating ? "red" : "green",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px"
//                 }}
//             >
//                 {isAnimating ? "Pause" : "Play"}
//             </button>

//             </XRDomOverlay>
//         </>
//     );
// };

// export default Model;





// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { HandleTarget, Handle } from "@react-three/handle";
// import { useRef, useState } from "react";
// import { usePinch } from "@use-gesture/react";

// const Model = ({ position, fault }) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();
//     const [scale, setScale] = useState(0.06);

//     // Handle pinch gesture for scaling
//     usePinch(({ offset: [d] }) => {
//         const newScale = Math.min(Math.max(0.03, d / 100), 0.2); // Set scale range
//         setScale(newScale);
//     }, {
//         target: modelRef
//     });

//     // Rotation animation
//     useFrame(() => {
//         if (modelRef.current) {
//             modelRef.current.rotation.y += 0.01; // Adjust speed if needed
//         }
//     });

//     // Modify only the faulty part
//     gltf.scene.traverse((child) => {
//         if (child.isMesh && child.name === fault) {
//             child.material = child.material.clone();
//             child.material.color.set("red");
//         }
//     });

//     return (
//         <HandleTarget>
//             <Handle rotate={{ x: false, y: true, z: false }}>
//                 <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
//             </Handle>
//         </HandleTarget>
//     );
// };

// export default Model;



// import { useLoader,useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { HandleTarget, Handle } from "@react-three/handle";
// import { useRef } from "react";

// const Model = ({ position, fault }) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();

//         // Rotation animation
//         useFrame(() => {
//             if (modelRef.current) {
//                 modelRef.current.rotation.y += 0.01; // Adjust speed if needed
//             }
//         });

//     // Modify only the faulty part
//     gltf.scene.traverse((child) => {
//         if (child.isMesh && child.name === fault) {
//             child.material = child.material.clone();
//             child.material.color.set("red");
//         }
//     });

//     return (
//         <HandleTarget>
//             <Handle rotate={{ x: false, y: true, z: false }}>
//                 <primitive ref={modelRef} object={gltf.scene} position={position} scale={0.06} />
//             </Handle>
//         </HandleTarget>
//     );
// };

// export default Model;



// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useRef } from "react";
// import {HandleTarget,Handle} from "@react-three/handle"

// const Model = ({position}) => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
//     const modelRef = useRef();

//     // Rotation animation
//     // useFrame(() => {
//     //     if (modelRef.current) {
//     //         modelRef.current.rotation.y += 0.005; // Adjust speed if needed
//     //     }
//     // });

//     const handlePointerDown = (e) => {
//         e.stopPropagation();
//         e.object.material = e.object.material.clone();
//         e.object.material.color.set("red");
//     };

//     return (
//         <HandleTarget>
//             <Handle translate>
//             <group ref={modelRef} position={position} scale={0.08}>
//             {gltf.scene.children.map((child) => (
//                 <primitive key={child.name} object={child} onPointerDown={handlePointerDown} />
//             ))}
//         </group>

//             </Handle>
//         </HandleTarget>
        
//     );
// };

// export default Model;





// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const Model = () => {
//     const gltf = useLoader(GLTFLoader, "factory.glb");
   
//     const handlePointerDown=(e)=>{
//         console.log(e);
//         console.log(e.object.material.color);
//         e.stopPropagation();
//         e.object.material = e.object.material.clone();
//          e.object.material.color.set("red");

//     }

//     return (
//         <group position={[0,0,-3]} scale={0.08}>
//             {gltf.scene.children.map((child) => (
//                 <primitive 
//                     key={child.name} 
//                     object={child} 

//                     onPointerDown={handlePointerDown}
//                 />
//             ))}
//         </group>
//     );
// };

// export default Model;
