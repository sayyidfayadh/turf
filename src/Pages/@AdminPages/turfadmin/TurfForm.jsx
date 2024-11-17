import React, { useContext, useEffect, useState } from 'react';
import {  Form, Card, Container, Row, Col,Button, Modal, Collapse } from 'react-bootstrap';

import Header from '../../../Components/@AdminComponents/Header';
import { Box,  Chip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Avatar, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { changeStatusAPI, getTurfDataAPI, handleBookingAPI, loginUserAPI, sendTurfDataAPI } from "../../../Services/AllAPI";
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
 
  // console.log(availableSlots);
  
  const[selectedTimeSlots,setSelectedTimeSlots]=useState([ ])
  // console.log("timeslooots in",selectedTimeSlots);
  const [isChecked, setIsChecked] = useState("");
  
  const[date,setDate]=useState("")
  const today = new Date().toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }).split(",")[0]
  const [footballPrices, setFootballPrices] = useState({ "5's": "", "7's": "" });
  const [prices, setPrices] = useState({});
  // console.log(prices);
  const[fetchTurfData,setFetchTurfData]=useState({})
  // console.log(fetchTurfData);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const timeSlots = [
    "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00",
    "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00",
    "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00",
    "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00",
    "22:00-23:00","23:00-00:00"
  ];
  const [availableSlots,setAvailableSlots]=useState([])
  // console.log(availableSlots);
  
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
getTurfData()
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
          if(result.status===200){
            getTurfData()
            toast.success("Turf added succesfully")
            // console.log(result.data);
            
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
    setDate(today)
  },[])
useEffect(()=>{
  
  getTurfData()
},[date,show])
  //get turf api
  const getTurfData=async()=>{
    const pickedDate=date
    
    const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
        const reqBody={
          pickedDate
        }
        try {
          // console.log(reqBody);
          
          const result=await getTurfDataAPI(reqBody,reqHeader)
          if(result.status===200){
            console.log("turf data delivered",result.data);
            const{turfData,availableSlots,bookedSlots}=result.data
         const data=turfData
         const fetchAvailableSlot=availableSlots
         const fetchBookedSlot=bookedSlots
         setAvailableSlots(fetchAvailableSlot)
         setBookedSlots(fetchBookedSlot)
            setSelectedTimeSlots(data?.timeslots)
            setFetchTurfData(data)
            setName(data?.name || "");
            // setAvailableSlots(data?.timeslots)
            setMap(data?.map || "");
            setSports(data?.sports?.map((sport) => sport.name) || []);
            setAmenities(data?.amenities || []);
            
            // setImages(data?.images)
            const fetchedSports = data?.sports.map(sport => sport.name)||[];

    // Set initial sports state, merging commonSports with fetched sports
if (fetchedSports.length>0){
  setSports([...new Set([...commonSports, ...fetchedSports])]);
}
    // Populate prices and football prices based on fetched data
    setPrices(data?.sports.reduce((acc, sport) => {
      acc[sport.name] = sport?.prices?.defaultPrice || '';
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
  //for form

  //slots i retrieved after submitting form
 
  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlots((prevSlots) =>
      prevSlots.includes(timeSlot)
        ? prevSlots.filter((slot) => slot !== timeSlot) 
        : [...prevSlots, timeSlot] 
    );
    // console.log("timeslooots",selectedTimeSlots);
  };

// console.log(date);


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
const handleBooking=async()=>{
  const token=sessionStorage.getItem("token")
  const reqHeader={
    "Authorization":`Bearer ${token}`

  }
 const reqBody={
  name:"offlineBooking",
    SelectSlotInManage,
    turfId:fetchTurfData._id
    ,date
  }
  try {
    const result=await handleBookingAPI(reqBody,reqHeader)
    if(result.status==201){
      handleClose()
    }
  } catch (error) {
    console.log(error);
    
  }
  
}
const [bookedSlots, setBookedSlots] = useState([]);
const[SelectSlotInManage,setSelectSlotInManage]=useState("")
const toggleSlot = (slot) => {
  setSelectSlotInManage(slot)
  setShow(true)
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
 //modal
 
   const handleClose = () => setShow(false);
 

 

  return (
    
    <div style={{minHeight:"100vh"}}>
     
      <Header/>
      <ToastContainer position='top-center'/>
    
      {Object.keys(fetchTurfData).length > 0 ? (<>
          <h1 className='text-center mt-2 fw-bolder text-light p-4 fs-1 border bg-success'>{fetchTurfData.name}</h1>
    <Container  className="mt-4 p-0 fluid" style={{border:"1px solid green",borderRadius:"8px",backgroundColor:"red"}}>
        <Card>
          <Card.Header as="h4" className='text-center bg-success text-light'>Manage your Bookings</Card.Header>
          <Card.Body>
            <Form>
              {/* Turf Status */}
              <div className="d-flex justify-content-center align-items-center mt-4">
                <h3 className="fw-bolder fs-1">{isChecked?"You are Open":"You are Closed"}</h3>
               <Form.Check
  type="switch"
  
  checked={isChecked}

  onChange={handleStatus}
  className="align-middle"
  style={{
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem',        
    fontWeight: 'bold',        
    color: isChecked ? '#28a745' : 'red' 
  }}
/>
              </div>
              <hr />
              <label htmlFor="date">Pick a date:</label>
        <input type="date" className='form-control' id='date'  value={date} onChange={(e)=>setDate(e.target.value)}/>
              {/* Date Picker */}
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                {/* <DatePicker
                  className="mt-4"
                  label="Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { variant: "outlined" } }}
                /> */}
              {/* </LocalizationProvider> */}

              <hr />

              {/* Available Time Slots */}
              <h4 className="mt-4">Slots free for {date}</h4>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {availableSlots?.filter(slot => !bookedSlots.includes(slot)).map((slot) => (
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
              <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Slot removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Are you sure to remove following slot?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Cancel
          </Button>
          <Button variant="primary"  onClick={handleBooking}>Confirm</Button>
        </Modal.Footer>
      </Modal>


              {/* Booked Time Slots */}
              <h4 className="mt-4">Booked Time Slots for {date}</h4>
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
   
    <Container className="mt-4 p-0" style={{border:"1px solid green",borderRadius:"8px"}}>
      <Card>
        <Card.Header as="h4" className='text-center bg-success text-light'>{Object.keys(fetchTurfData).length > 0 ?"Edit":"Add"} Your Arena   <button onClick={() => setOpen(!open)} className="btn btn-sm btn-light ">
            <i className="fa-solid fa-angle-down "></i>
          </button></Card.Header>
          <Collapse  in={open}>
        <Card.Body>
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Venue Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter venue name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            
            
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Map</Form.Label>
              <Form.Control
                type="text"
                placeholder="Map Link"
                value={map}
                onChange={(e) => setMap(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
  <Form.Label className='fw-bold'>Sports Available</Form.Label>
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
              <Form.Label className='fw-bold'  >Amenities</Form.Label>
             <div className='d-flex flex-wrap gap-4'>
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
             ))}</div>
            </Form.Group>
            <Form.Group className="mb-3">
            
              <Form.Label className='fw-bold'>Available Time Slots</Form.Label>
            <div className='d-flex flex-wrap gap-4'>
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
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Upload Turf Images</Form.Label>
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
        </Collapse>
      </Card>
    </Container>  
    
    
     
    </div>
  );
}

export default TurfForm;
