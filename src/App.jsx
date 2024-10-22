
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import AdminHome from './Pages/@AdminPages/AdminHome'
import UserHome from './Pages/@UserPages/UserHome'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Booking from './Pages/@UserPages/Booking'
import ViewArena from './Pages/@UserPages/ViewArena'
import SlotBooking from './Pages/@UserPages/SlotBooking'
import UserProfile from './Pages/@UserPages/UserProfile'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/admin' element={<AdminHome/>}/>
      <Route path='/booking' element={<Booking/>}/>
      <Route path='/home' element={<UserHome/>}/>
      <Route path='/view/:id' element={<ViewArena/>} />
      <Route path='/cart/:id' element={<SlotBooking/>} />
      <Route path='/profile/' element={<UserProfile/>} />
    </Routes>`
    
     
    </>
  )
}

export default App
