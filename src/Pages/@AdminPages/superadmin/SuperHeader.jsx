/* eslint-disable no-unused-vars */

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

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { TextField, Autocomplete } from "@mui/material";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DeliveryDiningRounded } from "@mui/icons-material";
function SuperHeader() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0); //of the bottomnav
  return (
    <div>
      <div className="bg-light border">
      {/* header */}
      <nav>
        <div className="d-flex  align-items-center justify-content-between p-2">
          <div className="header d-flex align-items-center jusify-content-between ">
            <div className="logo" onClick={() => navigate("/admin")}>
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
            <p className="nav" onClick={() => navigate("/admin")}>
              <HomeIcon />
              Home
            </p>
            <p onClick={() => navigate("/addproducts")} className="nav">
              <LightbulbIcon />
              Merchandise
            </p>
            <p onClick={() => navigate("/addadmins")} className="nav">
              <AccountCircleIcon />
              Admins
            </p>
            <p onClick={() => navigate("/orders")} className="nav">
              <DeliveryDiningRounded />
              Orders
            </p>
            
            {/* <p className="nav"> <LightbulbIcon />Learn</p> */}
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
                onClick={() => navigate("/admin")}
              />
              
              <BottomNavigationAction
                onClick={() => navigate("/addproducts")}
                label="Merchandise"
                icon={<LightbulbIcon />}
              />
                  <BottomNavigationAction
                onClick={() => navigate("/addadmins")}
                label="Admins"
                icon={<AccountCircleIcon />}
              />
                   <BottomNavigationAction
                onClick={() => navigate("/orders")}
                label="Orders"
                icon={<DeliveryDiningRounded />}
              />
            
            
            </BottomNavigation>
          </Paper>
        </Box>
      </div>
    </div>
    </div>
  )
}

export default SuperHeader