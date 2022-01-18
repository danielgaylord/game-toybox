import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import PieChartIcon from '@mui/icons-material/PieChart';
import { styled } from '@mui/material/styles';

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
const PieChart = () => {
    // Set up the state variables
    const [image, setImage] = useState(""); // Image

    // Default settings for our form
    const [data, setData] = useState("40,60");  
    const [colors, setColors] = useState("003049,ffcdb2")
    const [wedge, setWedge] = useState(0.05);

    // NB: This URL will changed depending on your release!!!
    const api_base_url = 'http://game-board.herokuapp.com/board/piechart/'

    // Modal functions
    const [open, setOpen] = useState(false);
    const handleOpen = () => {if (!isDragging) setOpen(true);}
    const handleClose = () => setOpen(false);

    const [isDragging, setIsDragging] = useState(false);
    const onDrag = (e) => setIsDragging(true);
    const onStop = (e) => {setTimeout(() => (setIsDragging(false)), 0);}
   
    // Function to fetch the data from our API
    function fetchData(){
        // Set the image to be empty
        setImage('');
        
        // Build up the endpoint to our API
        var url_req_string = api_base_url + "?data=" + data + "&colors=" + colors + "&wedge=" + wedge;
        
        // Fetch the URL and parse the JSON response    
        fetch(url_req_string)
            .then(res => res.json())
            .then((result) => {
                // Set the image to be the API return "message" 
                setImage(result.message);
            }, (error) => {
                console.log(error);
            });
        };

        // The rest of the code that runs the actual render
return (
    <div>
        <Draggable onDrag={onDrag} onStop={onStop}>
            <CustomIconButton color="primary" variant="outlined" aria-label="pie chart app" component="span" size="large" onClick={handleOpen}>
                <PieChartIcon sx={IconStyle}/>
            </CustomIconButton>
        </Draggable>
        <Modal open={open} onClose={handleClose}>
            <Box sx={BoxStyle}>
                <input type="text" id="hf-text" name="hf-text" placeholder="40,60" autoComplete="" value={data} onChange={(event)=> setData(event.target.value)}/>
                <input type="text" id="hf-text" name="hf-text" placeholder="003049,ffcdb2" autoComplete="" value={colors} onChange={(event)=> setColors(event.target.value)}/>
                <input type="text" id="hf-text" name="hf-text" placeholder="0.05" autoComplete="" value={wedge} onChange={(event)=> setWedge(event.target.value)}/>
                <button type="submit" size="sm" color="primary" onClick={() => fetchData()}></button>
                <p>{image}</p>
            </Box>
        </Modal>
    </div>
)};

export default PieChart;