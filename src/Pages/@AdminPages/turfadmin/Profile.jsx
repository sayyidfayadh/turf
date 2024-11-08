import { Avatar, TextField, ToggleButton, ToggleButtonGroup, Button as MUIButton } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Header from '../../../Components/@AdminComponents/Header';
import { EditNote } from '@mui/icons-material';
import { getUserDetailsAPI } from '../../../Services/AllAPI';
import { TokenAuthContext } from '../../../ContextAPI/TokenAuth';


function Profile() {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [toLogin, setToLogin] = useState(true);
  const [alignment, setAlignment] = useState("booking");
  const [user, setUser] = useState({
    
  });
  const [editMode, setEditMode] = useState(false);

  const setlogin = (e) => {
    e.preventDefault();
    setToLogin(!toLogin);
  };

  const handleBookingButtonChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
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
          setUser(result.data);
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

  return (
    <div className="bg-light">
      <Header />
      {isLoggedIn ? (
        <div
          className="container mt-3 bg-light"
          style={{
            height: "85vh",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          <Row className="h-100">
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
                  startIcon={<EditNote />}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </MUIButton>
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
            <Col md={8}>
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
                <ToggleButtonGroup
                  color="success"
                  value={alignment}
                  exclusive
                  onChange={handleBookingButtonChange}
                  sx={{ marginTop: "1vh" }}
                >
                  <ToggleButton value="all booking">All Booking</ToggleButton>
                  <ToggleButton value="cancel booking">Cancelled Booking</ToggleButton>
                </ToggleButtonGroup>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <p className="text-center mt-5">Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;
