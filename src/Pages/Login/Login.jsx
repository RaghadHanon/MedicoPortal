import React, { useEffect, useState,useContext } from 'react'
import logo from '../../../public/logo-modified.png'
import { NavLink, useNavigate } from 'react-router-dom'
import style from './Login.module.css'
import axios from 'axios'
import { UserContext } from "../../Context/User";

function Login() {
  const {User, setUserToken } = useContext(UserContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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
      const { data } = await axios.post('https://localhost:7281/api/Authentication/login', user);
      
      localStorage.setItem("userToken" ,data.token);
      setUser({
        email: "",
        password: "",
      });
      setUserToken(data.token);
      
      navigate("/");
    } catch (e) {
      console.log(e);
    }

  
  };

  return (
    <div><section className="">
      <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">

                <div className="col-md-6 w-100 col-lg-7 d-flex align-items-center kiwiMaruFont">
                  <div className="card-body px-4 px-lg-5 text-black">
                    <form onSubmit={handleSubmit} className={`${style.login}`}>
                      <div className="d-flex flex-column align-items-center  justify-content-center">
                        <img className="fas fa-cubes fa-2x " src={logo} style={{ width: '60%' }} />
                      </div>
                      <div className={`d-flex flex-column gap-3 mb-4 `} >
                        <label htmlFor='email' className={`kiwiMaruFont color1  `} >Email</label>
                        <input onChange={handleChange} value={user.email} type='email' name='email' id='email' placeholder='Your email' />
                      </div>
                      <div className={`d-flex flex-column gap-3 mb-4`}>
                        <label htmlFor='password' className={`kiwiMaruFont color1  `} >Password</label>
                        <input onChange={handleChange} value={user.password} type='password' name='password' id='password' placeholder='Your password' />
                      </div>
                      <div className="pt-1 mb-4 d-flex align-items-center justify-content-center">
                      <input type='submit' value='Log in' className={`col-4 h-50 border-0 rounded kiwiMaruFont bgcolor2 whiteC`} />
                      </div>
                      <div className='w-100 text-center'>
                        <NavLink to="/Register" className="mb-5 pb-lg-2 color1 text-decoration-none" >Don't have an account? Register here</NavLink>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></div>

  )
}

export default Login