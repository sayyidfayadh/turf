import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Cards from "../Components/@UserComponents/Cards";
import zIndex from "@mui/material/styles/zIndex";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate=useNavigate()
  const toBooking=(e)=>{
    e.preventDefault()
    navigate('/booking')
  }
  
  return (
    <div>
      <Header style={{ position: "relative", zIndex: "100" }} />
      {/* welcome intro */}
      <div className="main-content">
        <div className="container bg-light p-5 mt-5 ">
          <div className="row">
            <div className="col-md-6">
              <p style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
                BOOK YOUR ARENA & FIND GAMES NEARBY
              </p>

              <p style={{ fontSize: "1.1rem" }}>
                Discover sports venues with ease and connect with fellow sports
                fans who share your passion!
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800"
                height={"300vh"}
                width={"100%"}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="container w-100 ps-5 pt-5 pb-5 pe-5 bg-light mt-5">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: "relative", zIndex: "1" }}
          >
            <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>Arenas</p>
            <a href="" style={{ textDecoration: "none" }} onClick={toBooking}>
              
              View all Arenas &gt;
            </a>
          </div>
          <div className="d-flex ps-3  justify-content align-items-center flex-wrap" style={{position:"relative",zIndex:"2"}}>
            <Cards /> <Cards /> <Cards /> <Cards />  <Cards />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;