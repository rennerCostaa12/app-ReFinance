import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export default function ParticlesBackground() {

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);


    return (

        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fpsLimit: 120,
                fullScreen: true,
                particles: {
                    color: {
                        value: "#fffffd",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 100,
                        enable: true,
                        opacity: 0.5,
                        width: 0.5,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 150,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    size: {
                        value: { min: 0.5, max: 3 },
                    },
                },
            }}
        />

    )
}