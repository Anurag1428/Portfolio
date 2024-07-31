import { OrbitControls } from '@react-three/drei'
import { Stars } from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import Lights from './Lights.jsx'
import Level from './Level.js'
import { useEffect } from 'react'
import Player from './Player.jsx'

export default function Experience()
{
    useEffect(() => {
        console.log('Stars component mounted');
    }, []);

    return <>

        <Perf position = "top-left"/>

        <OrbitControls makeDefault />
        <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
        />

        <Lights />

        <Physics  >
            <RigidBody type= "kinematicPosition">
            <Level  />
            <Player position={[0, 1, 0]}/>
            </RigidBody>
        </Physics>


    </>
}