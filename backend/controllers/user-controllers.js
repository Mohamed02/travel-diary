import User from "../models/User";
import { compareSync, hashSync } from "bcryptjs";
export const getAllUsers = async (req,res)=>{

    let users;
    try {
        users= await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(500).json({message:"Unexpected Error occurred"})
    }
    return res.status(200).json({users});
};

export const getUserById= async(req,res)=>{
    const id=req.params.id;
    let user;
    try {
        user = await User.findById(id).populate("posts");
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({user});
};

export const signup = async(req, res)=>{
    console.log(req);
    const {name,email,password} = req.body;
    if(!name && name.trim()==""
        && !email && email.trim()==""
        && !password && password.length<6
    ){
        return res.send(422).json({message:"invalid data"})
    }
    let user;
    try{
        const hashedPassword= hashSync(password);
        user= new User({name,email,password:hashedPassword});
        await user.save();
    }catch(err){
        return console.log(err);
    
    }
    if(!user){
        return res.status(500).json({message:"Unexpected Error Occurred"});
    }
    
    return res.status(201).json({user});

}
export const login = async (req,res) => {
    const {email,password}=req.body;
    if(!email && email.trim()==""
    && !password && password.length<6
    ){
    return res.send(422).json({message:"invalid data"})
    }
    let existingUser;
    try{
        existingUser= await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"No User Found"});
        }
        const isPasswordCorrect= compareSync(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect Password"});
        }
        return res.status(200).json({id:existingUser.id, message:"Login Successfull"});
    }catch(err){
        return console.log(err)
    }
}