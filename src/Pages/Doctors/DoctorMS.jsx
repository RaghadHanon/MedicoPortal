import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from './DoctorCard';

function DoctorMS() {

  const { msName, msId } = useParams();

  const [doctors, setDoctors] = useState([]);

  const GetDoctors = async () => {
    try {
      const { data } = await axios.get(`/api/medicalSpecification/${msId}/doctors`);
      setDoctors(data);

    } catch (e) {

      console.log(e);
    }
  }

  useEffect(() => {
    GetDoctors();
  }, []);

  return (

    <div className={`d-flex justify-content-center py-5 `}>
      <div className={` border w-75 d-flex flex-column align-items-center gap-4 justify-content-center  pb-5 pt-3 px-5 rounded-2 bgcolor5 kiwiMaruFont color2`}>
        <h2 className={` fw-semibold w-100 text-center pb-4 border-bottom `}>Doctors</h2>
        <div className={`d-flex flex-wrap justify-content-center gap-5 py-4`}>
          {
            doctors.map((doctor) =>
              <DoctorCard doctor={doctor} />
            )
          }
        </div>

      </div>
    </div>
  )
}

export default DoctorMS