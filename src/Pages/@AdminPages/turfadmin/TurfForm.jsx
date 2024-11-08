import React, { useContext, useEffect, useState } from 'react';
import {  Form, Card, Container, Row, Col,Button } from 'react-bootstrap';

import Header from '../../../Components/@AdminComponents/Header';
import { Box,  Chip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Avatar, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { changeStatusAPI, getTurfDataAPI, loginUserAPI, sendTurfDataAPI } from "../../../Services/AllAPI";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { TokenAuthContext } from "../../../ContextAPI/TokenAuth";
function TurfForm() {
  const [sports, setSports] = useState([]);

  
  const [name, setName] = useState("");
  
  const [location, setLocation] = useState("");
  const [map,setMap]=useState("")
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  // console.log(images);
  
  const [footballPrices, setFootballPrices] = useState({ "5's": "", "7's": "" });
  const [prices, setPrices] = useState({});
  // console.log(prices);
  const[fetchTurfData,setFetchTurfData]=useState({})
  // console.log(fetchTurfData);
  
  

  const commonSports = ["cricket", "football", "basketball", "tennis", "badminton"];
  const commonAmenities = ["First Aid", "Free Wifi",  "Change Rooms", "Drinking Water",  "Pool"];
//add turf
const handleAdd = (e) => {
  e.preventDefault();
  const newTurfData = {
    name,
    location,
    map,
    sports: sports.map((sport) => ({
      name: sport,
      prices: sport === "football" ? { "fiveAside": footballPrices["5's"], "sevenAside": footballPrices["7's"] } 
        : {defaultPrice:prices[sport] || undefined},
    })),
    amenities,
    images,
    bookingStatus: true,
    timeslots:selectedTimeSlots
  };
    console.log("arena added:", newTurfData);
//api call function 
sendTurfData(newTurfData)



    // Clear the form after submission (optional)
    // setName("");
    // setLocation("");
    // setSports([]);
    // setAmenities([]);
    // setImages([]);
    // setFootballPrices({ "5's": "", "7's": "" });
    // setPrices({});
  };
  //add turf api call
  const sendTurfData=async(turfData)=>{
   if(turfData.sports.length==0 || !turfData.location || turfData.amenities.length==0){
    toast.warning(" check empty fields")
   }
    else{
      const reqBody=new FormData()
      // console.log("inbody name",turfData.name);
      
      reqBody.append("name",turfData.name)
      reqBody.append("bookingStatus",turfData.bookingStatus)
      reqBody.append("location",turfData.location)
      reqBody.append("map",turfData.map)
      reqBody.append("sports", JSON.stringify(turfData.sports))
      reqBody.append("amenities",JSON.stringify(turfData.amenities))
      reqBody.append("timeslots",JSON.stringify(turfData.timeslots))
      turfData.images.forEach((image, index) => {
        reqBody.append("images", image);
      });
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Authorization":`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
        try {
          const result=await sendTurfDataAPI(reqBody,reqHeader)
          if(result.status===201){

            toast.success("Turf added succesfully")
          }
        } catch (error) {
          console.error(error.response.data);
          toast.warning("an error occured while adding to db")
          
        }
    
      }
      else{
        toast.warning("invalid access")
      }
   

  }
  }
  //useffect for fetching turf data
useEffect(()=>{
  getTurfData()
},[])
  //get turf api
  const getTurfData=async()=>{
    const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Authorization":`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
        try {
          const result=await getTurfDataAPI(reqHeader)
          if(result.status===200){
            console.log("turf data delivered");
            const data=result.data
            setFetchTurfData(data)
            setName(data?.name || "");
            
            setMap(data?.map || "");
            setSports(data?.sports?.map((sport) => sport.name) || []);
            setAmenities(data?.amenities || []);
            const fetchedSports = data?.sports.map(sport => sport.name)||[];

    // Set initial sports state, merging commonSports with fetched sports
if (fetchedSports.length>0){
  setSports([...new Set([...commonSports, ...fetchedSports])]);
}
    // Populate prices and football prices based on fetched data
    setPrices(data?.sports.reduce((acc, sport) => {
      acc[sport.name] = sport.prices.defaultPrice || '';
      return acc;
    }, {}));

    setFootballPrices({
      "5's": data?.sports.find(s => s.name === 'football')?.prices["fiveAside"] || '',
      "7's": data?.sports.find(s => s.name === 'football')?.prices["sevenAside"] || '',
    });
            // setImages(fetchedData.images || []);
          }
        } catch (error) {
          console.error(error);
          
          
        }
      }
      else{
        toast.warning("invalid access")
      }
  }
  useEffect(() => {
    if (fetchTurfData && Object.keys(fetchTurfData)?.length > 0) {
      setName(fetchTurfData.name || "");
      setLocation(fetchTurfData.location || "");
      setSports(fetchTurfData.sports?.map((sport) => sport.name) || []);
      setAmenities(fetchTurfData.amenities || []);
    }
  }, [fetchTurfData]);

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    
  };

  const handlePriceChange = (sport, value) => {
    setPrices({ ...prices, [sport]: value });
  };

  const handleFootballPriceChange = (format, value) => {
    setFootballPrices({ ...footballPrices, [format]: value });
  };
  const timeSlots = [
    "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00",
    "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00",
    "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00",
    "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00",
    "22:00-23:00","23:00-00:00"
  ];
  const[selectedTimeSlots,setSelectedTimeSlots]=useState([ ])
  // console.log("timeslooots in",selectedTimeSlots);
  

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlots((prevSlots) =>
      prevSlots.includes(timeSlot)
        ? prevSlots.filter((slot) => slot !== timeSlot) 
        : [...prevSlots, timeSlot] 
    );
    // console.log("timeslooots",selectedTimeSlots);
  };
