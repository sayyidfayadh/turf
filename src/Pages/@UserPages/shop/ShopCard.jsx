
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PoolIcon from '@mui/icons-material/Pool'; // You can add more icons as per your need
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ShopCard() {
 const addToCart=()=>{

 }
  return (
    <div>
      <div className=' me-3'>
      <Card sx={{ width:"350px",maxHeight:"300px", borderRadius: "10px", position: 'relative' ,zIndex:'1',marginBottom:"3vh"}}>
      <Link to={`/viewproduct/:id`}>    
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{
              height: 180, // 
              objectFit: "cover" 
            }}
            image="./shopping.webp"
            alt="turf"
          />
          <CardContent className='d-flex justify-content-between align-items-center p-3 '>
        
          <div> <Typography gutterBottom variant="h5" component="div">
             Barca Home 24/25
            </Typography>
            </div> 
           <div>
             <p style={{fontSize:"2vh",color:"green"}}>₹ 200</p>
           </div>
      
          </CardContent>
        </CardActionArea>
        </Link>
      </Card>
    </div>
  </div>
  )
}

export default ShopCard