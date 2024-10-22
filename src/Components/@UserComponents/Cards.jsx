import React from 'react';
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

function Cards() {
  return (
    <div className=' me-3'>
      <Card sx={{ width:"350px", borderRadius: "10px", position: 'relative' ,zIndex:'1',marginBottom:"3vh"}}>
      <Link to={`/view/id`}>
      
        <CardActionArea>
          <CardMedia
            component="img"
            height="100vh"
            image="./turf.jpg"
            alt="turf"
          />
<div className='d-flex justify-content-between mt-1'>
<div className='d-flex'>
<StarIcon sx={{ fontSize: '1.2rem', color: 'gold' }} />
<Typography variant="body2" sx={{ marginLeft: '5px' }}>4.5</Typography>
</div>
         <div>
         <Box
            sx={{
              // width:'10 px',
              //  justifyContent:"flex-end",
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              color: 'white',
              padding: '5px',
              borderRadius: '0 10px 0 0',
            }}
          >
          
            <SportsSoccerIcon sx={{ fontSize: '1.2rem', marginLeft: '10px' }} />
            <PoolIcon sx={{ fontSize: '1.2rem', marginLeft: '5px' }} />
          </Box>
         </div>
         </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Arena X
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Kakkanad, Ernakulam
            </Typography>
          </CardContent>
        </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}

export default Cards;
