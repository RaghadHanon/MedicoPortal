import React from 'react'
import style from './DoctorCard.module.css'
import male from '../../../public/doctorM.png'
import female from '../../../public/doctorF.png'
import { Link } from 'react-router-dom';

function DoctorCard({ doctor }) {
<<<<<<< HEAD
=======
  //قبل الرفع الاول اعملي هيك
  //عبير 1  خدي الكود كامل حطيه بملف وهون بس احذفي اللي جوا الريتيرين

  
  //هاد الرفع الثاني 
  //رجعي الكود زي ما كان 
>>>>>>> hanan
  return (
    <div>
       <Link to={`/DoctorProfile/${doctor.name}`} className={`text-decoration-none color2 `}>

        <div className={`${style.card}`}>
          <div className={`d-flex flex-column justify-content-center align-items-center gap-1 kiwiMaruFont`}>
            <img src={doctor.gender == "Female" ? female : male} className={`w-50  mb-4`} />
            <span>Dr.{doctor.name}</span>
            <span>{doctor.clinicName=="No Clinic"?"":doctor.clinicName}</span>
            <span>{doctor.medicalSpecificationName}</span>
          </div>

        </div>

      </Link>

     
    </div>
  )
}

export default DoctorCard