import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Avatar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { EditNote } from "@mui/icons-material";
import Face6Icon from "@mui/icons-material/Face6";
import { Card, Col, Container, Modal, Row } from "react-bootstrap";
import {
  getUserDetailsAPI,
  updateProfileAPI,
  handleBookingAPI,
  handleCancelAPI,
} from "../../Services/AllAPI";
import { TokenAuthContext } from "../../ContextAPI/TokenAuth";
import Footer from "../../Components/Footer/Footer";
function UserProfile() {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  // logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //signedup or to login state
  const [toLogin, setToLogin] = useState(true);
  const { isUser, setIsUser } = useContext(TokenAuthContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getUserDetails();
    }
  }, []);
  const setlogin = (e) => {
    e.preventDefault();
    setToLogin(!toLogin);
  };
  //booking button toggle
  const [allbooking, setAllBooking] = useState([]);
  // console.log(allbooking);
  const [cancelled, setCancelled] = useState(false);
  const [alignment, setAlignment] = useState("booking");
  const handleBookingButtonChange = () => {
    setCancelled(!cancelled);
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
  const [user, setUser] = useState({});
  // console.log(user);

  const [userData, setUserData] = useState({
    role: "user",
    profileImg: "",
    phone: "",
    bio: "",
  });
  // console.log(userData);

  const [editMode, setEditMode] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfileAPI(userData);
    setUser(result.data);
    setEditMode(false);
    toast.success("profile updated");
  };

  // Handle input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(userData);

  const getUserDetails = async () => {
    const token = sessionStorage.getItem("token");
    // console.log(token);

    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      try {
        const result = await getUserDetailsAPI(reqHeader);
        if (result.status == 200) {
          console.log(result.data);

          setAllBooking(result.data.userbookings);
          setUser(result.data.profile);
          setUserData({
            ...userData,
            username: result.data.profile.username,
            email: result.data.profile.email,
            phone: result.data.profile.phone,
            bio: result.data.profile.bio,
          });
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  // console.log(user);
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsUser(false);
  };
  // console.log(user.bio);
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
      getUserDetails()
        toast.success("Booking canceled successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-light">
      <ToastContainer position="top-center" />
      <Header hideLocationElement={true} />

      <div
        className="container mt-3 mb-5 bg-light "
        style={{
          
          minHeight:"85vh",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
        }}
      >
        <div className="row " style={{minHeight:"85vh"}}>
          {/* bio */}
          <div className="col-md-4 mt-2 d-flex p-5  flex-wrap justify-content-center align-items-center text-center border" style={{maxHeight:"85vh"}}>
            <Avatar
              alt={user.name}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH-HlLPg6e1bgXMdirxMaum-6xdjl34MIjaw&s"
              sx={{ width: 100, height: 100 }}
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
          <div className="col-md-8" style={{maxHeight:"85vh",overflow:"scroll"}}>
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={userData.username || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                {/* <TextField
                    label="Email"
                    name="email"
                    value={userData.email||""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  /> */}
                <TextField
                  label="Phone"
                  name="phone"
                  value={userData.phone || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Bio"
                  name="bio"
                  value={userData.bio || ""}
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
                                  {booking.turfname}{" "}
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
                                        <br />
                                        Sport: <br />
                                        Fee to pay at turf:
                                      </div>
                                      <div className="col">
                                        {booking.timeslots} <br />
                                        {booking.sport} <br />₹
                                        {booking.fee - 150} <br />
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
                                    Are you sure to cancel this booking?₹150 you
                                    paid is not refundable
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
                                  {booking.turfname}{" "}
                                 
                                </Card.Header>
                                <Card.Body>
                                  <Card.Title> {booking.date}</Card.Title>
                                  <Card.Text>
                                    <div className="row">
                                      <div className="col-md-3 col-sm-5">
                                        Time:
                                        <br />
                                        Sport: <br />
                                        Fee to pay at turf:
                                      </div>
                                      <div className="col">
                                        {booking.timeslots} <br />
                                        {booking.sport} <br />₹
                                        {booking.fee - 150} <br />
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
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default UserProfile;
