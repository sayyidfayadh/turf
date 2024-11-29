import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PoolIcon from "@mui/icons-material/Pool"; // You can add more icons as per your need
import { Link } from "react-router-dom";

import { Server_URL } from "../../Services/Server_URL";
import {
  Emergency,
  PoolOutlined,
  Shower,
  Water,
  Wifi,
} from "@mui/icons-material";

function Cards({ turf }) {
  const amenitiesEmojis = {
    "First Aid": <Emergency />,
    "Free Wifi": <Wifi />,
    "Drinking Water": <Water />,
    "Change Rooms": <Shower />,
    Pool: <PoolIcon />,
  };
  console.log(turf.images);
  return (
    <div className=" me-3">
      <Card
        sx={{
          width: "350px",
          filter: !turf.bookingStatus?"grayscale(80%)":"",
          borderRadius: "10px",
          position: "relative",
          zIndex: "1",
          marginBottom: "3vh",
        }}
      >
       
        
        <Link to={`/view/${turf?._id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100vh"
              image={
                turf?.images && turf.images.length > 0
                  ? `${Server_URL}/upload/${turf.images[0]}`
                  : "./turf.jpg"
              }
              alt="ss"
            />

            <div className="d-flex justify-content-between mt-1">
              <div className="d-flex">
              </div>
              <div>
                <Box
                  sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: turf?.bookingStatus
                      ? "rgba(13, 113, 10, 0.67)"
                      : "red",
                    color: "white",
                    padding: "5px",
                    borderRadius: "2px 4px 2px 2px",
                  }}
                >
                  <p className="p-0  me-5 m-0  ms-5 fs-6">
                    {" "}
                    {turf?.bookingStatus ? "Available" : "closed"}
                  </p>
                </Box>
              </div>
            </div>
            <CardContent>
              <Typography
                style={{
                  color: "gray",
                  fontSize: "1.8rem",
                  fontWeight: "bolder",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {turf?.name.charAt(0).toUpperCase() + turf?.name.slice(1)}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <span className="d-flex justify-content-between">
                  <span className="" style={{ fontSize: "1.1rem" }}>
                    {" "}
                    {turf?.location.charAt(0).toUpperCase() +
                      turf?.location.slice(1)}
                  </span>
                  <span>
                    {turf?.amenities.map((amenity, index) => (
                      <span key={index}>{amenitiesEmojis[amenity] || null}</span>
                    ))}
                  </span>
                </span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}

export default Cards;
