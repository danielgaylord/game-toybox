import React, { useState } from 'react';

// Define the function (functional components not classes)
const PieChart = () => {
    // Set up the state variables
    const [downloadLink, setDownloadLink] = useState(""); // Image

    // Default settings for our form
    const [data, setData] = useState("40,60");  
    const [colors, setColors] = useState("003049,ffcdb2")
    const [wedge, setWedge] = useState(0.05);

    // NB: This URL will changed depending on your release!!!
    const api_base_url = 'http://game-board.herokuapp.com/board/piechart/'
   
    // Function to fetch the data from our API
    function fetchData(){
        // Set the image to be empty
        setDownloadLink('');
        
        // Build up the endpoint to our API
        var url_req_string = api_base_url + "?data=" + data + "&colors=" + colors + "&wedge=" + wedge;
        
        // Fetch the URL and parse the JSON response    
        fetch(url_req_string)
            .then(res => res.json())
            .then((result) => {
                // Set the image to be the API return "message" 
                setDownloadLink(result.message);
            }, (error) => {
                console.log(error);
            });
        };

        // The rest of the code that runs the actual render
return (
    <>
        <input type="text" id="hf-text" name="hf-text" placeholder="40,60" autoComplete="" value={data} onChange={(event)=> setData(event.target.value)}/>
        <input type="text" id="hf-text" name="hf-text" placeholder="003049,ffcdb2" autoComplete="" value={colors} onChange={(event)=> setColors(event.target.value)}/>
        <input type="text" id="hf-text" name="hf-text" placeholder="0.05" autoComplete="" value={wedge} onChange={(event)=> setWedge(event.target.value)}/>
        <button type="submit" size="sm" color="primary" onClick={() => fetchData()}></button>
    </>
)};

export default PieChart;