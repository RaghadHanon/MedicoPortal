import React from 'react'
import style from './card.module.css'
export default function MdeCard({ MedImg, description }) {
  return (
    <div className={`${style.eCard} ${style.playing} my-4`}>
      <div className={`${style.image}`} />

      <div className={`${style.wave}`} />
      <div className={`${style.wave}`} />
      <div className={`${style.wave}`} />

      <div className={`${style.infotop}`}>

        <img src={MedImg}/>
        <br />
        <div className={`${style.name} p-3 `}><h4>{description}</h4></div>
      </div>
    </div>
  )
}
