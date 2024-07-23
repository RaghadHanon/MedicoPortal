import React, { useContext } from "react";
import style from './Home.module.css'
import { Link } from 'react-router-dom'
import Features from '../Features/Features'
import introImg from "../../../public/introIm.png"
import { UserContext } from "../../Context/User";

function Home() {
  const { User, loggedIn } = useContext(UserContext);

  return (
    <>
      <div className={`container d-flex flex-lg-row flex-column justify-content-between flex-wrap align-items-center py-5 mb-5`}>
        <div className={`col-lg-5 col-12  color2 d-flex flex-column  align-self-stretch flex-wrap align-items-center justify-content-center gap-4`} >

          <h1 className={`lobsterFont ${style.transYU} ${style.colorAni} `}>Medico Portal</h1>

          <span className={` kiwiMaruFont text-center color1 `}>
            Welcome to Medico Portal – your medical care made simple.
            Find trusted professionals, access your medical records effortlessly, and manage your health with ease.
            Welcome to a world of convenience and well-being.
          </span>
          <span className={`lobsterFont mt-2  ${style.line} `}>
          </span>
          <span className={` kiwiMaruFont text-center color1`}>
            Join our MedicoPortal family now! Sign up and embark on your journey towards better health.
          </span>

          {loggedIn ?  <></>:<Link to="/Register" className={` ${style.transYD} fw-bolder text-decoration-none d-flex justify-content-around align-items-center  kiwiMaruFont ${style.joinButton}`}><span>Join Now </span><i className="ps-3 border-start fa-solid fa-location-arrow" style={{ color: "#eeeeee" }}></i></Link>
            }


        </div>
        <img className={`col-lg-7 col-12 ${style.transX}`} alt='Medical image' src={introImg} />
      </div>
      <Features />
    </>

  )
}

export default Home