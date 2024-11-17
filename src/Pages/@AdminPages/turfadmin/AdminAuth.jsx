import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Header from '../../../Components/@AdminComponents/Header';
import { toast, ToastContainer } from 'react-toastify';
import { loginUserAPI } from '../../../Services/AllAPI';
import { TokenAuthContext } from '../../../ContextAPI/TokenAuth';
import { Server_URL } from '../../../Services/Server_URL';

function AdminAuth() {
  const [userData, setUserData] = useState({ role: 'tufadmin' });
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  const [email, setPartnerEmail] = useState('');
  const [message, setPartnerMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogin = async () => {
    const { email, password } = userData;
    if (!email || !password) {
      toast.warn("Please fill in all fields");
    } else {
      try {
        const result = await loginUserAPI(userData);
        if (result.status === 200) {
          sessionStorage.setItem("username", result.data.existingUser.username);
          sessionStorage.setItem("role", result.data.existingUser.role);
          sessionStorage.setItem("token", result.data.token);
          toast.success("Login successful");
          setIsAuthorized(true);
        } else {
          toast.warn(result.response || "Are you a partner yet? If not, send us a mail");
        }
      } catch (error) {
        console.error(error);
        toast.error("Login failed");
      }
    }
  };

  const handleSendMail = async () => {
  
  
    const payload = { email: email, message: message };
  
    try {
      const response = await fetch(`${Server_URL}/api/send-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();  
  
      if (response.ok) {
        toast.success(result.message); 
        handleCloseModal()
      } else {
        toast.error(result.message);  
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send email');
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer position="top-center" />
      <div className="bg-light container w-100 p-5 border mt-4"
           style={{
             maxWidth: '600px',
             height: '80vh',
             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
             borderRadius: '10px',
             display: 'flex',
             flexDirection: 'column'
           }}>
        <Row className="pt-2">
          <h1>Welcome to YourArena</h1>
          <div className="d-flex justify-content-center mb-4">
            <img src="./stadium.png" style={{ width: '150px', height: '150px' }} alt="aaa" />
          </div>
          <Col className="d-flex flex-column gap-4">
            <TextField label="E-mail" name="email" onChange={handleChange} fullWidth multiline rows={1} margin="normal" />
            <TextField label="Password" name="password" onChange={handleChange} fullWidth multiline rows={1} margin="normal" />
          </Col>
        </Row>

        <Button type="submit" variant="contained" color="success" className="w-100 mt-4 mb-4" onClick={handleLogin}>
          Login
        </Button>
        <Button onClick={handleOpenModal} variant="text" color="primary">
          Not a partner yet? Send us a mail
        </Button>
        

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Send Us a Mail</DialogTitle>
          <DialogContent>
            <TextField
              label="Your Email"
              value={email}
              onChange={(e) => setPartnerEmail(e.target.value)}
              fullWidth
              margin="normal"
              type="email"
              required
            />
            <TextField
              label="Send us details about you and your turf(mobile-no,name,details)"
              value={message}
              onChange={(e) => setPartnerMessage(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendMail} color="primary">
              Send Mail
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminAuth;
