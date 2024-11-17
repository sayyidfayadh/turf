import { Avatar, TextField, ToggleButton, ToggleButtonGroup, Button as MUIButton, Button } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import {  Card, Col, Modal, Row } from 'react-bootstrap';
import Header from '../../../Components/@AdminComponents/Header';
import { EditNote } from '@mui/icons-material';
import { getallbookingsAPI, getUserDetailsAPI, handleCancelAPI } from '../../../Services/AllAPI';
import { TokenAuthContext } from '../../../ContextAPI/TokenAuth';
import { toast, ToastContainer } from 'react-toastify';


function Profile() {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [toLogin, setToLogin] = useState(true);
  const [alignment, setAlignment] = useState("booking");
  const [user, setUser] = useState({
    
  });
  const [editMode, setEditMode] = useState(false);
  const[allbooking,setAllBookings]=useState([])
  console.log(allbooking);
  
  const setlogin = (e) => {
    e.preventDefault();
    setToLogin(!toLogin);
  };

  const handleBookingButtonChange = () => {
    setCancelled(!cancelled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    console.log("Profile updated:", user);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
 

  const getAllBookings=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      }
   try {
    const result=await getallbookingsAPI(reqHeader)
    if(result.status==200){
      setAllBookings(result.data)
    }
   } catch (error) {
    console.error(error)
   }
  }
  }
useEffect(()=>{
  getAllBookings()
},[])



  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsAuthorized(false);
  };

  const getUserDetails = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      try {
        const result = await getUserDetailsAPI(reqHeader);
        if (result.status === 200) {
          setUser(result.data.profile);
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  const [show, setShow] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const handleClose = () => setShow(false);
  const handleBooking = async (id) => {
    // console.log(id);
    const bookingId = id;
    const token = sessionStorage.getItem("token");
    // console.log(token);

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const reqBody = {
      bookingId: bookingId,
    };
    try {
      const result = await handleCancelAPI(reqBody, reqHeader);
      if (result.status == 200) {
       handleClose()
        toast.success("Booking canceled successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-light">
      <Header />
      <ToastContainer position='top-center'/>
        <div
          className="container mt-3 bg-light"
          style={{
            minHeight:"85vh",
            maxHeight: "85vh",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          <Row className="">
            {/* User Info and Avatar */}
            <Col md={4} className="d-flex flex-column align-items-center text-center border p-5">
              <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 80, height: 80 }} />
              <h3>{user.name}</h3>
              <p>{user.bio}</p>
              <p>{user.phone}</p>
              <p>{user.email}</p>
              <div className="d-flex gap-4 justify-content-center">
                <MUIButton
                  variant="contained"
                  color="warning"
                  onClick={handleLogOut}
                >
                  Log Out
                </MUIButton>
              </div>
            </Col>

            {/* Edit Profile / Bookings */}
            <Col md={8} style={{overflow:"scroll",overflowX:"hidden",minHeight:"85vh",maxHeight:"85vh"}}>
           
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  {["name", "email", "phone", "bio"].map((field) => (
                    <TextField
                      key={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={user[field]}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      multiline={field === "bio"}
                      rows={field === "bio" ? 4 : 1}
                    />
                  ))}
                  <MUIButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: "15px", marginBottom: "10px" }}
                  >
                    Save Changes
                  </MUIButton>
                </form>
              ) : ( 
              <div className="mt-2">
                {/* <ToggleButtonGroup
                 
                  value={alignment}
                  exclusive
                 
                  sx={{ marginTop: "1vh" }}
                > */}
                  <Button color="success" variant="contained" className="btn me-1"  onClick={handleBookingButtonChange}>All Bookings</Button>
                  <Button  variant="contained" color="error"className="btn me-2" onClick={handleBookingButtonChange} >
                    Cancelled Booking
                  </Button>
                {/* </ToggleButtonGroup> */}
                <div>
                  {allbooking?.length > 0 ? (
                    allbooking.map((booking) => (
                      <>
                        {booking.status === "confirmed" &&
                          cancelled == false && (
                            <div className="mb-2 border mt-1">
                              <Card border="success">
                                <Card.Header className="d-flex justify-content-between  fs-4 fw-bold">
                                  {booking.name}{" "}
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => setShow(true)}
                                  >
                                    Cancel 
                                  </Button>
                                </Card.Header>
                                <Card.Body>
                                  <Card.Title> {booking.date}</Card.Title>
                                  <Card.Text>
                                    <div className="row">
                                      <div className="col-md-3 col-sm-5">
                                        Time:
                                   
                                      </div>
                                      <div className="col">
                                        {booking.timeslots} <br />
                                     
                                      </div>
                                    </div>
                                  </Card.Text>
                                </Card.Body>
                                <Modal
                                  show={show}
                                  onHide={handleClose}
                                  backdrop="static"
                                  keyboard={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Slot removal</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Are you sure to cancel this booking?
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => handleBooking(booking._id)}
                                    >
                                      Confirm
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Card>
                            </div>
                          )}
                                  {booking.status === "cancelled" &&
                          cancelled == true && (
                            <div className="mb-2 border mt-1">
                              <Card border="success">
                                <Card.Header className="d-flex justify-content-between  fs-4 fw-bold">
                                  {booking.name}{" "}
                                 
                                </Card.Header>
                                <Card.Body>
                                  <Card.Title> {booking.date}</Card.Title>
                                  <Card.Text>
                                    <div className="row">
                                      <div className="col-md-3 col-sm-5">
                                        Time:
                                    
                                      </div>
                                      <div className="col">
                                        {booking.timeslots} <br />
                                     
                                      </div>
                                    </div>
                                  </Card.Text>
                                </Card.Body>
                              
                              </Card>
                            </div>
                          )}
                          
                      </>
                    ))
                  ) : (
                    <>
                      <h1>No cancelled bookings yet</h1>
                    </>
                  )}
                </div>
              </div>
        
              )}
            </Col>
          </Row>
        </div>
    
    </div>
  );
}

export default Profile;
