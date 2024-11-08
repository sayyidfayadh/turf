import React from 'react'
import Header from '../../../Components/Header/Header'
import ShopCard from './ShopCard'

function Shop() {
  return (
    <div>
      <Header hideLocationElement={true}/>
      <div className="container-fluid mt-2 border p-3">
        <h3 className='p-3 bg-success text-light mb-3'>
          Football
        </h3>
        <div className="container-fluid d-flex justify-content-between flex-wrap gap-3 p-5" style={{backgroundColor:"whitesmoke"}}>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
       
        </div>
        <h3 className='p-3 bg-success text-light mb-3'>
         Cricket
        </h3>
        <div className="container-fluid d-flex justify-content-between flex-wrap gap-3 p-5" style={{backgroundColor:"whitesmoke"}}>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
          <ShopCard/>
       
        </div>
        <h3 className='p-3 bg-success text-light mb-3'>
         Badminton
        </h3>
        <div className="container-fluid d-flex justify-content-between flex-wrap gap-3 p-5" style={{backgroundColor:"whitesmoke"}}>
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