import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import Header from "../../Components/Header/Header";
import "./ViewArena.css";
import PoolIcon from '@mui/icons-material/Pool';
import Footer from "../../Components/Footer/Footer";

function ViewArena() {
  const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");

  const onSelectSport = (sport) => {
    setSelectedSport(sport);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const sportEmojis = {
    cricket: "🏏",
    basketball: "🏀",
    football: "⚽",
    tennis: "🎾",
    default: "🏅",
  };

  const serviceEmojis = {
    'first aid': <MedicalServicesIcon />,
    'free wifi': "📶",
    'drinking water': "💧",
    'change rooms': "🚿",
    'pool':<PoolIcon/>,
    default: "🏅",
  };

  const services = [
    { id: "0", name: "First Aid" },
    { id: "2", name: "Free WiFi" },
    { id: "3", name: "Wash Rooms" },
    { id: "4", name: "Change Rooms" },
    { id: "5", name: "Drinking Water" },
    { id: "6", name: "Juice" },
    { id: "7", name: "Fitness Coach" },
    { id: "8", name: "Member's Lounge" },
    {id:"9"   ,name:"pool"}
  ];

  const sports = ["cricket", "football", "basketball"];

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
            <li className="breadcrumb-item active">Arena.x</li>
          </ol>
        </nav>
        <div className="container-fluid turfcont ps-5 pt-5 pe-5 pb-5 bg-light border">
          <div className="row">
            <div className="col-md-7">
              <p style={{ fontSize: "1.7rem", fontWeight: "bolder" }}>
                Venue X - Venue before Venue X
              </p>
              <p style={{ fontSize: "1.1rem" }}>Location and Rating</p>
              <img
                className="img-fluid"
                src="https://lh3.googleusercontent.com/p/AF1QipNfE8FuacZ265c5RxFrhgyAsSt2O_jiVKb96j6o=s680-w680-h510"
                alt="Venue"
               
              />
            </div>
            <div className="col-md-5 border p-3 mt-5">
              <Link to="/cart/id">
              <button className="btn btn-success btn-rounded w-100 p-3">Book Now</button> </Link>
              <div className="container border mt-4 mb-3">
                <p style={{ fontSize: "1.3rem", textDecoration: "underline" }}>
                  Timing
                </p>
                <p style={{ fontSize: "1.1rem" }}>24 Hour</p>
              </div>
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1964.5513545992062!2d76.32770343876646!3d10.00837439752437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080dc729310e4f%3A0xbcf47362f1dcdbbd!2sSportika%20Kochi%20Football%20Turf!5e0!3m2!1sen!2sin!4v1729417982985!5m2!1sen!2sin"
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
                {sports.map((sport) => {
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
                {services.map((service) => {
                  const emoji = serviceEmojis[service.name.toLowerCase()] || serviceEmojis.default;
                  return (
                    <div
                      key={service.id}
                      className="border rounded-lg p-4 d-flex flex-column align-items-center justify-content-center"
                      style={{ width: '80px', height: '80px' }}
                    >
                      <span className="fs-4 mb-2">{emoji}</span>
                      <span className="text-sm"  style={{fontSize:"0.6rem"}}>{service.name}</span>
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
          <Modal.Title>{selectedSport} Price Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Price information for {selectedSport} will go here.</p>
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