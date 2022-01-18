import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { styled } from '@mui/material/styles';
import GadotEngine from '../assets/godot-tutorial/FirstGadotGame'

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

const GadotCanvas = styled.div`
    touch-action: none;
    margin: 0;
    border: 0 none;
    padding: 0;
    text-align: center;
    background-color: black;

    #canvas {
        display: block;
        margin: 0;
        color: white;
    }

    #canvas:focus {
        outline: none;
    }

    .godot {
        font-family: 'Noto Sans', 'Droid Sans', Arial, sans-serif;
        color: #e0e0e0;
        background-color: #3b3943;
        background-image: linear-gradient(to bottom, #403e48, #35333c);
        border: 1px solid #45434e;
        box-shadow: 0 0 1px 1px #2f2d35;
    }

    /* Status display
        * ============== */

    #status {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        /* don't consume click events - make children visible explicitly */
        visibility: hidden;
    }

    #status-progress {
        width: 366px;
        height: 7px;
        background-color: #38363A;
        border: 1px solid #444246;
        padding: 1px;
        box-shadow: 0 0 2px 1px #1B1C22;
        border-radius: 2px;
        visibility: visible;
    }

    @media only screen and (orientation:portrait) {
        #status-progress {
            width: 61.8%;
        }
    }

    #status-progress-inner {
        height: 100%;
        width: 0;
        box-sizing: border-box;
        transition: width 0.5s linear;
        background-color: #202020;
        border: 1px solid #222223;
        box-shadow: 0 0 1px 1px #27282E;
        border-radius: 3px;
    }

    #status-indeterminate {
        visibility: visible;
        position: relative;
    }

    #status-indeterminate > div {
        width: 4.5px;
        height: 0;
        border-style: solid;
        border-width: 9px 3px 0 3px;
        border-color: #2b2b2b transparent transparent transparent;
        transform-origin: center 21px;
        position: absolute;
    }

    #status-indeterminate > div:nth-child(1) { transform: rotate( 22.5deg); }
    #status-indeterminate > div:nth-child(2) { transform: rotate( 67.5deg); }
    #status-indeterminate > div:nth-child(3) { transform: rotate(112.5deg); }
    #status-indeterminate > div:nth-child(4) { transform: rotate(157.5deg); }
    #status-indeterminate > div:nth-child(5) { transform: rotate(202.5deg); }
    #status-indeterminate > div:nth-child(6) { transform: rotate(247.5deg); }
    #status-indeterminate > div:nth-child(7) { transform: rotate(292.5deg); }
    #status-indeterminate > div:nth-child(8) { transform: rotate(337.5deg); }

    #status-notice {
        margin: 0 100px;
        line-height: 1.3;
        visibility: visible;
        padding: 4px 6px;
        visibility: visible;
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
            <CustomIconButton color="primary" variant="outlined" aria-label="godot tutorial app" component="span" size="large" onClick={handleOpen}>
                <SmartToyIcon sx={IconStyle}/>
            </CustomIconButton>
        </Draggable>
        <Modal open={open} onClose={handleClose}>
            <Box sx={BoxStyle}>
                <GadotCanvas>
                    <canvas id='canvas'>
                        HTML5 canvas appears to be unsupported in the current browser.<br />
                        Please try updating or use a different browser.
                    </canvas>
                    <div id='status'>
                        <div id='status-progress' style={{display: 'none'}} oncontextmenu='event.preventDefault();'>
                            <div id ='status-progress-inner'></div>
                        </div>
                        <div id='status-indeterminate' style={{display: 'none'}} oncontextmenu='event.preventDefault();'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div id='status-notice' class='godot' style={{display: 'none'}}></div>
                    </div>
                </GadotCanvas>
            </Box>
        </Modal>
    </div>
)};

export default GodotTutorial;