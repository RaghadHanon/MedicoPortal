import React from 'react'
import style from "./Footer.module.css";
import logo from "../../public/LogoTheme2.png";
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.container}>
                <div className={style.top}>
                    <img src={logo} className={style.NavLogo} />
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/Features">Features</NavLink></li>
                        <li><NavLink to="/Doctors">Doctors</NavLink></li>
                    </ul>
                </div>
                <div className={style.copyright}>
                    <p>© 2024 MedicoPortal Company, Inc</p>
                </div>

            </div>

        </div>

    )
}
