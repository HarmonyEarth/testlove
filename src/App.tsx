import { OrbitControls, Stats, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Tifa from "./components/Characters/Tifa";
import ColorPicker from "./ColorPicker";
import { Physics } from "@react-three/cannon";

function App() {
  return (
    <>
      <br />
      <ColorPicker />
      <Canvas camera={{ position: [0, 2, 2] }}>
        <Stats />
        <OrbitControls />
        <Sky sunPosition={[0, 1, 0]} />
        <ambientLight />
        <Physics>
          <directionalLight color="lightyellow" />
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial color={"lightgreen"} />
          </mesh>
          <Suspense fallback={null}>
            <Tifa />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
}

export default App;

// const TifaModel2 = () => {
//   const { scene } = useGLTF("/TifaGLTF/tifaBase.glb");
//   const { animations } = useGLTF("/TifaGLTF/tifaIdle.glb");
//   const runAnimation = useGLTF("/TifaGLTF/tifaRun.glb");

//   // console.log("idleAnimation", idleAnimation);

//   const { actions } = useAnimations([animations[0]]);

//   console.log("actions", actions);

//   useEffect(() => {
//     const currentAnimation = actions[0]; // Assuming idle animation is at index 0

//     if (currentAnimation) {
//       currentAnimation.reset().fadeIn(0.32).play(); // Reset, fade in, and play the current animation

//       // Return a cleanup function to fade out the animation when component unmounts
//       return () => {
//         currentAnimation.fadeOut(0.32);
//       };
//     }
//   }, [actions]);

//   useEffect(() => {
//     const skeletonHelper = new SkeletonHelper(scene);
//     scene.add(skeletonHelper);

//     return () => {
//       scene.remove(skeletonHelper);
//     };
//   }, [scene]);

//   return <primitive object={scene} scale={0.5} />;
// };

// const FBXModel = () => {
//   const [fbx, setFbx] = useState<Group<Object3DEventMap> | null>(null);

//   useEffect(() => {
//     const manager = new LoadingManager();
//     // Add handler for TGA textures
//     manager.addHandler(/\.tga$/i, new TGALoader());

//     const loader = new FBXLoader(manager);

//     loader.load(
//       "tifaLady.fbx",
//       (object) => {
//         setFbx(object);
//       },
//       undefined,
//       (error) => {
//         console.error("Error loading FBX:", error);
//       }
//     );
//   }, []);

//   return fbx ? <primitive object={fbx} scale={0.01} /> : null;
// };
