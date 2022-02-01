import React, { useState } from 'react';
import { Button, IconButton, Modal, Box, Stack, Typography, Switch, TextField } from '@mui/material';
import SudokuIcon from '../assets/images/pydoku-icon.png';
import { styled } from '@mui/material/styles';

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CustomIconButton = styled(IconButton)`
    :hover {
        transform: 'scale(2)',
    }
`;

const Sudoku = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

return (
    <div className="toy square" style={{position: 'absolute'}}>
        <CustomIconButton aria-label="sudoku app" onClick={handleOpen}>
            <img src={SudokuIcon} alt="sudoku icon" />
        </CustomIconButton>
        <Modal open={open} onClose={handleClose}>
            <Box sx={BoxStyle}>
            </Box>
        </Modal>
    </div>
)};

export default Sudoku;