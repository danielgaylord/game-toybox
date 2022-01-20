import React, { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, Body, World, Runner, Composite, Mouse, MouseConstraint } from 'matter-js';

const ToyBox = () => {
    // References to interact with scene and engine outside of Matter
    const scene = useRef();
    const engine = useRef(Engine.create());

    useEffect(() => {
        // Get height and width of screen as well as pixel density of device
        const screenW = document.body.clientWidth;
        const screenH = document.body.clientHeight;
        const pixel_ratio = window.devicePixelRatio;

        // Total number of bodies to display (apps and 'dummies')
        const total_bodies = 12;

        // Calculate ratios of bodies and screen, then find total ratio
        const screen_ratio = (screenW * screenH) / (1920 * 1200);
        const bodies_ratio = 16 / total_bodies;
        const total_ratio = bodies_ratio * screen_ratio * pixel_ratio

        // Create a Matter Render using the screen dimensions
        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: screenW,
                height: screenH,
                wireframes: false,
                background: 'transparent'
            },
        });

        // Create an array of bodies and add app bodies
        var bodies = []
        const ball1 = Bodies.circle(Math.random() * screenW, Math.random() * screenH, 100);
        const ball2 = Bodies.circle(Math.random() * screenW, Math.random() * screenH, 100);
        const ball3 = Bodies.circle(Math.random() * screenW, Math.random() * screenH, 100);
        const ball4 = Bodies.circle(Math.random() * screenW, Math.random() * screenH, 100);
        bodies.push(ball1, ball2, ball3, ball4)

        // Randomly create additional bodies up to total_bodies and add bodies to the world
        const remain_bodies = total_bodies - bodies.length;
        for (var x = 0; x < remain_bodies; x++) {
            const type = Math.floor(Math.random() * 3);
            var dummy_body = null;
            switch(type) {
                case 0:
                    dummy_body = Bodies.circle(Math.random() * screenW, Math.random() * screenH, 100);
                    break;
                case 1:
                    dummy_body = Bodies.rectangle(Math.random() * screenW, Math.random() * screenH, 200, 200);
                    break;
                case 2:
                    dummy_body = Bodies.rectangle(Math.random() * screenW, Math.random() * screenH, 150, 300);
                    break;
                default:
                    break;
            }
            bodies.push(dummy_body);
        }
        World.add(engine.current.world, bodies);

        // Scale all bodies based on number of bodies, screen size, and pixel density
        for (const body in bodies) {
            Body.scale(bodies[body], total_ratio, total_ratio);
        }

        // Create a Matter Composite for the 'walls' of the screen and add to the world
        const walls = Composite.create();
        Composite.add(walls, [
            Bodies.rectangle(0, 0, screenW * 2, 20, { isStatic: true }),
            Bodies.rectangle(0, screenH, screenW * 2, 20, { isStatic: true }),
            Bodies.rectangle(0, 0, 20, screenH * 2, { isStatic: true }),
            Bodies.rectangle(screenW , 0, 20, screenH * 2, { isStatic: true }),
        ])
        World.add(engine.current.world, walls);

        // Add ability to interact with world with the mouse
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine.current, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        render.mouse = mouse;
        World.add(engine.current.world, mouseConstraint);

        // Run the engine and render it
        Runner.run(engine.current);
        Render.run(render);
    }, []);

    return (
        <div ref={scene} style={{ width: '100%', height: '100%', overflow: 'hidden'}} />      
    )
};

export default ToyBox;