
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import TurfAdmin from './Pages/@AdminPages/turfadmin/TurfAdmin'
import UserHome from './Pages/@UserPages/UserHome'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Booking from './Pages/@UserPages/Booking'
import ViewArena from './Pages/@UserPages/ViewArena'
import SlotBooking from './Pages/@UserPages/SlotBooking'
import UserProfile from './Pages/@UserPages/UserProfile'
import Shop from './Pages/@UserPages/shop/Shop'
import ViewProduct from './Pages/@UserPages/shop/ViewProduct'
import ShopCart from './Pages/@UserPages/shop/ShopCart'
// import AdminHome from './Pages/@AdminPages/superadmin/AdminHome'
// import TurfForm from './Pages/@AdminPages/turfadmin/turfForm'
import Profile from './Pages/@AdminPages/turfadmin/Profile'
import AdminHome from './Pages/@AdminPages/superadmin/AdminHome'
import AddMerchandise from './Pages/@AdminPages/superadmin/AddMerchandise'

import { TokenAuthContext } from './ContextAPI/TokenAuth'
import { useContext } from 'react'
import TurfForm from './Pages/@AdminPages/turfadmin/TurfForm'

function App() {
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  return (
    <>
    
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      
      <Route path='/booking' element={<Booking/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/home' element={<UserHome/>}/>
      <Route path='/view/:id' element={<ViewArena/>} />
      <Route path='/viewproduct/:id' element={<ViewProduct/>} />
      <Route path='/shopcart' element={<ShopCart/>}/>
      <Route path='/cart/:id' element={<SlotBooking/>} />
      <Route path='/profile/' element={<UserProfile/>} />
      
      //admin
      <Route path='/admin' element={<AdminHome/>}/>
      <Route path='/addproducts' element={<AddMerchandise/>}/>
      //TurfAdmin
      <Route path='/turfadmin' element={<TurfAdmin/>}/>
      <Route path='/adminprofile' element={isAuthorized?<Profile/>:<TurfForm/>}/>
      <Route path='/addturf' element={<TurfForm/>}/>
      
    </Routes>
    
     
    </>
  )
}

export default App
