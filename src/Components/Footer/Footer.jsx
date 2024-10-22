import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

function Footer() {
  return (
    <div>
        <div style={{color:'white',backgroundColor:"white"}}>
      <MDBFooter bgColor='success' className='text-center text-lg-start '>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Info</span>
        </div>
      </section>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className=' mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
              <i className="fa-solid fa-futbol ">Arena </i> 
              </h6>
              <p>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores odit error alias, dolorem enim vel praesentium pariatur nostrum dignissimos consequuntur voluptatibus architecto nemo porro reprehenderit omnis aliquam fugiat in. Dolorum.
              </p>
            </MDBCol>
            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Links</h6>
              <p>
                <a href='#!' className='text-reset'>
                Booking
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Team-Up
                </a>
              </p>        
              <p>
                <a href='#!' className='text-reset'>
                 Blogs
                </a>
              </p>
            
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Guides</h6>
              <p>
                React
              </p>
              <p>
             React Bootstrap
              </p>
              <p>
               Bootswatch
              </p>
              <p>
               MDBootsrap
              </p>
            </MDBCol>

         <MDBCol md='4' lg=''xl="4" className='mx-auto mb-md-0 mb-4'> 
              
        <div>
          <h2>Contact Us</h2>
         <div style={{display:'flex'}}>
         <input className='form-control w-50 me-2 mb-2' type="text"placeholder='your email id' />  <button className='mb-2 btn btn-rounded-pill btn-warning btn-sm'>Subscribe</button>
          </div> 
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>


        
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright: Arena. Built With React
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
         
        </a>
      </div>
    </MDBFooter> 
    </div>
    </div>
  )
}

export default Footer