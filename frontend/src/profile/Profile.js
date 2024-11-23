import React, { useEffect, useState } from 'react'
import { getUserDetails, sendAuthRequest } from '../helpers/helpers'
import { Box, Button, Typography } from '@mui/material';
import DiaryItem from '../diaries/DiaryItem';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",
    email:""
  });
  const handleLogout=async()=>{
    localStorage.removeItem("userId");
     dispatch(authAction.logout());
     navigate('/');
  }
  useEffect(()=>{
    getUserDetails().then((data)=>{
      console.log("**** data value",data);
      setUser((prevState)=>{
      return {...data?.user}
      })
    }).catch((err)=>console.log(err));
  },[])
  return (
   <Box display={"flex"} flexDirection={"column"}>
    <Typography textAlign={'center'} variant='h3' fontFamily={"quicksand"} padding={2}>
      User Profile
    </Typography>
    <Typography textAlign={'left'}  fontFamily={"quicksand"} padding={1}>
      Name: {user.name}
    </Typography>

    <Typography textAlign={'left'}  fontFamily={"quicksand"} padding={1}>
      Email: {user.email}
    </Typography>
    <Button sx={{mr:'auto', width:"15%"}} variant='contained' color="warning" onClick={handleLogout}> Logout</Button>
    {/* <Box display={"flex"} flexDirection={"Column"} justifyContent={"center"}
    alignItems={"center"}>
      {user.posts?.map((post, index)=><DiaryItem key={index} image={post.image} title={post.title} date={post.date} location={post.location} description={post.description} id={post.id} user={user._id}/>)}
    </Box> */}
   </Box>
  )
}

export default Profile