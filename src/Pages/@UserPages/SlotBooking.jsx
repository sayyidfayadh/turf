import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  IconButton,
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
import { useParams } from "react-router-dom";
import { bookSlotAPI, getSlotsAPI, getViewTurfAPI } from "../../Services/AllAPI";
import { toast, ToastContainer } from "react-toastify";
import { TokenAuthContext } from "../../ContextAPI/TokenAuth";
function SlotBooking() {
  const {isUser,setIsUser}=useContext(TokenAuthContext)
  const [sport, setSport] = useState("");
  // console.log(sport);
  
  const [cart, setCart] = useState(false);
  const [date, setDate] = useState(null);
  //today for datelimit
  const today = new Date().toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }).split(",")[0]
  // console.log(today);
  
  // console.log(today);
  const [selectedSlots, setSelectedSlots] = useState([]);
  // console.log(selectedSlots);
  

  const [court, setCourt] = useState("");
  // for resetting court
  useEffect(() => {
    ("");
  }, [sport]);

  const { id } = useParams();
  // console.log(id);
  const [viewTurfData, setViewTurfData] = useState({});
  // console.log(viewTurfData);

  useEffect(() => {
    if (id) {
      getViewTurf(id);
    }
  }, [id]);
  //get turf data
  const getViewTurf = async (id) => {
    try {
      const result = await getViewTurfAPI(id);
      const data = result.data;
      setAvailableSports(data.sports.map((sport) => sport.name));
      //  setAmenities(data.amenities.map(amenity=>amenity));

      setViewTurfData(result.data);
      // console.log(viewTurfData.sports);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };
  const [availableSports, setAvailableSports] = useState([]);
  
  //sets date and api call to fetch bookings of that date
  useEffect(()=>{
    setDate(today)
  },[today])
  useEffect(()=>{
    if(date){
      handleDateandBooking()
    }
  },[date,sport])
  const handleDateandBooking = async () => {
    // console.log(e.target.value);
    // const token=sessionStorage.getItem("token")
    const turfId=viewTurfData._id
    const pickedDate=date
    if( turfId && pickedDate){
    const reqBody={
      turfId,
      pickedDate
    }
    try {
      const result=await getSlotsAPI(reqBody)
      // console.log(result.data);
      const data=result.data
      
      setTimeSlots(data)
    } catch (error) {
      console.error(Error)
    }
    }
  };
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

  const [timeSlots,setTimeSlots]=useState([])
  const isFormFilled = sport && date  && selectedSlots.length > 0;

  const toggleSlot = (slot) => {
    setSelectedSlots(
      (prevSelectedSlots) =>
        prevSelectedSlots.includes(slot)
          ? prevSelectedSlots.filter((s) => s !== slot) // Remove if already selected
          : [...prevSelectedSlots, slot] // Add if not selected
    );
    
  };
  const calculateTotalFee = () => {
    const selectedSport = viewTurfData.sports?.find((s) => s.name === sport);
    if (!selectedSport) return 0;

    let price = 0;
    if (sport === "football") {
      price = selectedSport.prices[court] || 0;
    } else {
      price = selectedSport.prices.defaultPrice || 0;
    }
    return price * selectedSlots.length;
    setTotal
  };

  const totalFee = calculateTotalFee();
  const handleBooking=async()=>{
    const turfId=viewTurfData._id
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
     "Authorization":`Bearer ${token}`
     ,"Content-Type":"application/json"
      }

      const reqBody={
        turfId,
        turfname:viewTurfData.name,
        sport,
        date,
        totalFee,
        selectedSlots
      }
      try {
        const result =await bookSlotAPI(reqBody,reqHeader)
      // console.log(result);
      setTimeSlots(prevSlots => prevSlots.filter(slot => !selectedSlots.includes(slot)));
      setSelectedSlots([])
      toast.success("Booking confirmed!");
      } catch (error) {
        console.log(error);
        toast.warning("booking failed")
      }
    }
    else{
      toast.warn("Login to book slots")
    }
    }
  
