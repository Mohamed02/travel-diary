import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Home from "./home/Home";
import Auth from "./auth/Auth";
import Diaries from "./diaries/Diaries";
import { useDispatch, useSelector } from "react-redux";
import Add from "./diaries/Add";
import Profile from "./profile/Profile";
import DiaryUpdate from "./diaries/DiaryUpdate";
import { useEffect } from "react";
import { authAction } from "./store";
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authAction.login());
    }
  },[]);
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);
  return (<>
  <header><Header/></header>
  <section>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/diaries" element={<Diaries/>}/>
    {isLoggedIn &&<>
    <Route path="/add" element={<Add/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/post/:id" element={<DiaryUpdate/>}/></>}
    </Routes>

  </section>
  </>);

}

export default App;
