import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Clouds, Cloud } from '@react-three/drei'
import * as THREE from 'three'

function FogContent() {
    const group = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (group.current) {
            // Slow continuous drift to the left (wind direction)
            group.current.position.x -= delta * 0.15
            // Seamless loop: when group moves too far left, reset to right
            // We use a large bounds range so the reset effectively cycles the clouds
            if (group.current.position.x < -25) {
                group.current.position.x = 10
            }
        }
    })

    return (
        <group ref={group}>
            <ambientLight intensity={0.5} />
            <Clouds limit={200} range={200} material={THREE.MeshLambertMaterial}>
                <Cloud
                    seed={10}
                    bounds={[20, 6, 12]}
                    volume={15}
                    color="#e7e6f0"
                    fade={60}
                    opacity={0.35}
                    position={[0, -3, -5]}
                    speed={0.1} // Internal wobble
                />
                <Cloud
                    seed={20}
                    bounds={[20, 6, 12]}
                    volume={12}
                    color="#e7e6f0"
                    fade={60}
                    opacity={0.25}
                    position={[15, 3, -10]}
                    speed={0.08}
                />
            </Clouds>
        </group>
    )
}

export const FogScene = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true }}>
                <FogContent />
            </Canvas>
        </div>
    )
}
