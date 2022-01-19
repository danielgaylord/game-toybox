import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AnimationIcon from '@mui/icons-material/Animation';
import { styled } from '@mui/material/styles';
import { Engine, Render, Bodies, World, Runner } from 'matter-js';

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const IconStyle = {
    fontSize: '5rem',
  };

  const CustomIconButton = styled(IconButton)`
    color: #20b2aa;
    background-color: black;
    top: ${Math.floor((Math.random() * 0.8 - 0.4) * window.innerHeight)}px;
    left: ${Math.floor((Math.random() * 0.8 - 0.4) * window.innerWidth)}px;

    :hover {
        color: #2e8b57;
  }
`;

const MatterTest = () => {
    // Modal functions
    const [open, setOpen] = useState(false);
    const handleOpen = () => {if (!isDragging) setOpen(true);}
    const handleClose = () => setOpen(false);

    const [isDragging, setIsDragging] = useState(false);
    const onDrag = (e) => setIsDragging(true);
    const onStop = (e) => {setTimeout(() => (setIsDragging(false)), 0);}

    const scene = useRef();
    const pieRef = useRef();
    const engine = useRef(Engine.create());

    useEffect(() => {
        const screenW = document.body.clientWidth;
        const screenH = document.body.clientHeight;

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

        const ball = {
            body: Bodies.circle(210, 100, 30),
            elem: pieRef.current,
        };

        World.add(engine.current.world, [
            Bodies.rectangle(screenW / 2, -10, screenW, 20, { isStatic: true }),
            Bodies.rectangle(-10, screenH / 2, 20, screenH, { isStatic: true }),
            Bodies.rectangle(screenW / 2, screenH + 10, screenW, 20, { isStatic: true }),
            Bodies.rectangle(screenW + 10, screenH / 2, 20, screenH, { isStatic: true }),
            ball.body
        ]);

        Runner.run(engine.current);
        Render.run(render);
    }, []);

    return (
        <div>
            <Draggable onDrag={onDrag} onStop={onStop}>
                <CustomIconButton color="primary" variant="outlined" aria-label="pie chart app" component="span" size="large" onClick={handleOpen}>
                    <AnimationIcon sx={IconStyle}/>
                </CustomIconButton>
            </Draggable>
            <Modal open={open} onClose={handleClose} >
                <Box sx={BoxStyle} >
                    <div ref={scene} style={{ width: '100%', height: '100%' }} />
                </Box>
            </Modal>
        </div>
        
    )
};

export default MatterTest;