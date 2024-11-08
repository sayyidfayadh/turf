import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Avatar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { EditNote } from "@mui/icons-material";
import Face6Icon from "@mui/icons-material/Face6";
import { Col, Container, Row } from "react-bootstrap";
import { getUserDetailsAPI, loginUserAPI, registerUserAPI } from "../../Services/AllAPI";
function UserProfile() {
  // logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //signedup or to login state
  const [toLogin, setToLogin] = useState(true);
  const setlogin = (e) => {
    e.preventDefault();
    setToLogin(!toLogin);
  };
  //booking button toggle

  const [alignment, setAlignment] = useState("booking");
  const handleBookingButtonChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  //avatars for profile
  const images = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/16683/16683469.png",
    },
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/16683/16683439.png",
    },
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4202/4202835.png",
    },
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3079/3079652.png",
    },
  ];

  // Example user data
  const [user, setUser] = useState({
   
  });
  console.log(user);
  
  const[userData,setUserData]=useState({
    
    role:"user",
    profileImg:"",
    phone: "",
    bio:"",
  })
  // console.log(userData);
  

  const [editMode, setEditMode] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false); // Save data and exit edit mode
    console.log("Profile updated:", user);
  };

  // Handle input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
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
    // setUser(result.data.existingUser)
    sessionStorage.setItem("username",result.data.existingUser.username)
    sessionStorage.setItem("role",result.data.existingUser.role)
    sessionStorage.setItem("token",result.data.token) 
    toast.success(`login successfull`)
    setUserData({email:"",password:""}) 
    setIsLoggedIn(!isLoggedIn)
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
const getUserDetails=async()=>{
const token=sessionStorage.getItem("token")
console.log(token);

if(token){
  const reqHeader={
    authorization:`Bearer ${token}`,
    "Content-Type":"application/json"
  }
  try {
    const result=await getUserDetailsAPI(reqHeader)
  if(result.status==200){
setUser(result.data)
  }
  else{
    console.log(result.response.data);
    
  }
  } catch (error) {
   console.error(error) 
  }
}
}
useEffect(()=>{
  getUserDetails()
},[])
// console.log(user);
const handleLogOut=()=>{
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("role");
  setIsLoggedIn(false)
}

  return (
    <div className="bg-light" >
      <ToastContainer position="top-center" />
      <Header hideLocationElement={true} />
      {isLoggedIn ? (
        <div
          className="container mt-3 bg-light "
          style={{
            height: "85vh",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          
          }}
        >
          <div className="row  h-100">
            {/* bio */}
            <div className="col-md-4 mt-2 d-flex p-5  flex-wrap justify-content-center align-items-center text-center border">
              <Avatar
                alt={user.name}
                src={user.avatarUrl}
                sx={{ width: 80, height: 80 }}
              />
              <div>
                <h3>{user.username}</h3>
                <p>{user.bio}</p>
                <p>{user.phone}</p>
                <p>{user.email}</p>
              </div>
              <div className="col d-flex gap-4 justify-content-center ">
                <Button
                  style={{ marginBottom: "" }}
                  variant="contained"
                  startIcon={<EditNote />}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  // startIcon={<EditNote />}
                  onClick={handleLogOut}
                >
                  LogOut
                </Button>
              </div>
            </div>

            {/* edit profile */}
            <div className="col-md-8">
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Bio"
                    name="bio"
                    value={user.bio}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: "15px", marginBottom: "10px" }}
                  >
                    Save Changes
                  </Button>
                </form>
              ) : (
                <div>
                  <ToggleButtonGroup
                    color="success"
                    value={alignment}
                    exclusive
                    onChange={handleBookingButtonChange}
                    sx={{ marginTop: "1vh" }}
                  >
                    <ToggleButton value="all booking">All Booking</ToggleButton>
                    <ToggleButton value="cancel booking">
                      Cancelled Booking
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // login y signup page
        <>
          
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
            {toLogin ? (
            <div  style={{ flex: 1, display: "flex", flexDirection: "column" }}>
             <Row  className="pt-2">
              <h1>Welcome to YourArena</h1>
              <div className="d-flex justify-content-center mb-4">
      <img src="./stadium.png" style={{ width: "150px", height: "150px" }} alt="aaa" />
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
                    Existing User?
                  </a>
                </div>
              </div>
              </div>
            ) : (
              <>
               <Row  className="pt-2">
              <h1>Welcome to YourArena</h1>
              <div className="d-flex justify-content-center mb-4">
      <img src="./stadium.png" style={{ width: "150px", height: "150px" }} alt="aaa" />
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
        </>
      )}
    </div>
  );
}

export default UserProfile;
