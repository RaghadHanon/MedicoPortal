import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Root from './routs/Root'
import Features from './Pages/Features/Features';
import Doctors from './Pages/Doctors/Doctors';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import DoctorProfile from './Pages/DoctorProfile/DoctorProfile';
import PatientProfile from './Pages/PatientProfile/PatientProfile';
import DoctorRegister from './Pages/Register/DoctorRegister'
import PatientRegister from './Pages/Register/PatientRegister'

import UserContextProvider from "./Context/User.jsx";

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
      },{
        path: '/PatientRegister',
        element: <PatientRegister />
      },{
        path: '/DoctorRegister',
        element: <DoctorRegister />
      },{
        path: '/DoctorProfile',
        element: <DoctorProfile />
      }, , {
        path: '/PatientProfile',
        element: <PatientProfile />
      },
      ]
    }
  ]);

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      
    </>
  )
}

export default App
