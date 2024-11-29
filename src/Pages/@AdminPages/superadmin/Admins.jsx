import React, { useEffect, useState } from "react";
import { addAdminAPI, getAllAdminsAPI } from "../../../Services/AllAPI";
import SuperHeader from "./SuperHeader";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [search,setSearch]=useState("")
  const searchAdmins=admins.filter((admin)=>admin.username.toLowerCase().includes(search.toLowerCase()))
  const [newAdmin,setNewAdmin]=useState({
    username:"",
    email:"",
    role:"turfadmin",
    password:""
  })
  useEffect(() => {
    getAdmins();
  }, []);
  const getAdmins = async () => {
   try {
    const result = await getAllAdminsAPI();
    if(result.status===200){
    setAdmins(result.data);}
   } catch (error) {
    console.log(error);
    
   }
  };
  const[open,setOpen]=useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAdd=async()=>{
try {
  const result=await addAdminAPI(newAdmin)
if (result.status==201){
  handleClose()
  toast.success("admin added")
  getAdmins()
}else{
  toast.error("error adding admin")
}
} catch (error) {
 console.error(error) 
}
  }
  return (
    <div>
      <ToastContainer position="top-center"/>
      <SuperHeader />
      <div className="d-flex justify-content-between  p-4 border">
      <h1>All Admins</h1>

        <input
        className="me-5 form-control w-25"
          type="text"
          placeholder="Search Admins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         
        />
        
      </div>
      <div className="d-flex flex-wrap mt-4 align-items-center" style={{ gap: "50px" }}>
      <div className="ms-3 d-flex align-items-center justify-content-center" 
onClick={handleOpen}
            style={{
              border: "1px solid #e0d9d9",
              borderRadius: "10px",
              padding: "20px",
              width:"190px",
              height:"195px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          > <i className="fa-solid fa-plus fa-flip fa-2xl"></i>
            Add an admin
            </div>
            <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Add Admin</h2>
     
              <TextField
                label="UserName"
                name="username"
                onChange={(e)=>setNewAdmin({...newAdmin,username:e.target.value})}
                fullWidth
                margin="normal"
              />
            
              <TextField
                label="E-mail"
                name="email"
                type="email"
                onChange={(e)=>setNewAdmin({...newAdmin,email:e.target.value})}
                fullWidth
                margin="normal"
              />
          
              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={(e)=>setNewAdmin({...newAdmin,password:e.target.value})}
                fullWidth
                margin="normal"
              />
      

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            style={{ marginTop: '20px' }}
            onClick={handleAdd}
          >
           Add Admin
          </Button>
        </Box>
      </Modal>
        {searchAdmins.map((admin) => (
          <div
            key={admin.id}
            style={{
              border: "1px solid #e0d9d9",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ margin: 0 }}>{admin.username}</h3>
            <p>Email: {admin.email}</p>
            <p>Role: {admin.role}</p>
            <div style={{ marginTop: "10px" }}>
              <button className="btn btn-danger">Remove Admin role</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admins;
