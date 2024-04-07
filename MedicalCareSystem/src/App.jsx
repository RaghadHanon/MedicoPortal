import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Root from './routs/Root'
import Features from './Pages/Features/Features';
import Clinics from './Pages/Clinics/Clinics';
import Doctors from './Pages/Doctors/Doctors';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import DoctorProfile from './Pages/DoctorProfile/DoctorProfile';
import PatientProfile from './Pages/PatientProfile/PatientProfile';

function App() {

  const router = createBrowserRouter ([
    {
    element : <Root/> ,
    children : [{
      path : '/',
      element : <Home/>,
    },{
      path : '/Clinics',
      element : <Clinics/>,
    },{
      path : '/Doctors',
      element : <Doctors/>,
    },{
      path : '/Features',
      element : <Features/>,
    },{
      path : '/Login',
      element : <Login/>,
    },{
      path :'/Register',
      element : <Register/>
    },,{
      path :'/DoctorProfile',
      element : <DoctorProfile/>
    },,{
      path :'/PatientProfile',
      element : <PatientProfile/>
    },
  ]
  }
]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
