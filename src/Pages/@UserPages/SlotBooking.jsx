import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  IconButton,
  Select,
  InputLabel,
  Chip,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import Header from "../../Components/Header/Header";
import dayjs, { Dayjs } from "dayjs";
function SlotBooking() {
  const [sport, setSport] = useState("Cricket");
  const [cart, setCart] = useState(true);
  const [date, setDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [court, setCourt] = useState("");
  //remove from cart
  const removeCart = () => {
    // clear cart code her
    //hide cart
    setCart(false);
    console.log("may remove");
  };
  //add to cart
  const addToCart = () => {
    setCart(true);
  };
  // console.log(time);
  const calculateEndTime = (startTime, duration) => {
    const currenttime = moment();
    console.log(currenttime);
  };
  const courts = [
    { type: "5s", fee: "1000" },
    { type: "6s", fee: "1200" },
    {type:"Cricket",fee:"1300"},
    {badmintype:"badminton",fee:"800"}
  ];
  const timeSlots = ["06:00-07:00", "07:00-08:00", "09:00-10:00"];
  const isFormFilled = sport && date && court && selectedSlots.length > 0;
  useEffect(() => {
    // calculateEndTime()
  }, [date, court, sport]);

  const toggleSlot = (slot) => {
    setSelectedSlots(
      (prevSelectedSlots) =>
        prevSelectedSlots.includes(slot)
          ? prevSelectedSlots.filter((s) => s !== slot) // Remove if already selected
          : [...prevSelectedSlots, slot] // Add if not selected
    );
  };
  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <Header hideLocationElement={true} />
      <div className="container bg-light d-flex p-2 mt-2">
        <hr />
        <div
          className=" container-fluid  justify-content-center align-items-center bg-light    "
          style={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          <div className="row">
            <div
              className={
                cart
                  ? `col-md-6   bg-light   border`
                  : `col-md-12   bg-light   border`
              }
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h3 className="mt-4 ">Arena x of Arena Y</h3>
                <p>Kakkanad</p>
                <hr />
                {/* Sports Selector */}
                <TextField
                  select
                  label="Sports"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Cricket">Cricket</MenuItem>
                  <MenuItem value="Football">Football</MenuItem>
                  <MenuItem value="Badminton">Badminton</MenuItem>
                </TextField>

                {/* Date Picker */}

                <DatePicker
                  className="mt-4"
                  label="Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { variant: "outlined" } }}
                />

                {/* Time Picker */}
                <hr />
                <h4 className="mt-4 ">
                  Pick from available slots for the day:
                </h4>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {timeSlots.map((slot) => (
                    <Chip
                      className="mt-2"
                      key={slot}
                      label={slot}
                      clickable
                      color={
                        selectedSlots.includes(slot) ? "warning" : "primary"
                      }
                      onClick={() => toggleSlot(slot)}
                    />
                  ))}
                </Box>
                <hr />
                {/* Display the selected slots */}
                <Box mt={4}>
                  <h4>Selected Time Slots:</h4>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedSlots.length > 0 ? (
                      selectedSlots.map((slot) => (
                        <Chip
                          key={slot}
                          label={slot}
                          color="success"
                          clickable
                          onClick={() => toggleSlot(slot)}
                        />
                      ))
                    ) : (
                      <p>No time slots selected</p>
                    )}
                  </Box>
                </Box>
                <hr />
                {/* Court Selector */}
                <TextField
                  select
                  label="Court"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="">
                    <em>--Select Court--</em>
                  </MenuItem>
                  {courts.map((courtOption) => (
                    <MenuItem key={courtOption.type} value={courtOption.type}>
                      {courtOption.type}
                    </MenuItem>
                  ))}
                </TextField>
                <hr />
                <Button
                  onClick={addToCart}
                  variant="contained"
                  color="success"
                  fullWidth
                  disabled={!isFormFilled}
                  style={{ marginTop: "15px", marginBottom: "10px" }}
                >
                  {isFormFilled ? " Add To Cart" : "select required fields"}
                </Button>
              </LocalizationProvider>
            </div>

            {cart ? (
              <div className="col-md-6 mb-5 bg-light  border  ">
                <div className="container ">
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <h3>Cart(1) </h3>
                    <i
                      onClick={removeCart}
                      className="fa-solid fa-trash text-danger"
                    ></i>
                  </div>
                  <hr />
                  <div className="cartItem">
                    <p style={{ fontSize: "1.2rem" }}>
                      {" "}
                      Court: {courts.find((c)=>c.type===court)?.fee}
                    </p>
                    <p style={{ fontSize: "1.2rem" }}>
                    Date: {date ? dayjs(date).format("DD/MM/YYYY") : "No date selected"} 
                    </p>
                    <p style={{ fontSize: "1.2rem" }}>
          Time Slot: {selectedSlots.length > 0 ? selectedSlots.join(", ") : "No time slots selected"} 
        </p>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {" "}
                      Total Fee: {courts[1].fee}
                    </p>
                    <div className="text-center p-2 mb-2">
                      <button className=" text-center w-100 btn-rounded btn btn-success">
                        Confirm Slot
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotBooking;
