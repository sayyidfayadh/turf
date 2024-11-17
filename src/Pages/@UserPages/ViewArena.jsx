import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Carousel } from 'react-bootstrap';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import Header from "../../Components/Header/Header";
import "./ViewArena.css";
import PoolIcon from '@mui/icons-material/Pool';
import Footer from "../../Components/Footer/Footer";
import { getViewTurfAPI } from "../../Services/AllAPI";
import { Server_URL } from "../../Services/Server_URL";
import { SportsBasketball, SportsCricket, SportsFootball, SportsSoccer, SportsSoccerOutlined, SportsTennis, Wifi } from "@mui/icons-material";
import { Button } from "@mui/material";

function ViewArena() {
  const {id}=useParams()
  // console.log(id);
  const[viewTurfData,setViewTurfData]=useState({})
  // console.log(viewTurfData);
  
  useEffect(()=>{
    
    if(id){
      getViewTurf(id)
    }
    
  },[id])
  const getViewTurf=async(id)=>{
   try {
    const result=await getViewTurfAPI(id)
    const data=result.data
   setSports(data.sports.map(sport=>sport.name));
   setAmenities(data.amenities.map(amenity=>amenity));
    

    setViewTurfData(result.data)
   } catch (error) {
    console.error(error.response ? error.response.data : error.message)
   }
  }
  
  const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");

  const onSelectSport = (sportname) => {
    // console.log(sport);
    
    // setSelectedSport(sport);

    const gm=viewTurfData?.sports.find(sport=>sport['name']===sportname)
    console.log(gm);
    
    // console.log(gm.prices);
    setPrices(gm.prices)
    setShowModal(true);
  };
  const [prices,setPrices]=useState({})

  const handleClose = () => {
    setShowModal(false);
    setPrices("")
  };

  const sportEmojis = {
    cricket: <SportsCricket/>,
    basketball:<SportsBasketball/>,
    football: <SportsSoccerOutlined/>,
    tennis: <SportsTennis/>,
    badminton:'🏸',
    default: "🏅",
  };

  const amenityEmojis = {
    'first aid': <MedicalServicesIcon />,
    'free wifi': <Wifi/>,
    'drinking water': "💧",
    'change rooms': "🚿",
    'pool':<PoolIcon/>,
    default: "🏅",
  };

  const [amenities,setAmenities]=useState([])

  const [sports,setSports]=useState([])

  return (
    <div className="">
      <Header hideLocationElement={true} />
      <div className="bg-light">
        <nav className="pt-2 bg-light mt-1">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/booking" style={{ fontSize: "small" }}>
                booking
              </Link>
            </li>
            <li className="breadcrumb-item active">{viewTurfData.name}</li>
          </ol>
        </nav>
        <div className="container-fluid turfcont ps-5 pt-5 pe-5 pb-5 bg-light border">
          <div className="row">
            <div className="col-md-7">
              <p style={{ fontSize: "1.9rem", fontWeight: "bolder" }}>
               {viewTurfData.name},<span className="fs-3 fw-light">{viewTurfData.location}</span>
              </p>
              {/* <p style={{ fontSize: "1.1rem" }}>Location and Rating</p> */}
              {/* <img
                className="img-fluid"
                src="https://lh3.googleusercontent.com/p/AF1QipNfE8FuacZ265c5RxFrhgyAsSt2O_jiVKb96j6o=s680-w680-h510"
                alt="Venue"
               
              /> */}

<Carousel>
{viewTurfData.images && viewTurfData.images.length > 0?(viewTurfData.images.map((image,index)=> (
  <Carousel.Item key={index}>
        <img src={ `${Server_URL}/upload/${image}`} alt={`slide ${index+1}`} style={{width:"1000px"}}/>
        <Carousel.Caption style={{backgroundColor:"rgba(0, 0, 0, 0.2)",borderRadius:"10px"}}>
          <p className="text-decoration-underline" style={{fontSize:"1.8rem"}}>{viewTurfData.name}</p>
          {viewTurfData?.amenities?.length > 0 ? (
  viewTurfData.amenities.map((amenity, index) => (
    <span key={index} className="me-5">{amenity}</span>
  ))
) : (
 <></>
)}  
</Carousel.Caption>
   </Carousel.Item>
     ))
):(<></>)}
    </Carousel>
            </div>
            <div className="col-md-5 border p-3 mt-5">
              
              <button disabled={!viewTurfData.bookingStatus} className="btn btn-rounded btn-success fs-6 w-100 p-3" variant="contained" color="success" onClick={()=>navigate(`/cart/${viewTurfData._id}`)}>Book Now</button> 
              <div className="container border mt-4 mb-3">
                <p style={{ fontSize: "1.3rem", textDecoration: "underline" }}>
                  Timing 
                </p>
                <p style={{ fontSize: "1.1rem" }}>
                {viewTurfData.bookingStatus?"Open Now":"Closed Now"}
                </p>
              </div>
             
             <div className="map">
                <iframe
                  src={viewTurfData.map}
                  style={{ width: "100%", height: "350px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
             
            </div>
          </div>
          {/*available sprts  */}
          <div className="mt-4 row">
            <div className="col-12">
              <p className="text-lg font-bold">
                Sports available
                <span className="text-sm font-normal ml-2">
                  (Click on Sports to view price chart)
                </span>
              </p>
              <div className="d-flex flex-wrap gap-4">
                {sports.length>0 && sports.map((sport) => {
                  const emoji = sportEmojis[sport.toLowerCase()] || sportEmojis.default;
                  return (
                    <div
                      key={sport}
                      className="sportind border rounded-lg p-4 d-flex flex-column align-items-center justify-content-center cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => onSelectSport(sport)}
                      style={{ width: '120px', height: '120px' }}
                    >
                      <span className="fs-3 mb-2">{emoji}</span>
                      <span className="text-sm">{sport}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
{/* amenities */}
          <div className="mt-4 row">
            <div className="col-12">
              <p className="text-lg font-bold">Amenities</p>
              <div className="d-flex flex-wrap gap-4">
                {amenities.map((amenity,index) => {
                  const emoji = amenityEmojis[amenity.toLowerCase()] || amenityEmojis.default;
                  return (
                    <div
                      key={index}
                      className="border rounded-lg p-4 d-flex flex-column align-items-center justify-content-center"
                      style={{ width: '80px', height: '80px' }}
                    >
                      <span className="fs-4 mb-2">{emoji}</span>
                      <span className="text-sm"  style={{fontSize:"0.6rem"}}>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedSport} price chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {prices ? (
            Object.entries(prices).map(([key, value], index) => (
                <div key={index}>
                    <p>{key=='defaultPrice'?"regular fee":key}: ₹{value}</p>
                </div>
            ))
        ) : (
            <p>No price information available.</p>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer/>
    </div>
  );
}

export default ViewArena;