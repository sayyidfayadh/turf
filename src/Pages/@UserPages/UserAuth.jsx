import React, { useContext, useState } from 'react'
import { TokenAuthContext } from '../../ContextAPI/TokenAuth'
import { loginUserAPI, registerUserAPI } from '../../Services/AllAPI'
import { Button, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function UserAuth() {
  const {isUser,setIsUser}=useContext(TokenAuthContext)
  const [user, setUser] = useState({});
  const[userData,setUserData]=useState({
    
    role:"user",
    profileImg:"",
    phone: "",
    bio:"",
  })
  const [toLogin, setToLogin] = useState(true);
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const setlogin = (e) => {
    e.preventDefault();
    setToLogin(!toLogin);
  };
  const handleRegister=async()=>{
    const {username,email,password,role}=userData
    // console.log(username,email,password,role);
    
    if(!username || !email || !password){

      toast.warn("fill empty field")
    }
    else{
        try {
          const result= await registerUserAPI(userData)
        // console.log(result);
        if(result.status===201){
          toast.success(`${result.data.username} has susccesfully registered`)
          setUserData({username:"",email:"",password:""}) 
          
          setToLogin(!toLogin);
         
        }
        else{
          toast.warn(result.response.data ||"registration failed")
        } 
      }
        catch (error) {
          console.error(error)
          toast.error("An error occurred during registration");
        }
 
  }
}
const handleLogin=async()=>{
  const {email,password}=userData
  if( !email || !password){
    toast.warn("fill empty field")
  }
  else{
    try {
      const result= await loginUserAPI(userData)
    // console.log(result);
    if(result.status===200){
      setUser(result.data.existingUser)
      sessionStorage.setItem("username",result.data.existingUser.username)
      sessionStorage.setItem("role",result.data.existingUser.role)
      sessionStorage.setItem("token",result.data.token) 
      toast.success(`login successfull`)
      setUserData({email:"",password:""}) 
      setIsUser(true)
    }
    else{
      toast.warn(result.response.data ||"Login Failed")
    } 
  }
    catch (error) {
      console.error(error)
      toast.error("An error occurred during registration");
    }
  }
  
  }
  
  return (
    <div>
      <Header/>
      <ToastContainer position='top-center'/>
 <div
            className=" bg-light container w-100 p-5  border mt-4"
            style={{
              // width:"400px",
              maxWidth:"600px",
              height:"80vh",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!toLogin ? (
            <div  style={{ flex: 1, display: "flex", flexDirection: "column" }}>
             <Row className="pt-2">
              <h1>Welcome to YourArena</h1>
              <div className="d-flex justify-content-center mb-4">
      <img src="/stadium.png" style={{ width: "150px", height: "150px" }} alt="aaa" />
    </div>
                <Col className="d-flex flex-column gap-4" >
                <TextField
                    label="User Name"
                    name="username"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                    margin="normal"
                  />               
                   <TextField
                    label="E-mail"
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                    margin="normal"
                  />

               
              <TextField
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                    margin="normal"
                  />


               
          
                </Col>
               
              </Row>
              <div className=""style={{ marginTop: "auto" }}>
              <Button type="submit" variant="contained" color="success" className="w-100 mt-4 mb-4" onClick={handleRegister}>
                    Sign Up
                  </Button>
                
                <div className="text-center mb-3">
                  <a href="" onClick={setlogin} style={{textDecoration:"none"}} className="">
                    Existing User?Login...
                  </a>
                </div>
              </div>
              </div>
            ) : (
              <>
               <Row  className="pt-2">
              <h1>Welcome to YourArena</h1>
              <div className="d-flex justify-content-center mb-4">
      <img src="/stadium.png" style={{ width: "150px", height: "150px" }} alt="logo" />
    </div>
                <Col className="d-flex flex-column gap-4">
               
                   <TextField
                    label="E-mail"
                    name="email"
                    
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                    margin="normal"
                  />

               
              <TextField
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                    margin="normal"
                  />
 
                </Col>
              
              </Row>
              
              <div className=""style={{ marginTop: "auto" }}>
                 <Button type="submit" variant="contained" color="success" className="w-100 mt-4 mb-4" onClick={handleLogin}>
                    Login
                  </Button>
                
                <div className="text-center mb-3">
                  <a href="" onClick={setlogin} style={{textDecoration:"none"}} className="">
                    New User?Let's SignUp
                  </a>
                </div>
                 </div>
              </>
            )}
      </div>


    </div>
  )
}

export default UserAuth