import React, { useState } from 'react';
import { Button, IconButton, Modal, Box } from '@mui/material';
import TimeClockIcon from '../assets/images/clock-icon.png';
import { styled } from '@mui/material/styles';

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const CustomIconButton = styled(IconButton)`
    color: #20b2aa;
    background-color: black;

    :hover {
        color: #2e8b57;
  }
`;

const TimeClock = () => {
    const [time, setTime] = useState("");

    const [start, setStart] = useState();  
    const [end, setEnd] = useState()

    const api_base_url = window.location.href + "board/timeclock/"

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
    function fetchData(){
        setTime('');
        
        var url_req_string = api_base_url + "?start=" + start + "&end=" + end;  
        fetch(url_req_string)
            .then(res => res.json())
            .then((result) => {
                setTime(result.time);
            }, (error) => {
                console.log(error);
            });
        };

return (
    <div className="toy round" style={{position: 'absolute'}}>
        <CustomIconButton color="primary" variant="outlined" aria-label="pie chart app" component="span" size="large" onClick={handleOpen}>
            <img src={TimeClockIcon} alt="clock icon" />
        </CustomIconButton>
        <Modal open={open} onClose={handleClose}>
            <Box sx={BoxStyle}>
                <p>It is now {time}.</p>
                <Button size="medium" variant="contained" onClick={() => fetchData()}>Get Current Time!</Button>
            </Box>
        </Modal>
    </div>
)};

export default TimeClock;