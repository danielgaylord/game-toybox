import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { styled } from '@mui/material/styles';
import ReactGodot from 'react-godot';

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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

    :hover {
        color: #2e8b57;
  }
`;

// Define the function (functional components not classes)
const GodotTutorial = () => {
    // Modal functions
    const [open, setOpen] = useState(false);
    const handleOpen = () => {if (!isDragging) setOpen(true);}
    const handleClose = () => setOpen(false);

    const [isDragging, setIsDragging] = useState(false);
    const onDrag = (e) => setIsDragging(true);
    const onStop = (e) => {setTimeout(() => (setIsDragging(false)), 0);}

return (
    <div>
        <Draggable onDrag={onDrag} onStop={onStop}>
        <CustomIconButton color="primary" variant="outlined" aria-label="pie chart app" component="span" size="large" onClick={handleOpen}>
            <SmartToyIcon sx={IconStyle}/>
        </CustomIconButton>
        </Draggable>
        <Modal open={open} onClose={handleClose}>
            <Box sx={BoxStyle}>
                {/*<ReactGodot script='../assets/godot-tutorial/First Gadot Game.js' pck='../assets/godot-tutorial/First Gadot Game.pck' />*/}
                {/*<a href="frontend\src\assets\godot-tutorial\First Gadot Game.html">Link</a>*/}
            </Box>
        </Modal>
    </div>
)};

export default GodotTutorial;