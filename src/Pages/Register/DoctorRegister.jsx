import React from 'react'
import userDoctor from "../../../public/user-doctor.png"
import style from './DoctorRegister.module.css'


function DoctorRegister() {

  let user = {
    Name:'',

  }
  return (
    <div className={`${style.DocReg} d-flex justify-content-center py-5`}>
      <form className={`${style.container} p-5 border d-flex flex-column gap-4`}>
        <div className={`d-flex flex-row flex-wrap justify-content-between align-items-end`}>
          <div className={`d-flex flex-column justify-content-between align-self-stretch col-5`}>
            <h5 className={`kiwiMaruFont color2 fw-semibold `}>Doctor Registration</h5>
            <div className={`d-flex flex-column gap-3 `}>
              <label htmlFor='Name' className={`kiwiMaruFont color1  `}>Name</label>
              <input type='text' name='Name' id='Name' className='' placeholder='Your full name' />
            </div>
          </div>
          <img src={userDoctor} alt='user-doctor' className={`col-3 me-5`} />
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

        <div className={`d-flex flex-row flex-wrap justify-content-between`}>
          <div className={`d-flex flex-column gap-3 col-5`}>
            <label htmlFor='PhoneNumber' className={`kiwiMaruFont color1  `}>Phone Number</label>
            <input type='text' name='PhoneNumber' id='PhoneNumber' placeholder='Your phone number'/>
          </div>
          <div className={`d-flex flex-column gap-3 col-5`}>
            <label htmlFor='Address' className={`kiwiMaruFont color1  `}>Address</label>
            <input type='text' name='Address' id='Address' placeholder='Your address'/>
          </div>
        </div>

        <div className={`d-flex flex-row flex-wrap justify-content-between pt-2`}>
          <label htmlFor="MedSpe" className={`kiwiMaruFont color1  col-5`}>Medical specialization</label>
          <select name='MedSpe' id='MedSpe'  className={`kiwiMaruFont color1  col-5`}>
            {
              
            }
          </select>
        </div>

        <div className={`d-flex flex-row flex-wrap justify-content-between align-items-end`}>
          <div className={`d-flex flex-column gap-2  col-5`}>
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
  )
}

export default DoctorRegister