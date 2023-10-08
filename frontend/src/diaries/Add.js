import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { addPost } from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();
    const [inputs,setInputs]=useState({
        title:"",
        description:"",
        imageUrl:"",
        location:"",
        date:"",

    });
    const handleChange=(event)=>{
        setInputs((prevState)=>{
            return {
                ...prevState,
                [event.target.name]:event.target.value
            }
        });
    }
    const handleSubmit= async (event)=>{
        event.preventDefault();
        const res=await addPost(inputs).catch(err=>console.log(err));
        navigate("/diaries")
        console.log(res);
    }
  return (
    <Box display="flex" 
    flexDirection={"column"}
    width="100%"
    height={"100%"}
    >
        <Box display={"flex"} margin={"auto"} padding={2}>
        <Typography variant='h4' fontFamily={"dancing script"}>
            Add Your Travel Diary
        </Typography>
        <TravelExploreIcon sx={{fontSize:'40px',paddingLeft:1,color:"lightcoral"}}/>
        </Box>
        
        <form onSubmit={handleSubmit}>
            <Box padding={10} display={"flex"}
                margin="auto"
                flexDirection={"column"}>
                    <FormLabel  sx={{fontFamily:"quicksand"}} > Title</FormLabel>
                    <TextField  name="title" value={inputs.title} onChange={handleChange} variant="standard"  margin="normal" />
                    <FormLabel sx={{fontFamily:"quicksand"}} > Description</FormLabel>
                    <TextField  name="description" value={inputs.description} onChange={handleChange}  variant="standard"  margin="normal"/>
                    <FormLabel sx={{fontFamily:"quicksand"}} > Image</FormLabel>
                    <TextField  name="imageUrl" value={inputs.imageUrl} onChange={handleChange}   variant="standard" margin="normal"/>
                    <FormLabel sx={{fontFamily:"quicksand"}} > Location</FormLabel>
                    <TextField  name="location" value={inputs.location} onChange={handleChange}  variant="standard"  margin="normal"/>
                    <FormLabel sx={{fontFamily:"quicksand"}} > Date</FormLabel>
                    <TextField  name="date" value={inputs.date} type="date" onChange={handleChange}  variant="standard"  margin="normal"/>
                    <Button color="warning" sx={{ width:"50%", margin:"auto", mt: 4, borderRadius:7}} variant='contained' type="submit">Post </Button>
            </Box>
        </form>
    </Box>
  )
}

export default Add