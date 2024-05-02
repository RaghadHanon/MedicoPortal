import React from 'react'
import DoctorRegister from './DoctorRegister'
import { NavLink } from 'react-router-dom'
import RegisterCard from './RegisterCard'
import doctorImg from '../../../public/doctorW.png'
import patientImg from '../../../public/PatientW.png'
import style from './Register.module.css'
function Register() {
  return (
    <div className={`${style.register} container kiwiMaruFont`}>
      <h3 className='text-center'>Register As</h3>
      <div className={`${style.rowCard}`}>
      <NavLink to="/Register/DoctorRegister">
          <RegisterCard userimg={doctorImg} title={"doctor"} />
        </NavLink>
        <NavLink to="/PatientRegister">
          <RegisterCard userimg={patientImg} title={"patient"} />
        </NavLink>
      </div>

    </div>
  )
}

export default Register