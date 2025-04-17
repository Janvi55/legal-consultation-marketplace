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
import ForgotPassword from './components/common/ForgetPassword'
import { AuthProvider } from './context/AuthContext'
import AdminLayout from './components/admin/AdminLayout'
import DashboardPage from './components/admin/DashboardPage'
import UserManagement from './components/admin/UserManagement'
import LawyerVerification from './components/admin/LawyerVerification'
import CaseManagement from './components/admin/CaseManagement'
import ActivityFeed from './components/admin/ActivityFeed'
import StatCard from './components/admin/StatCard'
import LawyerDashboard from './components/lawyer/LawyerDashboard'
import DashboardOverview from './components/lawyer/DashoardOverview'
import MyServices from './components/lawyer/MyServices'
import Appointments from './components/lawyer/AppointmentMangement'
import Consultations from './components/lawyer/Consultation'
import Availability from './components/lawyer/Avaibility'
import Profile from './components/lawyer/LawyerProfileManagement'
import AppointmentBookingById from './components/pages/AppointmentBookingById'



// function App() {
//   axios.defaults.baseURL="http://localhost:3000"
 

//   return (
    
//       <body>
//         {/* class="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
//         <div className='app-wrapper' */}
//         <div>  
// <UserNavbar></UserNavbar>
//     <Routes>
//       <Route path='/login' element={<Login/>}></Route>
//       <Route path='/signup' element={<Signup/>}></Route>
//       <Route path="/" element= {<LandingPage/>}></Route>
//       <Route path='/forgotpassword/:token' element={<ForgotPassword/>}></Route>
//       <Route path ="/resetpassword/:token" element={<ResetPassword/>}></Route>
//       <Route path="" element={<PrivateRoutes/>}></Route>
//       <Route path="/Contact" element={<Contact/>}/>
//       <Route path='/services' element={<Services/>}></Route>
//       <Route path="/appointment" element={<Appointment/>}/>
//       <Route path="/about" element={<About/>}></Route>
//       <Route path="/user" element={<UserProfile/>}>
//       <Route path="profile" element={<UserProfile/>}></Route>
//       </Route>
//       <Route path="/lawyer/:lawyerId" element={<LawyerProfile />} />
//       <Route path='/lawyer' element={<LawyerDirectory/>}></Route>
//     </Routes>
//         </div>

//       </body> 
    
//   )
// }

// export default App

function AppWrapper() {
  // Set base URL for axios
  axios.defaults.baseURL = "http://localhost:3000"

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

function AppContent() {
  return (
    // <div className="app-wrapper">
    <div>
      <UserNavbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/forgotpassword/:token' element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/:lawyerId" element={<AppointmentBookingById />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/user/profile" element={<UserProfile />} />
          
        </Route>
        <Route path="/Contact" element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/lawyer/:lawyerId" element={<LawyerProfile />} />
        <Route path='/lawyerdirectory' element={<LawyerDirectory />} />


        <Route path ="/admin"element={<AdminLayout />}>
       <Route path='stat' element={<StatCard/>}/>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="lawyers" element={<LawyerVerification />} />
        <Route path="cases" element={<CaseManagement />} />
        <Route path='activity' element={<ActivityFeed/>}/>
</Route>

        <Route path="/lawyer" element={<LawyerDashboard />}>
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="services" element={<MyServices />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="availability" element={<Availability />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      
      
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default AppWrapper
