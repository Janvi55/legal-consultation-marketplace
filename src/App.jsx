import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


// import './App.css'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import { Route, Routes, useLocation } from 'react-router-dom'

import axios from 'axios'
import { ToastContainer } from 'react-toastify'

import { ResetPassword } from './components/common/ResetPassword'
import  { LawyerDashBoard } from './components/lawyer/LawyerDashboard'

import { LawyerSignup } from './components/common/LawyerSignup'
import { LawyerLogin } from './components/common/LawyerLogin'
import { LawyerResetPassword } from './components/common/LawyerResetPassword'
import { LawyerForgotPassword } from './components/common/LawyerForgotPassword'
import { ContactUs } from './components/common/ContactUs'
import { SelectRole } from './components/common/SelectRole'
import { SelectLoginRole } from './components/common/SelectLoginRole'
import { AdminLogin } from './components/common/AdminLogin'
import AdminPrivateRoute from './hooks/AdminPrivateRoutes'
import { AdminSideBar } from './components/layouts/AdminSideBar'
import AdminDashBoard from './components/admin/AdminDashBoard'
import AdminAppointmentsCalendar from './components/admin/AdminAppointmentCalendar'
import AdminUserManagement from './components/admin/AdminUserManagement'
import AdminLawyerManagement from './components/admin/AdminLawyerManagement'
import LawyerProfileForAdmin from './components/admin/LawyerProfileForAdmin'
import PaymentHistory from './components/admin/PaymentHistory'
import AdminReviewManagement from './components/admin/AdminReviewManagement'
import UserPrivateRoute from './hooks/UserPrivateRoutes'
import { UserDashBoard } from './components/user/UserDashBoard'
import { AddAppointment } from './components/user/AddAppointment'
import { AddQuery } from './components/user/AddQuery'
import { AddReview } from './components/user/AddReview'
import { ViewMyAppointments } from './components/user/ViewMyAppintments'
import { ViewMyQueries } from './components/user/ViewMyQueries'
import { UpdateMyAppointment } from './components/user/UpdateMyAppointment'
import ViewAllLawyers from './components/user/ViewAllLawyers'
import ViewMyPayments from './components/user/ViewMyPayments'
import LawyerPrivateRoute from './hooks/LawyerPrivateRoutes'
import { LawyerSidebar } from './components/layouts/LawyerSideBar'
import { ViewAppointments } from './components/lawyer/ViewAppointments'
import { ViewAllQueries } from './components/lawyer/ViewAllQueries'
import MyProfile from './components/lawyer/MyProfile'
import { SupportSignup } from './components/supportTeam/SupportSignup'
import { SupportLogin } from './components/supportTeam/supportLogin'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import LandingPage from './components/common/LandingPage'
import { ForgotPassword } from './components/common/ForgotPassword'
import { UserSidebar } from './components/layouts/UserSidebar'
import { ViewMyReviews } from './components/user/ViewMyReviews'
import LawyerProfile from './components/user/LawyerProfile'
import Home from './components/common/HomePage'
import About from './components/common/About'


const shouldApplyAppWrapper = (pathname) => {
  const  noWrapperPaths = [
    '/Login',
    '/signup',
    '/Home',
    '/about',
    '/lawyerSignup',
    '/lawyerLogin',
    '/resetPassword',
    '/forgotPassword',
    '/lawyerForgotPassword',
    '/contactUs',
    '/lawyerResetPassword',
    '/selectRole',
    '/selectLoginRole',
    '/adminLogin'
    

  ];


if (pathname === '/') return false;

return !noWrapperPaths.some(path => pathname.startsWith(path));
};




