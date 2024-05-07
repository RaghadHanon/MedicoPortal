import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Root from './routs/Root'
import Features from './Pages/Features/Features';
import Doctors from './Pages/Doctors/Doctors';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Request from './Pages/Request/Request.jsx'
import DoctorProfile from './Pages/DoctorProfile/DoctorProfile';
import DoctorMS from './Pages/Doctors/DoctorMS.jsx'
import PatientProfile from './Pages/PatientProfile/PatientProfile';
import DoctorRegister from './Pages/Register/DoctorRegister'
import PatientRegister from './Pages/Register/PatientRegister'

import UserContextProvider from "./Context/User.jsx";
import MedicalSpecifications from './Pages/MedicalSpecifications/MedicalSpecifications.jsx'
import { ToastContainer } from 'react-toastify'

function App() {

  const router = createBrowserRouter([
    {
      element: <Root />,
      children: [{
        path: '/',
        element: <Home />,
      }, {
        path: '/Doctors',
        element: <Doctors />,
      }, {
        path: '/Features',
        element: <Features />,
      }, {
        path: '/Login',
        element: <Login />,
      }, {
        path: '/Register',
        element: <Register />,
      }, {
        path: '/PatientRegister',
        element: <PatientRegister />
      }, {
        path: '/DoctorRegister',
        element: <DoctorRegister />
      }, {
        path: '/DoctorProfile/:name',
        element: <DoctorProfile />
      }, , {
        path: '/PatientProfile',
        element: <PatientProfile />
      }, , {
        path: '/MedicalSpecifications',
        element: <MedicalSpecifications />
      },{
        path : '/Request/:name/:doctorId',
        element:<Request/>,
      },{
        path:'/DoctorMS/:msName/:msId',
        element:<DoctorMS/>
      }
      ]
    }
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>

    </>
  )
}

export default App
