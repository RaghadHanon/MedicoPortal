import React ,{useContext } from "react";
import { NavLink ,useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../public/logoTheme3C.png";
import { UserContext } from "../Context/User.jsx";

import doctorImg from '../../public/doctorW.png'
import patientImg from '../../public/PatientW.png'

function NavBar() {
  const location = useLocation();
  const { User, loggedIn, setLoggedIn, setUserToken } = useContext(UserContext);
 

  const logOut = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setLoggedIn(false);
  };

  return (
    
    <nav
      className={`navbar navbar-expand-lg p-0 sticky-top ${style.NavStyle} `}
    >
      <div className={`container-fluid container`}>
        <NavLink to="/">
          <img src={logo} className={style.NavLogo} />
        </NavLink>

        <button
          className={`navbar-toggler ${style.navbarToggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars" style={{ color: "#EEEEEE" }}></i>
        </button>
        <div className="collapse navbar-collapse m-2 kiwiMaruFont" id="navbarNav">
          <ul className="navbar-nav flex-grow-1 gap-2">
            <li className="nav-item" >

              <NavLink
                className={`nav-link   color4 letterSpace
                ${ location.pathname.endsWith("/") ? "fw-semibold" : ""} 
                
                `}
                
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item" >

              <NavLink
                className={`nav-link    color4 letterSpace
                ${ location.pathname.includes("Features") ? "fw-semibold" : ""} 
                `}
                to="/Features"
                
              >
                Features
              </NavLink>
            </li>
           
            <li className="nav-item" >
              <NavLink
                className={`nav-link   color4 letterSpace d-flex gap-2 
                ${ location.pathname.includes("Doctors") ? "fw-semibold" : ""} 
                `}
                to="/Doctors"
              >
                Doctors
              </NavLink>
            </li>

            <li className="nav-item" >
              <NavLink
                className={`nav-link   color4 letterSpace d-flex gap-2 
                ${ location.pathname.includes("MedicalSpecifications") ? "fw-semibold" : ""} 
                `}
                to="/MedicalSpecifications"
              >
                MedicalSpecifications
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav  align-self-end gap-2" >
            {loggedIn ? (
              <li className="nav-item dropdown d-flex mt-sm-1 justify-content-start gap-2 align-items-sm-center">
                <img
                  src={User.role=="Doctor"?doctorImg:patientImg}
                  className={`${style.userImage}`}
                />
                <a
                  className="nav-link dropdown-toggle fs-6 text-capitalize  crushedFont  color4 letterSpace"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {User.name}
                </a>
                <ul className="dropdown-menu bgcolor2 border-0  ">
                  <li className={`${style.dropdownItem}`} >
                    <NavLink
                      className={`${style.dropdownItem} color4  fs-6  kiwiMaruFont   `}
                      to={User.role=="Doctor"? `/DoctorProfile/${User.name}`:"/PatientProfile"}
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className={`${style.dropdownItem}`}>
                    <NavLink
                      className={`${style.dropdownItem} color4 fs-6  kiwiMaruFont   `}
                      onClick={logOut}
                    >
                      Log out
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item ">
                  <NavLink
                    className={`nav-link fs-6  kiwiMaruFont  color4 letterSpace`}
                    to="/Login"
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link fs-6  kiwiMaruFont  color4 letterSpace`}
                    to="/Register"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;