const[yourArena,setYourArena]=useState({name:""})
const[date,setDate]=useState(null)
const [isChecked, setIsChecked] = useState(false);

const handleStatus = async () => {
  const token=sessionStorage.getItem("token")
  if (token){
    const reqHeader={
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }
 try {
  const newStatus = !isChecked;
  setIsChecked(newStatus);
  const result = await changeStatusAPI({ bookingStatus: newStatus },reqHeader);
  console.log(result);
 } catch (error) {
  console.log(error);
  
 }
 //change status
};
}
const [bookedSlots, setBookedSlots] = useState([]);
const toggleSlot = (slot) => {
  setBookedSlots(
    (prevSelectedSlots) =>
      prevSelectedSlots.includes(slot)
        ? prevSelectedSlots.filter((s) => s !== slot) // Remove if already selected
        : [...prevSelectedSlots, slot] // Add if not selected
  );
};

//login
const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  
// logged in state
const [isLoggedIn, setIsLoggedIn] = useState(false);
//booking button toggle
useEffect(()=>{
 const token=sessionStorage.getItem("token")
 if(token){
   setIsLoggedIn(true)
 }
})
 // Example user data
 const [user, setUser] = useState({
  
 });
//  console.log(user);
 const[userData,setUserData]=useState({
   
  role:"user",
})
// Handle form submission


// Handle input changes
const handleChange = (e) => {
  setUserData({
    ...userData,
    [e.target.name]: e.target.value,
  });
};

