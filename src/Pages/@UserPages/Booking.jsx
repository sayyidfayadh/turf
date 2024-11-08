import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, TextField } from "@mui/material";
import Cards from "../../Components/@UserComponents/Cards";
import { getAllTurfsAPI } from "../../Services/AllAPI";

function Booking() {
  const[allTurfs,setAllTurfs]=useState([])
  useEffect(()=>{
    getAllTurfs()
  },[])
  const getAllTurfs=async()=>{
   try {
    const result=await getAllTurfsAPI()
    console.log(result);
    
    setAllTurfs(result.data)
   } catch (error) {
    console.error(error.response ? error.response.data : error.message)
   }
  }
  const sports = ["badminton", "football", "cricket"];
  const [sport, setSport] = useState("all");
  const [location, setLocation] = useState("kochi");
  useEffect(() => {
    const locationFromLS = localStorage.getItem("location");
    if (locationFromLS) {
      setLocation(locationFromLS);
    }
  }, []);

  const handleSportsChange = (event, newValue) => {
    setSport(newValue);
    // Perform actions based on selected location
    console.log("Selected sport:", newValue);
    // Call an API or filter content based on location
  };
  return (
    <div>
      <Header />
      {/* <hr /> */}

      <div className="header p-4 bg-light border d-flex justify-content-between align-items-center flex-wrap">
       <div>
       <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
          Discover and Book Top Arenas in {location} online
        </p>
       </div>
        <div className="d-flex align-items-center  gap-">
          <div className="input-group d-flex ">
            <span className="input-group-text">
              <i className="fa fa-search" aria-hidden="true"></i>{" "}
              {/* Font Awesome search icon */}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by arena"
            />
</div>
            <Autocomplete
              sx={{
                width: "30vw",
                marginLeft: "1vh",
                outlineColor: "green",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
              options={sports}
              value={sport}
              onChange={handleSportsChange}
              renderInput={(params) => <TextField {...params} label="" />}
            />
        </div>
      </div>
      <div className="container-fluid d-flex flex-wrap gap-5 mt-2 ps-5 bg-light p-5">
           {allTurfs?.length>0 && allTurfs.map((turf)=>(
            <Cards key={turf._id} turf={turf}/>  
           )
           
           )

           }
          </div>
    </div>
  );
}

export default Booking;
