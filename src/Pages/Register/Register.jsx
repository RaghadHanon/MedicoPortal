import React from 'react'
import DoctorRegister from './DoctorRegister'
import { NavLink } from 'react-router-dom'
import RegisterCard from './RegisterCard'
import doctorImg from '../../../public/doctorW.png'
import patientImg from '../../../public/PatientW.png'
import style from './Register.module.css'
function Register() {
  return (
    <div className={`${style.allregister} d-flex justify-content-center `}> 
      <div className={`${style.register}  kiwiMaruFont border py-4 `}>
        <h5 className='text-center py-2 color1  '>You want to use Medico Portal as a </h5>
        <div className={`${style.rowCard} d-flex justify-content-center `}>
          <NavLink to="/DoctorRegister">
            <RegisterCard userimg={doctorImg} title="Doctor" />
          </NavLink>
          <span className='text-center color1 '>Or</span>
          <NavLink to="/PatientRegister">
            <RegisterCard userimg={patientImg} title="Patient" />
          </NavLink>
        </div>
        <NavLink to="/Login" className='text-decoration-none color1 py-2'>
          <span > Already has an account? login</span>
        </NavLink>

      </div>

    </div>
  )
}

export default Register