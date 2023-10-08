import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../helpers/helpers';
import DiaryItem from './DiaryItem'

const Diaries = (props) => {
    const [posts,setPosts]=useState([]);

  useEffect(()=>{
    getAllPosts().then((data)=>{
        setPosts(data?.posts);

    }).catch((error)=>{
        console.log(error);
    });

  },[]);

  return (
    <Box display={"flex"}
    flexDirection="column"
    padding={3}
    justifyContent="center"
    alignItems={"center"}>
       {posts?.map((item,index)=>(
        <DiaryItem 
        {...item} 
        date={new Date(`${item.date}`).toLocaleDateString()} 
        key={index}/>
        ))}
    </Box>
  )
}

export default Diaries