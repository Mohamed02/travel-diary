import axios from 'axios';
export const getAllPosts= async ()=>{
    const res= await axios.get('http://localhost:5000/post');
    if(res.status!==200){
        return console.log("Some Error Occurred");
    }
    const data = res.data;
    return data;
}
export const sendAuthRequest=async (signup,data) => {
   
        try {
            const res = await axios.post(`user/${signup? "signup" : "login"}`,{
                name: data.name?data.name:"",
                email: data.email,
                password: data.password,
            });
            if(res.status ===200 || res.status ===201){
                const resData= await res.data;
                console.log("resData",res);
                return resData;
            }

           
            
        } catch (error) {
            
        }
}

export const addPost=async(data)=>{
    try {

        const res= await axios.post(`/post`,{
            ...data,
            image:data.imageUrl,
            user:localStorage.getItem('userId')
        });
       
        if(res.status ===200 || res.status ===201){
            const resData= await res.data;
            return resData;
        }
        
    } catch (error) {
        console.log("Error Occurred***");
    }
   
}
export const getPostDetails = async(id)=>{

    try {
        
        const res=await axios.get(`/post/${id}`);
    
        if(res.status===200){
            const resdata= await res.data;
            return resdata;
        }
    } catch (error) {
        console.log(error);
    }
    
}
export const updatePostDetail=async(id,data)=>{
    try {

        const res= await axios.put(`/post/${id}`,{
            ...data,
            image:data.imageUrl
        });
       
        if(res.status ===200 || res.status ===201){
            const resData= await res.data;
            return resData;
        }
        
    } catch (error) {
        console.log("Error Occurred***");
    }
   
}
export const deletePost=async (id)=>{
    try {
            const res = await axios.delete(`/post/${id}`)
            if(res.status===200){
                const resData= await res.data;
                return resData
            }
    } catch (error) {
        return console.log(error)
    }

}
export const getUserDetails = async()=>{

    const id = localStorage.getItem("userId");
    const res= await axios.get(`/user/${id}`).catch(error=>{return console.log(error)});
    console.log("response: ",res.status);
    if(res.status ===200){
        const resData= await res.data;
        console.log("resData",resData);
        return resData;
    }
}