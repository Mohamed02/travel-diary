import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Snackbar, Typography } from '@mui/material';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { deletePost } from '../helpers/helpers';

const DiaryItem = ({title,description,image,location,date,_id,user}) => {
  const isLoggedInUser=()=> localStorage.getItem("userId")===user;
  const [open,setOpen]=useState(false);
  const handleDeletePost=async()=>{
    deletePost(_id);
    setOpen(true);
  }
  return (
    <Card sx={{ width:"50%",
    margin:1,
    padding:1,
    display:"flex",
    flexDirection:"column",
    boxShadow:"5px 5px 5px #cccc"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {user.name && user.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <EditLocationIcon />
          </IconButton>
        }
        title={location}
        header={location}
        subheader={date}
      />
      <img
        height="194"
        src={image}
        alt={title}
      />
      <CardContent>
        <Typography paddingBottom={1} variant="h6" color="text.secondary">
          {title}
        </Typography>
        <hr />
        <Box display={"flex"} paddingTop={1} >
            <Typography fontWeight={"bold"} variant={"caption"}> {user.name}: </Typography>
            <Typography variant="body2" color="text.secondary">
            {description}
            </Typography>
        </Box>
      </CardContent>
      {isLoggedInUser() && 
      <CardActions sx={{ml:"auto"}}>
        <IconButton LinkComponent={Link} to={`/post/${_id}`}><EditIcon color='warning'/></IconButton>
        <IconButton onClick={handleDeletePost}><DeleteOutlineIcon color='error'/></IconButton>
      </CardActions>
      }
      <Snackbar open={open} autoHideDuration={6000} 
        onClose={()=>setOpen(false)}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default DiaryItem