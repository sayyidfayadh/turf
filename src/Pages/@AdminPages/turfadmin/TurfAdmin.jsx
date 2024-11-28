import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Components/@AdminComponents/Header";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import {
  Avatar,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { loginUserAPI } from "../../../Services/AllAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenAuthContext } from "../../../ContextAPI/TokenAuth";
function TurfAdmin() {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);

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

  // console.log(user);

  return (
    <div>
      <ToastContainer position="top-center" />
      <Header />

      <>
        <div
          className="container text-center border"
          style={{ minHeight: "90vh", padding: "2rem" }}
        >
          <div className="row">
            <div
              className="col"
              style={{
                backgroundImage: `url("./turf.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "500px",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
              }}
            >
              {/* Optional content inside the turf image column */}
              <div
                className="text-white p-3"
                style={{
                  marginTop: "200px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "0.5rem",
                }}
              >
                <h3>Welcome to YourArena</h3>
                <p>Arena for your Turfs</p>
              </div>
            </div>
            <div
              className="mt-2  d-flex align-items-center justify-content-center  "
              style={{
                minHeight: "300px",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <h3>Join us</h3>
                <p> Let's add your turf </p>
                <Link to={"/addturf"}>
                  {" "}
                  <button className="btn">
                    Go <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default TurfAdmin;
