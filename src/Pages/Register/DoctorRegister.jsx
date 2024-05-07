import React, { useEffect, useState } from 'react'
import userDoctor from "../../../public/user-doctor.png"
import style from './DoctorRegister.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function DoctorRegister() {


  const navigate = useNavigate();

  const [MedSpeArray, setMedSpeArray] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    medicalSpecificationId: MedSpeArray[0],
    phoneNumber: "",
    address: ""

  });



  const GetMedSpe = async () => {
    try {
      const { data } = await axios.get(`/api/MedicalSpecification`);
      setMedSpeArray(data);
    } catch (e) {

      console.log(e);
    }
  }

  useEffect(() => {
    GetMedSpe();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/Authentication/register-doctor`, user);

      navigate("/Login");

      setUser({
        name: "",
        email: "",
        password: "",
        gender: "",
        medicalSpecificationId: MedSpe.medicalSpecificationId[0],
        phoneNumber: "",
        address: ""

      });
      toast.success("Sign up successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.response.data.title, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log(error.response.data.title);
    }


  };

  return (
    <div className={`${style.DocReg} d-flex justify-content-center py-5`}>
      <form onSubmit={handleSubmit} className={`${style.container} p-5 border d-flex flex-column gap-4`} >
        <div className={`d-flex flex-row flex-wrap justify-content-between align-items-end`}>
          <div className={`d-flex flex-column justify-content-between align-self-stretch col-5`}>
            <h5 className={`kiwiMaruFont color2 fw-semibold `}>Doctor Registration</h5>
            <div className={`d-flex flex-column gap-3 `}>
              <label htmlFor='name' className={`kiwiMaruFont color1  `}>Name</label>
              <input onChange={handleChange} value={user.name} type='text' name='name' id='name' className='' placeholder='Your full name' />
            </div>
          </div>
          <img src={userDoctor} alt='user-doctor' className={` col-3 me-5`} />
        </div>

        <div className={`d-flex flex-row flex-wrap justify-content-between `}>
          <div className={`d-flex flex-column gap-3 col-5`} >
            <label htmlFor='email' className={`kiwiMaruFont color1  `} >Email</label>
            <input onChange={handleChange} value={user.email} type='email' name='email' id='email' placeholder='Your email' />
          </div>
          <div className={`d-flex flex-column gap-3 col-5`}>
            <label htmlFor='password' className={`kiwiMaruFont color1  `} >Password</label>
            <input onChange={handleChange} value={user.password} type='password' name='password' id='password' placeholder='Choose a strong password' />
          </div>
        </div>

        <div className={`d-flex flex-row flex-wrap justify-content-between`}>
          <div className={`d-flex flex-column gap-3 col-5`}>
            <label htmlFor='phoneNumber' className={`kiwiMaruFont color1  `}>Phone Number</label>
            <input onChange={handleChange} value={user.phoneNumber} type='text' name='phoneNumber' id='phoneNumber' placeholder='Your phone number' />
          </div>
          <div className={`d-flex flex-column gap-3 col-5`}>
            <label htmlFor='address' className={`kiwiMaruFont color1  `}>Address</label>
            <input onChange={handleChange} value={user.address} type='text' name='address' id='address' placeholder='Your address' />
          </div>
        </div>

        <div className={`d-flex flex-row flex-wrap justify-content-between pt-2`}>
          <label htmlFor="medicalSpecificationId" className={`kiwiMaruFont color1  col-5`}>Medical specialization</label>

          <select onChange={handleChange} value={user.medicalSpecificationId} name='medicalSpecificationId' key={user.medicalSpecificationId} className={`kiwiMaruFont color1  col-5`}>


            {
              MedSpeArray.map((MedSpe) => (
                <>
                  <option value={MedSpe.medicalSpecificationId} key={MedSpe.medicalSpecificationId}>{MedSpe.name}</option>
                </>
              ))
            }
          </select>
        </div>

        <div className={`d-flex flex-row flex-wrap justify-content-between align-items-end`}>
          <div className={`d-flex flex-column gap-2  col-5`}>
            <label className={`kiwiMaruFont color1  `}>Gender</label>
            <div className={`d-flex justify-content-between`}>
              <div className={`d-flex gap-2 justify-content-start align-items-center`}>
                <input onChange={handleChange} type="radio" id="Male" name="gender" value='Male' />
                <label htmlFor="Male" className={`kiwiMaruFont color1  `}>Male</label>
              </div>
              <div className={`d-flex gap-2 justify-content-start align-items-center`}>
                <input onChange={handleChange} type="radio" id="Female" name="gender" value='Female' />
                <label htmlFor="Female" className={`kiwiMaruFont color1  `}>Female</label>
              </div>
            </div>

          </div>

          <input type='submit' value='Sign Up' className={`col-4 h-50 border-0 rounded kiwiMaruFont bgcolor2 whiteC`} />
        </div>



      </form>
    </div>
  )
}

export default DoctorRegister