function App() {


  const [count, setCount] = useState(0)

  axios.defaults.baseURL = "http://localhost:3000";

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = "";
    }

    else {
      document.body.className = "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";

    }

  }, [location.pathname]);

  return (
    <div className={shouldApplyAppWrapper(location.pathname) ? "app-wrapper" : "/user"}>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
        <Route path='/lawyerSignup' element={<LawyerSignup/>}></Route>
        <Route path='/lawyerLogin' element={<LawyerLogin/>}></Route>
        <Route path='/resetPassword/:token' element={<ResetPassword/>}></Route>
        <Route path='/lawyerResetPassword/:token' element={<LawyerResetPassword/>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/lawyerForgotPassword' element={<LawyerForgotPassword/>}></Route>
        <Route path='/contactUs' element={<ContactUs/>}></Route>
        <Route path='/selectRole' element={<SelectRole/>}></Route>
        <Route path='/selectLoginRole' element={<SelectLoginRole/>}></Route>
        <Route path='/adminLogin' element={<AdminLogin/>}></Route>
        

        <Route path='' element={<AdminPrivateRoute/>}>
        <Route path='/admin' element={<AdminSideBar/>}>
        <Route path='adminDashBoard' element={<AdminDashBoard/>}></Route>
        <Route path='calendar' element={<AdminAppointmentsCalendar/>}></Route>
        <Route path='userManagement' element={<AdminUserManagement/>}></Route>
        <Route path='lawyerManagement' element={<AdminLawyerManagement/>}></Route>
        <Route path='lawyerProfile/:lawyerId' element={<LawyerProfileForAdmin/>}></Route>
        <Route path='getAllPayments' element={<PaymentHistory/>}></Route>
        <Route path='getAllReviews' element={<AdminReviewManagement/>}></Route>
        </Route>
        </Route> 

        <Route path="" element={<UserPrivateRoute/>}>
        <Route path='/user' element={<UserSidebar/>}>

          <Route path='userDashBoard' element={<UserDashBoard/>}></Route>
          <Route path='addAppointment' element={<AddAppointment/>}></Route>
          <Route path='addQuery' element={<AddQuery/>}></Route>
          <Route path='addReview' element={<AddReview/>}></Route>
          <Route path='viewMyAppointments' element={<ViewMyAppointments/>}></Route>
          <Route path='viewMyQueries' element={<ViewMyQueries/>}></Route>
          <Route path='viewMyReviews' element={<ViewMyReviews/>}></Route>
          <Route path='updateAppointment/:id' element={<UpdateMyAppointment/>}></Route>
          <Route path='viewAllLawyers' element={<ViewAllLawyers/>}></Route>
          <Route path='lawyer/:lawyerId' element={<LawyerProfile/>}></Route>
          <Route path='viewMyPayments' element={<ViewMyPayments/>}></Route>


        </Route>
        </Route>
        <Route path='' element={<LawyerPrivateRoute/>}>
        <Route path='/lawyer' element={<LawyerSidebar />}>
          <Route path='viewAppointments' element={<ViewAppointments/>}></Route>
          <Route path='viewAllQueries' element={<ViewAllQueries/>}></Route>
          <Route path='lawyerDashBoard' element={<LawyerDashBoard/>}></Route>
          <Route path='myProfile' element={<MyProfile/>}></Route>
          
        </Route>
        </Route>
        <Route path='/support_team' element={<LawyerSidebar />}>
          <Route path='supportsignup' element={<SupportSignup />}></Route>
          <Route path='supportlogin' element={<SupportLogin />}></Route>
        </Route>
        
      </Routes> 


    </div>
  )
}

export default App

// ------------------------------------------------

// function AppWrapper() {
//   // Set base URL for axios
//   axios.defaults.baseURL = "http://localhost:3000"

//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   )
// }

// function AppContent() {
//   return (
//     // <div className="app-wrapper">
//     <div>
//       <UserNavbar />
//       <Routes>
//         <Route path='/login' element={<Login />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path="/" element={<LandingPage />} />
//         <Route path='/forgotpassword/:token' element={<ForgotPassword />} />
//         <Route path="/resetpassword/:token" element={<ResetPassword />} />
//         <Route path="/appointment" element={<Appointment />} />
//         <Route path="/appointment/:lawyerId" element={<AppointmentBookingById />} />
//         <Route element={<PrivateRoutes />}>
//           <Route path="/user/profile" element={<UserProfile />} />
          
//         </Route>
//         <Route path="/Contact" element={<Contact />} />
//         <Route path='/services' element={<Services />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/lawyer/:lawyerId" element={<LawyerProfile />} />
//         <Route path='/lawyerdirectory' element={<LawyerDirectory />} />


//         <Route path ="/admin"element={<AdminLayout />}>
//        <Route path='stat' element={<StatCard/>}/>
//         <Route path="dashboard" element={<DashboardPage />} />
//         <Route path="users" element={<UserManagement />} />
//         <Route path="lawyers" element={<LawyerVerification />} />
//         <Route path="cases" element={<CaseManagement />} />
//         <Route path='activity' element={<ActivityFeed/>}/>
// </Route>

//         <Route path="/lawyer" element={<LawyerDashboard />}>
//           <Route index element={<DashboardOverview />} />
//           <Route path="dashboard" element={<DashboardOverview />} />
//           <Route path="services" element={<MyServices />} />
//           <Route path="appointments" element={<Appointments />} />
//           <Route path="consultations" element={<Consultations />} />
//           <Route path="availability" element={<Availability />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
      
      
//       </Routes>
//       <ToastContainer />
//     </div>
//   )
// }

// export default AppWrapper
