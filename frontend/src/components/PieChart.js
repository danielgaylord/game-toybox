import React, { useState } from 'react';
import { TextField, Button, IconButton, Modal, Box } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
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

  const IconStyle = {
    fontSize: '128px',
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
    const [html, setHtml] = useState(""); // Graph

    // Default settings for our form
    const [data, setData] = useState("40,60");  
    const [colors, setColors] = useState("003049,ffcdb2")
    const [wedge, setWedge] = useState(0.05);

    // NB: This URL will changed depending on your release!!!
    const api_base_url = window.location.href + "board/piechart/"

    // Modal functions
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
    // Function to fetch the data from our API
    function fetchData(){
        // Set the image to be empty
        setHtml('');
        
        // Build up the endpoint to our API
        var url_req_string = api_base_url + "?data=" + data + "&colors=" + colors + "&wedge=" + wedge;
        // Fetch the URL and parse the JSON response    
        fetch(url_req_string)
            .then(res => res.json())
            .then((result) => {
                // Set the image to be the API return "message"
                setHtml(result.html);
            }, (error) => {
                console.log(error);
            });
        };

return (
    <div className="toy round" style={{position: 'absolute'}}>
        <CustomIconButton color="primary" variant="outlined" aria-label="pie chart app" component="span" size="large" onClick={handleOpen}>
            <PieChartIcon sx={IconStyle}/>
        </CustomIconButton>
        <Modal open={open} onClose={handleClose}>
            <Box sx={BoxStyle}>
                <div dangerouslySetInnerHTML={{__html: html}} />
                <TextField id="pie-data" variant="outlined" label="Data Slices" size="small" defaultValue="40,60" helperText="Values seperated by commas totaling 100" value={data} onChange={(event)=> setData(event.target.value)}/>
                <TextField id="pie-colors" variant="outlined" label="Slice Colors" size="small" defaultValue="003049,ffcdb2" helperText="6-digit hexadecimal values seperated by commas" value={colors} onChange={(event)=> setColors(event.target.value)}/>
                <TextField id="pie-wedge" variant="outlined" label="Wedge Size" size="small" defaultValue="0.05" value={wedge} onChange={(event)=> setWedge(event.target.value)}/>
                <Button size="medium" variant="contained" onClick={() => fetchData()}>Submit</Button>
            </Box>
        </Modal>
    </div>
)};

export default PieChart;