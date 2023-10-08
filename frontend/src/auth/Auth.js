import { Button, FormLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { sendAuthRequest } from '../helpers/helpers';
import { authAction } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const [isSignup,setIsSignup]= useState(false);
  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    password:""
  });
  const toggleSignup=()=>{
    setIsSignup(!isSignup);
  };
  const handleSubmit = (event)=>{
    event.preventDefault();

    sendAuthRequest(isSignup,inputs)
    .then((data)=>{
      console.log(data);
      localStorage.setItem('userId',data.id);
      dispatch(authAction.login());
      navigate("/diaries");
    }).then(()=>{
     
    }).catch((err)=>{

    });
  };
  const handleChange=(event)=>{
    setInputs((prevState)=>{
      return {
        ...prevState,
        [event.target.name]:event.target.value,
      }
    })
  }
  return (
    <Box width="40%" 
    borderRadius={10} 
    boxShadow={'5px 5px 10px #ccc'} 
    margin="auto"
    marginTop={10}>
      
    <form onSubmit={handleSubmit}>
      <Box display={"flex"} flexDirection={"column"} width="60%" margin={"auto"}> 
      
      <Typography padding={1} variant="h4" textAlign="center">
      {isSignup?"Signup":"Login"}
      </Typography>
      {isSignup && <><FormLabel>Name</FormLabel>
      <TextField  value ={inputs.name} name="name" margin="normal" onChange={handleChange}> </TextField></>}
      <FormLabel>Email</FormLabel>
      <TextField  value ={inputs.email}  name="email"  type={"email"} margin="normal" onChange={handleChange}> </TextField>
      <FormLabel>Passowrd</FormLabel>
      <TextField value ={inputs.password}   name="password"   margin="normal" onChange={handleChange}>  </TextField>
      <Button type="submit" variant='contained' sx={{mt:2}}>{isSignup?"Signup":"Login"}</Button>

      <Button variant='outlined' 
        onClick={toggleSignup}
        sx={{mt:2,mb:2}}>Change to {isSignup? "Login":"Signup"}
      </Button>
      </Box>
    </form>
    </Box>
  )
}

export default Auth