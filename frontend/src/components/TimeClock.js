import React, { useState } from 'react';
import { Button, IconButton, Modal, Box, Stack, Typography, Switch, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
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
    :hover {
        transform: 'scale(2)',
    }
`;

const TimeClock = () => {
    const [time, setTime] = useState("");

    const [start, setStart] = useState(new Date());  
    const [end, setEnd] = useState(new Date())
    const handleStart = (newStart) => setStart(newStart);
    const handleEnd = (newEnd) => setEnd(newEnd);

    const api_base_url = window.location.href + "board/"

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [func, setFunc] = useState(true);
    const functionSwitch = () => {
        setTime("");
        setFunc(!func);
    }
   
    function fetchData(page){
        setTime('');
        
        var url_req_string = api_base_url + page + "?start=" + start.toUTCString() + "&end=" + end.toUTCString();  
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
        <CustomIconButton aria-label="time clock app" onClick={handleOpen}>
            <img src={TimeClockIcon} alt="clock icon" />
        </CustomIconButton>
        <Modal open={open} onClose={handleClose}>
            <Box sx={BoxStyle}>
                <Stack direction="column" alignItems="center" spacing={3}>
                    <Stack direction="row" alignItems="center" spacing={0} onChange={functionSwitch}>
                        <Typography>Now</Typography>
                        <Switch />
                        <Typography>Difference</Typography>
                    </Stack>
                    {func ? 
                        <Stack direction="column" alignItems="center" spacing={3}>
                            <Button size="medium" variant="contained" onClick={() => fetchData("timeclock/")}>Get Current Time!</Button>
                            <Typography>It is now {time}</Typography>
                        </Stack>
                    : null}
                    {func ? 
                        null :
                        <Stack direction="column" alignItems="center" spacing={3}>
                            <Button size="medium" variant="contained" onClick={() => fetchData("timeclockdiff/")}>Get Time Difference!</Button> 
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <DateTimePicker label="Start Time" value={start} onChange={handleStart} renderInput={(params) => <TextField {...params} />}/>
                                    <DateTimePicker label="End Time" value={end} onChange={handleEnd} renderInput={(params) => <TextField {...params} />}/>
                                </LocalizationProvider>
                            </Stack>
                            <Typography>The dates are {time[0]} days, {time[1]} hours, {time[2]} minutes, and {time[3]} seconds apart</Typography>
                        </Stack>
                    }
                </Stack>
            </Box>
        </Modal>
    </div>
)};

export default TimeClock;