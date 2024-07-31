import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "slategray" });

function BlockStart({ position = [0, 0, 0] }) {
  return (

    <group position={position}>
     {/* <RigidBody type="kinematicPosition"> */}
      <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[7.5, 0.2, 7.5]} receiveShadow />
    {/* </RigidBody> */}
    </group>
  
  );
}

function BlockRight({ position = [0, 0, 0] }) {
  return (

    <group position={position}>
      <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
    </group>
  
  );
}

function BlockLeft({ position = [0, 0, 0] }) {
  return (

    <group position={position}>
      <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
    </group>
  
  );
}

function BlockAhead({ position = [0, 0, 0] }) {
  return (

    <group position={position}>
      <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[10, 0.2, 10]} receiveShadow />
    </group>
  
  );
}

function BlockRightAhead({ position = [0, 0, 0] }) {
  return (

    <group position={position}>
      <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[7.5, 0.2, 10]} receiveShadow />
    </group>
  
  );
}

function BlockLeftAhead({ position = [0, 0, 0] }) {
  return (

    <group position={position}>
      <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[7.5, 0.2, 10]} receiveShadow />
    </group>
    
  );
}

export default function Level() {
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      <BlockRight position={[-7.25, 0, 3.5]} />
      <BlockLeft position={[7.25, 0, 3.5]} />
      <BlockAhead position={[0, 0, -12.5]} />
      <BlockLeftAhead position={[11.25, 0, -7]} />
      <BlockRightAhead position={[-11.25, 0, -7]} />
  
    </>
  );
}
