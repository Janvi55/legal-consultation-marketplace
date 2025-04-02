import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserNavbar from './components/layouts/UserNavbar'

// import './App.css'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import { Route, Routes } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import LawyerProfile  from './components/lawyer/LawyerProfile'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import LandingPage from './components/common/LandingPage'
import PrivateRoutes from './hooks/PrivateRoutes'
import Contact from './components/pages/contact'
import Appointment from './components/pages/Appointment'

import About from './components/pages/About'
import { ResetPassword } from './components/common/ResetPassword'
import LawyerDirectory from './components/lawyer/LawyerDirectory'
import Services from './components/pages/Services'



function App() {
  axios.defaults.baseURL="http://localhost:3000"
 

  return (
    
      <body>
        {/* class="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
        <div className='app-wrapper' */}
        <div>  
<UserNavbar></UserNavbar>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path="/" element= {<LandingPage/>}></Route>
      <Route path ="/resetpassword/:token" element={<ResetPassword/>}></Route>
      <Route path="" element={<PrivateRoutes/>}></Route>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path='/services' element={<Services/>}></Route>
      <Route path="/appointment" element={<Appointment/>}/>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/user" element={<UserProfile/>}>
      <Route path="profile" element={<UserProfile/>}></Route>
      </Route>
      <Route path="/lawyer/:lawyerId" element={<LawyerProfile />} />
      <Route path='/lawyer' element={<LawyerDirectory/>}></Route>
    </Routes>
        </div>

      </body> 
    
  )
}

export default App
