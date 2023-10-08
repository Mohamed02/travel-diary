import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostDetails, updatePostDetail } from '../helpers/helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import TravelExplore from '@mui/icons-material/TravelExplore';

const DiaryUpdate = () => {
    const id = useParams().id;
    const [post,setPost]=useState({
        title:"",
        description:"",
        imageUrl:"",
        location:"",
    });
    const handleChange=(event)=>{
        setPost((prevState)=>{
            return {
                ...prevState,
                [event.target.name]:event.target.value
            }
        })
    }
    const handleSubmit= async (event)=>{
        event.preventDefault();
        const res=await updatePostDetail(id,post).catch(err=>console.log(err));
        console.log(res);
    }
    useEffect(()=>{
        getPostDetails(id).then((data)=>{
            console.log(data);
            if(data.posts){
                setPost((prevState)=>{
                    return {
                        ...prevState,
                        ...data.posts,
                        imageUrl:data.posts.image,
                    }
                })
            }
        
        }).catch((err)=>console.log(err));
        
    },[]);
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
        <TravelExplore sx={{fontSize:'40px',paddingLeft:1,color:"lightcoral"}}/>
        </Box>
        
        <form onSubmit={handleSubmit}>
            <Box padding={10} display={"flex"}
                margin="auto"
                flexDirection={"column"}>
                    <FormLabel  sx={{fontFamily:"quicksand"}} > Title</FormLabel>
                    <TextField  name="title" value={post.title} onChange={handleChange} variant="standard"  margin="normal" />
                    <FormLabel sx={{fontFamily:"quicksand"}} > Description</FormLabel>
                    <TextField  name="description" value={post.description} onChange={handleChange}  variant="standard"  margin="normal"/>
                    <FormLabel sx={{fontFamily:"quicksand"}} > Image</FormLabel>
                    <TextField  name="imageUrl" value={post.imageUrl} onChange={handleChange}   variant="standard" margin="normal"/>
                    <FormLabel sx={{fontFamily:"quicksand"}} > Location</FormLabel>
                    <TextField  name="location" value={post.location} onChange={handleChange}  variant="standard"  margin="normal"/>
                     <Button color="warning" sx={{ width:"50%", margin:"auto", mt: 4, borderRadius:7}} variant='contained' type="submit">Update </Button>
            </Box>
        </form>
    </Box>
  )
}

export default DiaryUpdate