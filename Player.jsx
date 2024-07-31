
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useFrame, useLoader } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { useState ,useEffect ,useRef } from 'react'
import * as THREE from 'three'

export default function Player()
{

    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    const jump = () =>
    {
        body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
    }

    useEffect(() => 
    {
        subscribeKeys(
            (state) =>  state.jump,
            (value) =>
            {
                if(value)
                    jump()
                }
        )
    }, [])

    useFrame((state, delta) => 
    {
        const { forward, backward, leftward, rightward } = getKeys()


        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if(forward)
            {
                impulse.z -= impulseStrength
                torque.x -= torqueStrength
            }

            if(rightward)
                {
                    impulse.x += impulseStrength
                    torque.z -= torqueStrength
                }
            
                if(backward)
                {
                    impulse.z += impulseStrength
                    torque.x += torqueStrength
                }
                
                if(leftward)
                {
                    impulse.x -= impulseStrength
                    torque.z += torqueStrength
                }
    

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        /**
         * Camera
         */

        const bodyPosition = body.current.translation()

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25


        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

    })

    // const model = useLoader(GLTFLoader, '/Soldier (1).glb')

    return <>
    <RigidBody 
    ref={ body } 
    canSleep = { false } 
    colliders = 'ball' 
    restitution={ 0.2 } 
    friction={ 1 } 
    linearDamping={ 0.5}
    angularDamping={ 0.5 }
    position={ [ 0, 1, 0 ]}
    >
        <mesh castShadow>
                {/* <primitive object={model.scene} scale = { 1} /> */}
                <icosahedronGeometry args={ [ 0.3, 1 ] } />
                <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
    </RigidBody>
    </>
}