import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import { Avatar, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Button } from 'react-bootstrap';
import { EditNote } from '@mui/icons-material';
import Face6Icon from '@mui/icons-material/Face6';
function UserProfile() {
  // logged in state
  const[isLoggedIn,setIsLoggedIn]=useState(true)
  //signedup or to login state
  const[toLogin,setToLogin]=useState(true)
  const setlogin=(e)=>{
    e.preventDefault()
    setToLogin(!toLogin)
  }
  //booking button toggle
 
    const [alignment, setAlignment] = useState('booking');
    const handleBookingButtonChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  //avatars for profile
  const images = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683439.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4202/4202835.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/3079/3079652.png',
    },
];
  
    // Example user data
    const [user, setUser] = useState({
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      bio: "pro playa",
      avatarUrl: "https://cdn-icons-png.flaticon.com/128/16683/16683469.png", // Placeholder avatar
    });
  
    const [editMode, setEditMode] = useState(false);
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setEditMode(false); // Save data and exit edit mode
      console.log("Profile updated:", user);
    };
  
    // Handle input changes
    const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    };
  
  
  return (
    <div className='bg-light' >
      <Header hideLocationElement={true} />
      {isLoggedIn?  <div className="container mt-3 bg-light" style={{height:"85vh",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",

}}>

      <div className="row ">
        {/* bio */}
        <div className="col-md-4 mt-2 d-flex p-5  flex-wrap justify-content-center align-items-center text-center border">
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            sx={{ width: 80, height: 80,  }}
          />
         <div>
         <h3>{user.name}</h3>
         <p>{user.bio}</p>
         <p>{user.phone}</p>
          <p>{user.email}</p>
         
          
         </div>
       <div className='col d-flex gap-4 justify-content-center '>
       <Button
          style={{marginBottom:""}}
            variant="contained"
            startIcon={<EditNote />}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="danger"
            startIcon={<EditNote />}
            // onClick={() => setEditMode(true)}
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
                style={{ marginTop: "15px",marginBottom:"10px" }}
              >
                Save Changes
              </Button>
            </form>
          ) :(<div> 
    <ToggleButtonGroup
      color="success"
      value={alignment}
      exclusive
      onChange={handleBookingButtonChange}
      sx={{marginTop:"1vh"}}
    >
      <ToggleButton value="all booking">All Booking</ToggleButton>
      <ToggleButton value="cancel booking">Cancelled Booking</ToggleButton>
      
    </ToggleButtonGroup>
          
          </div>)}
        </div>
      </div>
    </div>
    :
  // login y signup page
  <>
  <div className='container p-5 sm border mt-4' style={{height:"85vh",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",

}}>
    <h1>Welcome to your Arena</h1>
           {toLogin? <form className='row g-3'>
              <div className='col-md-12 gap-3  '>
               <label htmlFor="">Your Name</label>
                <input type="text" className='form-control w-100 mt-2 mb-2' id='f-name' placeholder="Enter your first name" />
              
                <input type="text" className='form-control w-100' id='s-name' placeholder="Enter your second name" />
              </div>
              <div className='col-md-12'>
                <label htmlFor="mail" className='form-label'>E-mail</label>
                <input type="email" className='form-control w-100' id='mail' placeholder="Enter your email" />
              </div>
              <div className='col-md-12'>
                <label htmlFor="pswd" className='form-label'>Password</label>
                <input type="password" className='form-control' id='pswd' placeholder="Enter your password" />
              </div>
              <div className='col-12 position-bottom'>
                <Button type="submit" variant="success" className='w-100'>
                  Sign Up 
                </Button>
                 </div>
                 <div className='text-center'>
                 <a href="" onClick={setlogin}>Existing User?</a>
                 </div>
                
            </form>:<>
            <form className='row g-3'>
              <div className='col-md-12 gap-3 '>
                <label htmlFor="mail" className='form-label'>E-mail</label>
                <input type="email" className='form-control w-100' id='mail' placeholder="Enter your email" />
              </div>
              <div className='col-md-12'>
                <label htmlFor="pswd" className='form-label'>Password</label>
                <input type="password" className='form-control' id='pswd' placeholder="Enter your password" />
              </div>
              <div className='col-12 position-bottom'>
                <Button type="submit" variant="success" className='w-100'>
                 LogIn
                </Button>
                 </div>
                 <div className='text-center'>
                 <a href="" onClick={setlogin}>New User?</a>
                 </div>
                
            </form>
            </>}
          </div>
  
  </>    
  }
    </div>
  )
  
}

export default UserProfile