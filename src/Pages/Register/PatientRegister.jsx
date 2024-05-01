import React, { useState } from 'react'
import userDoctor from "../../../public/user-solid 1.png"
import style from './DoctorRegister.module.css'

function PatientRegister() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    gender: '',
  });

  return (
    <>
    <div className={`${style.DocReg} d-flex justify-content-center py-5`}>
       <form className={`${style.container} p-5 border d-flex flex-column gap-4`}>
        <div className={`d-flex flex-row flex-wrap justify-content-between align-items-end`}>
          <div className={`d-flex flex-column justify-content-between align-self-stretch col-5`}>
            <h5 className={`kiwiMaruFont color2 fw-semibold `}>Patient Registration</h5>
            <div className={`d-flex flex-column gap-3 `}>
              <label htmlFor='Name' className={`kiwiMaruFont color1  `}>Name</label>
              <input type='text' name='Name' id='Name' className='' placeholder='Your full name' />
            </div>
          </div>
          <img src={userDoctor} alt='user-patient' className={`col-3 me-5`} />
        </div>

        <div className={`d-flex flex-row flex-wrap justify-content-between `}>
          <div className={`d-flex flex-column gap-3 col-5`} >
            <label htmlFor='Email' className={`kiwiMaruFont color1  `} >Email</label>
            <input type='Email' name='Email' id='Email' placeholder='Your email'/>
          </div>
          <div className={`d-flex flex-column gap-3 col-5`}>
            <label htmlFor='Password' className={`kiwiMaruFont color1  `} >Password</label>
            <input type='Password' name='Password' id='Password' placeholder='Choose a strong password'/>
          </div>
        </div>

        

        <div className={`d-flex flex-row flex-wrap justify-content-between align-items-end`}>
          <div className={`d-flex flex-column gap-3  col-5`}>
            <label className={`kiwiMaruFont color1  `}>Gender</label>
            <div className={`d-flex justify-content-between`}>
              <div className={`d-flex gap-2 justify-content-start align-items-center`}>
                <input type="radio" id="Male" name="Gender" value='Male' />
                <label for="Male" className={`kiwiMaruFont color1  `}>Male</label>
              </div>
              <div className={`d-flex gap-2 justify-content-start align-items-center`}>
                <input type="radio" id="Female" name="Gender" value='Female' />
                <label for="Female" className={`kiwiMaruFont color1  `}>Female</label>
              </div>
            </div>

          </div>

          <input type='submit' Value='Sign Up' className={`col-4 h-50 border-0 rounded kiwiMaruFont bgcolor2 whiteC`} />
        </div>
      </form>

    </div>
    </>
  )
}

export default PatientRegister