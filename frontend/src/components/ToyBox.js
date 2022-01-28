import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import PieChart from './PieChart';
import TimeClock from './TimeClock';

const ToyBox = () => {
    // References to interact with scene and engine outside of Matter
    const scene = useRef();
    const engine = useRef(Matter.Engine.create());

    useEffect(() => {
        // Get height and width of screen as well as pixel density of device
        const screenW = document.body.clientWidth;
        const screenH = document.body.clientHeight;
        const pixel_ratio = window.devicePixelRatio;

        // Total number of bodies to display (apps and 'dummies')
        const total_bodies = 12;
        const dom_bodies = document.querySelectorAll(".toy");

        // Calculate ratios of bodies and screen, then find total ratio
        const screen_ratio = (screenW * screenH) / (1920 * 1200);
        const bodies_ratio = 16 / total_bodies;
        const total_ratio = bodies_ratio * screen_ratio * pixel_ratio

        // Create a Matter Render using the screen dimensions
        const render = Matter.Render.create({
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
        for (var x = 0; x < dom_bodies.length; x++) {
            var toy_body
            if (dom_bodies[x].classList.contains('round')) {
                var x_pos = Math.random() * screenW;
                var y_pos = Math.random() * screenH;
                toy_body = Matter.Bodies.circle(x_pos, y_pos, 100);
                dom_bodies[x].style.top = y_pos + "px";
                dom_bodies[x].style.left = x_pos + "px";
            }
            dom_bodies[x].id = toy_body.id
            bodies.push(toy_body)
        }

        // Randomly create additional bodies up to total_bodies and add bodies to the world
        const remain_bodies = total_bodies - bodies.length;
        for (x = 0; x < remain_bodies; x++) {
            const type = Math.floor(Math.random() * 3);
            var dummy_body = null;
            switch(type) {
                case 0:
                    dummy_body = Matter.Bodies.circle(Math.random() * screenW, Math.random() * screenH, 100);
                    break;
                case 1:
                    dummy_body = Matter.Bodies.rectangle(Math.random() * screenW, Math.random() * screenH, 200, 200);
                    break;
                case 2:
                    dummy_body = Matter.Bodies.rectangle(Math.random() * screenW, Math.random() * screenH, 150, 300);
                    break;
                default:
                    break;
            }
            bodies.push(dummy_body);
        }
        Matter.Composite.add(engine.current.world, bodies);

        // Scale all bodies based on number of bodies, screen size, and pixel density
        for (const body in bodies) {
            Matter.Body.scale(bodies[body], total_ratio, total_ratio);
        }

        // Create a Matter Composite for the 'walls' of the screen and add to the world
        const walls = Matter.Body.create({
            parts: [
                Matter.Bodies.rectangle(0, -10, screenW * 2, 40, { isStatic: true }),
                Matter.Bodies.rectangle(0, screenH + 10, screenW * 2, 40, { isStatic: true }),
                Matter.Bodies.rectangle(-10, 0, 40, screenH * 2, { isStatic: true }),
                Matter.Bodies.rectangle(screenW + 10, 0, 40, screenH * 2, { isStatic: true }),
            ],
            isStatic: true
        })
        Matter.Composite.add(engine.current.world, walls);

        // Add ability to interact with world with the mouse
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine.current, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        render.mouse = mouse;
        Matter.Composite.add(engine.current.world, mouseConstraint);

        Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
            //const touched = Matter.Query.point(bodies, event.mouse.position);

            //touched[0].angle += 10;
        })

        // Run the engine and render it
        Matter.Render.run(render);
        const interval = setInterval(() => {
            for (var x = 0; x < dom_bodies.length; x++) {
                var body_d = dom_bodies[x];
                var body = null;
                for (var y = 0; y < bodies.length; y++) {
                    if (bodies[y].id == body_d.id) {
                        body = bodies[y];
                        break;
                    }
                }
                if (body === null) continue;

                body_d.style.transform = ""
                body_d.style.top = (body.position.y - body_d.offsetHeight / 2) + "px";
                body_d.style.left = (body.position.x - body_d.offsetWidth / 2) + "px";
                body_d.style.transform += "rotate(" + body.angle + "rad)";
            }
            Matter.Engine.update(engine.current, 1000 / 60);
        }, 1000 / 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div ref={scene} style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
                <PieChart />
                <TimeClock />
            </div>
        </>
    )
};

export default ToyBox;