const handleLogin=async()=>{
const {email,password}=userData
if( !email || !password){
toast.warn("fill empty field")
}
else{
try {
  const result= await loginUserAPI(userData)
// console.log(result);
if(result.status===200){
  // setUser(result.data.existingUser)
  sessionStorage.setItem("username",result.data.existingUser.username)
  sessionStorage.setItem("role",result.data.existingUser.role)
  sessionStorage.setItem("token",result.data.token) 
  toast.success(`login successfull`)
  setUserData({email:"",password:""}) 
  setIsLoggedIn(!isLoggedIn)
  setIsAuthorized(true)
}
else{
  toast.warn(result.response.data ||"registration failed")
} 
}
catch (error) {
  console.error(error)
  toast.error("An error occurred during registration");
}
}

}

  return (
    
    <div style={{minHeight:"100vh"}}>
     
      <Header/>
      <ToastContainer position='top-center'/>
      {isLoggedIn?
      (<>
      {Object.keys(yourArena).length > 0 ? (<>
    <Container className="mt-4">
        <Card>
          <Card.Header as="h4">Manage your Turf</Card.Header>
          <Card.Body>
            <Form>
              {/* Turf Status */}
              <div className="d-flex justify-content-center align-items-center mt-4">
                <h2 className="me-3">Set Status</h2>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={isChecked}
                  label={isChecked ? "Turf is open" : "Turf is closed"}
                  onChange={handleStatus}
                  className="align-middle"
                />
              </div>

              {/* Date Picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-4"
                  label="Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </LocalizationProvider>

              <hr />

              {/* Available Time Slots */}
              <h4 className="mt-4">Available Time Slots</h4>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {timeSlots.filter(slot => !bookedSlots.includes(slot)).map((slot) => (
                  <Chip
                    className="mt-2"
                    key={slot}
                    label={slot}
                    clickable
                    color="primary"
                    onClick={() => toggleSlot(slot)}
                  />
                ))}
              </Box>

              <hr />

              {/* Booked Time Slots */}
              <h4 className="mt-4">Booked Time Slots</h4>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {bookedSlots.length > 0 ? (
                  bookedSlots.map((slot) => (
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
            </Form>
          </Card.Body>
        </Card>
      </Container>
    
    </>):(<></>)}
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4">{Object.keys(yourArena).length > 0 ?"Edit":"Add"} Your Arena</Card.Header>
        <Card.Body>
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label>Venue Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter venue name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Map</Form.Label>
              <Form.Control
                type="text"
                placeholder="Map Link"
                value={map}
                onChange={(e) => setMap(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
  <Form.Label>Sports Available</Form.Label>
  {commonSports.map((sport,index) => (
    <div key={sport} style={{ marginBottom: "10px" }}>
      <Row>
        <Col xs={6}>
          <Form.Check
           id={`checkbox-${index}`}
            type="checkbox"
            checked={sports.includes(sport)}
            label={sport === "football" ? "Football" : sport}
            value={sport}
            onChange={(e) => {
              if (e.target.checked) {
                setSports([...sports, sport]);
              } else {
                setSports(sports.filter((s) => s !== sport));
                setPrices((prevPrices) => {
                  const updatedPrices = { ...prevPrices };
                  delete updatedPrices[sport];
                  return updatedPrices;
                });
                if (sport === "football") {
                  setFootballPrices({ "5's": "", "7's": "" });
                }
              }
            }}
          />
        </Col>
        {sport === "football" ? (
          <>
            <Col xs={3}>
              {sports.includes("football") && (
                <Form.Control
                  type="number"
                  placeholder="Price for 5's"
                  value={footballPrices["5's"]}
                  onChange={(e) => handleFootballPriceChange("5's", e.target.value)}
                />
              )}
            </Col>
            <Col xs={3}>
              {sports.includes("football") && (
                <Form.Control
                  type="number"
                  placeholder="Price for 7's"
                  value={footballPrices["7's"]}
                  onChange={(e) => handleFootballPriceChange("7's", e.target.value)}
                />
              )}
            </Col>
          </>
        ) : (
          <Col xs={6}>
            {sports?.includes(sport) && (
              <Form.Control
                type="number"
                placeholder={`Enter price for ${sport}`}
                value={prices?.[sport] || ""}
                onChange={(e) => handlePriceChange(sport, e.target.value)}
              />
            )}
          </Col>
        )}
      </Row>
    </div>
  ))}
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label >Amenities</Form.Label>
              {commonAmenities.map((amenity) => (
                <Form.Check
                  key={amenity}
                  type="checkbox"
                  label={amenity}
                  value={amenity}
                  checked={amenities.includes(amenity)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAmenities([...amenities, amenity]);
                    } else {
                      setAmenities(amenities.filter((a) => a !== amenity));
                    }
                  }}
                />
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available Time Slots</Form.Label>
              {timeSlots.map((timeSlot) => (
                <Form.Check
                  key={timeSlot}
                  type="checkbox"
                  label={timeSlot}
                  value={timeSlot}
                  checked={selectedTimeSlots.includes(timeSlot)}
                  onChange={() => handleTimeSlotChange(timeSlot)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Turf Images</Form.Label>
              <Form.Control
                type="file"
                accept='.jpg,.png,.jpeg'
                multiple
                onChange={handleImageChange}
              />
              <div className="mt-3">
                {images.length > 0 && (
                  <div>
                    <h6>Images</h6>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Arena Preview ${index + 1}`}
                          style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Form.Group>

           <div className='text-center'>
           <Button variant="success" type="submit">
              Submit
            </Button>
           </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>  
        </>):(
          <>
          <div
            className=" bg-light container w-100 p-5  border mt-4"
            style={{
              // width:"400px",
              maxWidth:"600px",
              height:"80vh",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
             
              <>
               <Row  className="pt-2">
              <h1>Welcome to YourArena</h1>
              <div className="d-flex justify-content-center mb-4">
      <img src="./stadium.png" style={{ width: "150px", height: "150px" }} alt="aaa" />
    </div>
                <Col className="d-flex flex-column gap-4">
               
                   <TextField
                    label="E-mail"
                    name="email"
                    
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                    margin="normal"
                  />

               
              <TextField
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                    margin="normal"
                  />
 
                </Col>
              
              </Row>
              
              <div className=""style={{ marginTop: "auto" }}>
                 <Button type="submit" variant="contained" color="success" className="w-100 mt-4 mb-4" onClick={handleLogin}>
                    Login
                  </Button>
                
                <div className="text-center mb-3">
                  <a href=""  style={{textDecoration:"none"}} className="">
                    Not a partner yet? send us a mail @email
                  </a>
                </div>
                 </div>
              </>
            
      </div>
        </>)

    }
     
    </div>
  );
}

export default TurfForm;
