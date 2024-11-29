import React, { useEffect, useState } from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ArchiveIcon from "@mui/icons-material/Archive";
import HomeIcon from "@mui/icons-material/Home";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";

import { TextField, Autocomplete } from "@mui/material";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {  Shop2Outlined, ShopTwoRounded } from "@mui/icons-material";
function Header({ hideLocationElement }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0); //of the bottomnav
  const cities = ["Kochi", "Kozhikode", "Malappuram", "Kannur", "Wayanad"];
  const [location, setLocation] = useState("Kochi");
  useEffect(() => {
    const locationFromLS = localStorage.getItem("location");
    if (locationFromLS) {
      setLocation(locationFromLS);
    }
  }, [location]);
  const handleLocationChange = (event, newValue) => {
    setLocation(newValue);
    localStorage.setItem("location", newValue || "");
    // more to do with location
    // console.log("Selected location:", newValue);
    //api recall ig
  };
  return (
    <div className="bg-light border">
      {/* header */}
      <nav>
        <div className="d-flex  align-items-center justify-content-between p-2">
          <div className="header d-flex align-items-center jusify-content-between ">
            <div className="logo" onClick={() => navigate("/")}>
              <h2>
                {" "}
                <img
                  src="/stadium.png"
                  width={"60 vh"}
                  height={"60vw"}
                  alt="logo"
                />{" "}
                Arena
              </h2>
              {/* <input type="text" className="form-control" /> */}
            </div>
            <div className="flex-end">
              {hideLocationElement ? null : (
                <Autocomplete
                  sx={{
                    width: "25vh",
                    marginLeft: "6vh",
                    outlineColor: "green",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  options={cities}
                  value={location}
                  onChange={handleLocationChange}
                  renderInput={(params) => <TextField {...params} label="" />}
                />
              )}
            </div>
          </div>

          <div className="navs w-50  d-none d-md-flex justify-content-between">
            <p className="nav" onClick={() => navigate("/")}>
              <HomeIcon />
              Home
            </p>

            <p onClick={() => navigate("/booking")} className="nav">
              <LocalActivityIcon />
              Book
            </p>
            {/* <p onClick={() => navigate("/teamup")} className="nav">
              <SportsKabaddiIcon />
              Team-Up
            </p> */}

            <p className="nav"  onClick={() => navigate("/shop")}  onChange={(event, newValue) => {
                setValue(newValue);
              }}>
              {" "}
              <ShopTwoRounded /> Shop
            </p>

            {/* <p className="nav"> <LightbulbIcon />Learn</p> */}
          </div>
          <div className="d-flex d-none d-md-flex">
            <Link to={"/profile"}>
              <button className="btn btn-rounded btn-sm">
                {" "}
                <AccountCircleIcon sx={{ fontSize: "40px" }} />
              </button>
            </Link>

            {/* <img src="./profile.png" alt="" width={"60 px"} /> */}
          </div>
        </div>
      </nav>
      <div
        className="d-md-none d-block"
        style={{ position: "relative", zIndex: "100" }}
      >
        <Box sx={{ width: 500 }}>
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="Home"
                icon={<HomeIcon />}
                onClick={() => navigate("/")}
              />
              
              <BottomNavigationAction
                onClick={() => navigate("/booking")}
                label="Book"
                icon={<LocalActivityIcon />}
              />
                {/* <BottomNavigationAction
                onClick={() => navigate("/teamup")}
                label="teamup"
                icon={<SportsKabaddiIcon
                   />}
              /> */}
<BottomNavigationAction
                label="Shop"
                onClick={() => navigate("/shop")}
                icon={<Shop2Outlined />}
              />
              <BottomNavigationAction
                onClick={() => navigate("/profile")}
                label="Profile"
                icon={<AccountCircleIcon />}
              />
            </BottomNavigation>
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default Header;
