import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Cards from "../../Components/@UserComponents/Cards";
import { getAllTurfsAPI } from "../../Services/AllAPI";

function Booking() {
  const[allTurfs,setAllTurfs]=useState([])
  const[search,setSearch]=useState("")
  const searchTurf=allTurfs.filter((turf)=>turf.name.toLowerCase().includes(search.toLowerCase()
  ))
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
 
  const [location, setLocation] = useState("kochi");
  useEffect(() => {
    const locationFromLS = localStorage.getItem("location");
    if (locationFromLS) {
      setLocation(locationFromLS);
    }
  }, []);


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
            </span>
            <input
              type="text"
              onChange={(e)=>setSearch(e.target.value)}
              className="form-control"
              placeholder="Search by arena"
            />
</div>
      
        </div>
      </div>
      <div className="container-fluid d-flex flex-wrap gap-5 mt-2 ps-5 bg-light p-5">
           {searchTurf?.length>0 && searchTurf.map((turf)=>(
            <Cards key={turf._id} turf={turf}/>  
           )
           
           )

           }
          </div>
    </div>
  );
}

export default Booking;