// const handleAddToCart = () => {
//     setCart((prevCart) => !prevCart); // Toggle the cart state
// };
  return (
    <div className="bg-light " style={{ height: "100vh" }}>
      <Header hideLocationElement={true} />
      <ToastContainer position="top-center"/>
      <div className="container bg-light d-flex p-2 mt-2">
        <hr />
        <div
          className=" container-fluid  justify-content-center align-items-center   "
          style={{
            backgroundColor:""
            ,boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          <div className="row p-2">
            <div
              className={
                cart
                  ? `col-md-6    p-2  border`
                  : `col-md-12 p-2     border`
              }
               style={{
            'backgroundColor':""}
               }>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <div className="pt-3 bg-success text-light text-center p-1 pt-1">
            <h3 className=" fw-bold fs-2">{viewTurfData.name}</h3>
            <p>{viewTurfData.location}</p>
            </div>
              <hr />
              {/* Sports Selector */}
              <TextField
              className="mb-3 mt-2"
                select
                label="Select Sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                fullWidth
              >
                {availableSports && availableSports.length > 0 ? (
                  availableSports.map((sport, index) => (
                    <MenuItem key={index} value={sport}>
                      {sport}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No sports available</MenuItem>
                )}
              </TextField>

              {/* Court Selector */}
              {sport === "football" && (
                <select
                  className="form-select mb-3"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                >
                  <option value="">--Select Court--</option>
                  {viewTurfData.sports
      ?.filter((sport) => sport.name === "football")
      .flatMap((sport) => [
        sport.prices.fiveAside && (
          <option key={`${sport._id}-5aside`} value="fiveAside">
            5-A side: {sport.prices.fiveAside}
          </option>
        ),
        sport.prices.sevenAside && (
          <option key={`${sport._id}-7aside`} value="sevenAside">
            7-A side: {sport.prices.sevenAside}
          </option>
        )
      ])
      .filter(Boolean) }
  </select>
)}
              {/* Date Picker */}

              <input
                type="date"
                min={today}
                value={date}
                className="form-control"
                onChange={(e)=>setDate(e.target.value)}
              />
              {/* Time Picker */}
              <hr />
              <h4 className="mt-4 ">Pick from available slots for the day:</h4>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {timeSlots.map((slot) => (
                  <Chip
                    className="mt-2 fs-6"
                    key={slot}
                    label={slot}
                    clickable
                    color={selectedSlots.includes(slot) ? "success" : ""}
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
               
           
                {isFormFilled ?    <Button
                onClick={addToCart}
                variant="contained"
                color="success"
                fullWidth
                style={{ marginTop: "15px", marginBottom: "10px" }}
              >Confirm</Button>
               :  <Button
                onClick={addToCart}
                variant="contained"
                color="success"
                disabled
                fullWidth
                style={{ marginTop: "15px", marginBottom: "10px" }}
              >Fill the form</Button>}
              {/* </LocalizationProvider> */}
            </div>

            {cart ? (
              <div className="col-md-6 p-0 border  ">
                <div className="container  ">
                  <div className="text-light bg-success mt-2">
                    <h3 className="p-2 fw-bold fs-2 pt-4 text-center">Booking </h3>
                    <p className="text-success">ss</p>
                  </div>
                  <hr />
                  <div className="cartItem p-2 " style={{backgroundColor:"beige",borderRadius:"10px"}}>
                    <p style={{ fontSize: "1rem" }}>
                      {" "}
                     Sport:{sport}
                     
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      {" "}
                   Court:{court?court:"default"}
                     
                    </p>
                  
                    <p style={{ fontSize: "1rem" }}>
                      Date:{" "}
                      {date
                        ? dayjs(date).format("DD/MM/YYYY")
                        : "No date selected"}
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      Time Slot:{" "}
                      {selectedSlots.length > 0
                        ? selectedSlots.join(", ")
                        : "No time slots selected"}
                    </p>
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      {" "}
                      Total Fee: {totalFee}
                    </p>
                    <div className="text-center text-light p-2 mb-2">
                      <Button  variant="contained"
                color="success"  disabled={!isFormFilled} className=" text-center w-100 btn-rounded btn btn-success" onClick={handleBooking}>
                     { isFormFilled? "Pay ₹150 | Confirm Slot":"Fill out Fields"}
                      </Button>
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
