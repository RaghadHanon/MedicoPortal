import React from 'react'
import style from './RegisterCard.module.css'

export default function RegisterCard({ userimg , title}) {
    return (

            <div className={`${style.eCard} ${style.playing} my-4`}>
          <div className={`${style.image}`} />
    
          <div className={`${style.wave}`} />
          <div className={`${style.wave}`} />
          <div className={`${style.wave}`} />
    
          <div className={`${style.infotop}`}>
            <img src={`${userimg}`} />
            <br />
            <div className={`${style.name} p-3 `}><h3>{title}</h3></div>
          </div>
        </div>

        
    
      )
}
