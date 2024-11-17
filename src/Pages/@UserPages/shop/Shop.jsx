import React from 'react'
import Header from '../../../Components/Header/Header'
import ShopCard from './ShopCard'

function Shop() {
  return (
    <div>
      <Header hideLocationElement={true}/>
      <div className="container-fluid mt-2 border ">
        <h3 className='p-3 text-center bg-success text-light '>
          Football
        </h3>
        <div className="container-fluid d-flex  text-center  justify-content-between flex-wrap " style={{backgroundColor:"whitesmoke"}}>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
       
        </div>
        <h3 className='p-2 bg-success text-center text-light '>
         Cricket
        </h3>
        <div className="container-fluid    d-flex justify-content-between flex-wrap " style={{backgroundColor:"whitesmoke"}}>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
       
        </div>
        <h3 className='p-2 bg-success  text-center  text-light '>
         Badminton
        </h3>
        <div className="container-fluid d-flex justify-content-between flex-wrap " style={{backgroundColor:"whitesmoke"}}>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
       
        </div>
      </div>
    </div>
  )
}

export default Shop