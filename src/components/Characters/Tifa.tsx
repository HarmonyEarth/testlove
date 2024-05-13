import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import {
  AnimationMixer,
  Color,
  MeshPhysicalMaterial,
  Object3D,
  SkeletonHelper,
  SkinnedMesh,
} from "three";
import { colorAtom } from "../../constants";

const Tifa = () => {
  const { scene } = useGLTF("/TifaGLTF/tifaBase.glb");
  const { animations } = useGLTF("/TifaGLTF/tifaIdle.glb");
  const mixerRef = useRef<AnimationMixer | null>(null);

  const [{ r, g, b }] = useAtom(colorAtom);

  console.log("TifaModel", scene);

  useEffect(() => {
    // Function to traverse the scene graph and find the hair mesh
    const findHairMesh = (object: Object3D): SkinnedMesh | null => {
      if (
        object instanceof SkinnedMesh &&
        object.name.includes("25_hair_02_0_0")
      ) {
        return object;
      }

      // Recursively search through children
      for (const child of object.children) {
        const hairMesh = findHairMesh(child);
        if (hairMesh) return hairMesh;
      }

      return null;
    };

    // Find the hair mesh
    const hairMesh = findHairMesh(scene);

    if (hairMesh) {
      console.log("Hair material:", hairMesh.material);
      if (hairMesh.material instanceof MeshPhysicalMaterial) {
        hairMesh.material.color = new Color(r, g, b);
        // hairMesh.material.wireframe = true;
      }
    }
  }, [scene, r, g, b]);

  useEffect(() => {
    // Function to traverse the scene graph and find the gloves mesh
    const findGlovesMesh = (object: Object3D): SkinnedMesh | null => {
      if (
        object instanceof SkinnedMesh &&
        object.name.includes("24_+Leather_Glovesa_02_0_0")
      ) {
        return object;
      }

      // Recursively search through children
      for (const child of object.children) {
        const glovesMesh = findGlovesMesh(child);
        if (glovesMesh) return glovesMesh;
      }

      return null;
    };

    // Find the gloves mesh
    const glovesMesh = findGlovesMesh(scene);

    if (glovesMesh) {
      console.log("Gloves material:", glovesMesh.material);

      if (glovesMesh.material instanceof MeshPhysicalMaterial) {
        glovesMesh.material.color = new Color(43, 63, 212);
      }
    }
  }, [scene]);

  useEffect(() => {
    const mixer = new AnimationMixer(scene);
    mixerRef.current = mixer;

    const idleAction = mixer.clipAction(animations[0]);
    idleAction.play();

    return () => {
      mixer.stopAllAction();
    };
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  useEffect(() => {
    const skeletonHelper = new SkeletonHelper(scene);
    scene.add(skeletonHelper);

    return () => {
      scene.remove(skeletonHelper);
    };
  }, [scene]);

  return (
    <>
      <primitive object={scene} scale={1} />
    </>
  );
};
export default Tifa;
