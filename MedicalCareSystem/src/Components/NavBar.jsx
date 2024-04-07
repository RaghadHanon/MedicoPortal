import React from "react";
import { NavLink ,useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../public/logoTheme3C.png";
import Features from './../Pages/Features/Features';

function NavBar() {
  const location = useLocation();
 
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
          <i className="fa-solid fa-bars" style={{ color: "#fed9ed" }}></i>
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
            <li className="nav-item">
              <NavLink
                className={`nav-link   color4 letterSpace 
                ${ location.pathname.includes("Clinics") ? "fw-semibold" : ""} 
                `}
                
                to="/Clinics"
              >
                Clinics
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
          </ul>

          <ul className="navbar-nav  align-self-end gap-2" >
              <>
                <li className="nav-item ">
                  <NavLink
                    className={`nav-link    color4 letterSpace
                    ${ location.pathname.includes("Login") ? "fw-semibold" : ""} 
                
                    `}
                    
                    to="/Login"
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link    color4 letterSpace
                    ${ location.pathname.includes("Register") ? "fw-semibold" : ""} 
                
                    `}
                    to="/Register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;