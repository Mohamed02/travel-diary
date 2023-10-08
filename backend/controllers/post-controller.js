import mongoose from "mongoose";
import Post from "../models/Post";
import User from "../models/User";
 
export const getPost= async(req,res)=>{
    let posts;
    
    try {
        const postId=req.params.id;
        if(postId){
            posts= await Post.findById(postId).populate("user");
        }else{

        console.log("postId*****",postId);
            posts= await Post.find().populate("user");
        }
        
    } catch (error) {
        return console.log(error);
        
    }
    if(!posts) return res.status(401).json({message:"no posts found"});


    return res.status(200).json({posts});
}

export const addPost = async(req,res) => {
    const {title,description,image,location,date,user} = req.body;

    if(!title && title ==""
     && !description && description ==""
     && !image && image ==""
     && !location && location ==""
     && !date
     && !user ) {
        return res.status(422).json({message:"Invalid Data"})
     }

    let existingUser;
    try {
        existingUser=await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser) return res.status(404).json({message:"User not found"});
    let post;
    try {
        post= new Post({
            title,
            description,
            image,
            location,
            date: new Date(`${date}`),
            user
        });
        existingUser.posts.push(post);
        /** here we are updating both User and Post. though it is single unit of transaction they are saved as two seperate steps.
         * . If one of the steps fails that result in incomplete transaction and results in inconsitencies. hence we have to use 
         * mongoose session and transaction to achieve this in single step. And as the mongose transaction in supported in replica 
         * set of clusters, and we are using a standalone Mongo, we are not using the session transactions here
         */
        existingUser.save();
        console.log("1. session started");
        post.user=existingUser._id;
        post = await post.save();

    } catch (error) {
        return console.log(error);
    }
    if(!post){
        return res.status(500).json({message:"Internal error occured"})
    }
    
    return res.status(201).json({message:"Post Created Successfully", id:post.id});
}
export const updatePost= async(req,res)=>{
    const id= req.params.id;
    const {title,description,image,location,date} = req.body;
    if(!title && title ==""
    && !description && description ==""
    && !image && image ==""
    && !location && location ==""
    && !date ) {
       return res.status(422).json({message:"Invalid Data"})
    }
    let post;
    try {
        post = await Post.findByIdAndUpdate(id,{
            title,description,image,location,date:new Date(`${date}`)
        });
    } catch (error) {
        return console.log(error);
    }
    if(!post) return res.status(500).json({message:"Unable to update"})
    return res.status(200).json({message:"Updated Succesfully"})
}

export const deletePost=async(req,res)=>{
    const id=req.params.id;
    let post;
    try {
        post = await Post.findById(id).populate("user");
        // console.log("User Name",post.user.name);
        post.user.posts.pull(post);
        await post.user.save();
        post= await Post.findByIdAndDelete(id);
    } catch (error) {
        return console.log(error)
    }
    if(!post) return res.status(500).json({message:"unable to delete"}); 
    return res.status(200).json({message:"Post delted successfully"});

}