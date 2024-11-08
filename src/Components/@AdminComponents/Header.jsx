import React, { useEffect, useState } from "react";
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
    localStorage.setItem("location", newValue);
    // more to do with location
    console.log("Selected location:", newValue);
    //api recall ig
  };
  return (
    <div className="bg-light border">
      {/* header */}
      <nav>
        <div className="d-flex  align-items-center justify-content-around p-2">
          <div className="header d-flex align-items-center jusify-content-between ">
            <div className="logo" onClick={() => navigate("/turfadmin")}>
              <h2>
                {" "}
                <img
                  src="/stadium.png"
                  width={"60 vh"}
                  height={"60vw"}
                  alt="logo"
                />{" "}
                YourArena
              </h2>
              {/* <input type="text" className="form-control" /> */}
            </div>
            
          </div>

          <div className="navs w-50  d-none d-md-flex justify-content-between">
            <p className="nav" onClick={() => navigate("/turfadmin")}>
              <HomeIcon />
              Home
            </p>
            <p onClick={() => navigate("/addturf")} className="nav">
              <LocalActivityIcon />
              Turf
            </p>
        

            {/* <p className="nav"> <LightbulbIcon />Learn</p> */}
          </div>
          <div className="d-flex d-none d-md-flex">
            <Link to={"/adminprofile"}>
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
                onClick={() => navigate("/turfadmin")}
              />
              
              <BottomNavigationAction
                onClick={() => navigate("/addturf")}
                label="Turf"
                icon={<LocalActivityIcon />}
              />
              <BottomNavigationAction
                onClick={() => navigate("/adminprofile")}
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
