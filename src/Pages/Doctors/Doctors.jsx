import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from './DoctorCard';
//اول رفع لعبير 
function Doctors() {

  const [dataSet, setDataSet] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [pageSize, setPageSize] = useState(9);
  const [doctors, setDoctors] = useState([]);

  

  const handleChange = (e) => {
    e.preventDefault();
    setSearchName( e.target.value );

  };


  const GetDoctors = async () => {
    try {
      const { data } = await axios.get(`/api/doctors?searchName=${searchName}&pageNumber=1&pageSize=${pageSize}`);
      setDoctors(data.doctors);
      setDataSet(data);

    } catch (e) {

      console.log(e);
    }
  }

  useEffect(() => {
    GetDoctors();
  }, [pageSize,searchName]);

  return (

    <div className={`d-flex justify-content-center py-5 `}>
      <div className={` border w-75 d-flex flex-column align-items-center gap-4 justify-content-center  pb-5 pt-3 px-5 rounded-2 bgcolor5 kiwiMaruFont color2`}>
        <div className={`d-flex flex-wrap justify-content-between  pb-4 border-bottom w-100`}>
          <h2 className={` fw-semibold text-center `}>Doctors</h2>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="searchName" value={searchName} onChange={handleChange}/>
           </form>
        </div>
        <div className={`d-flex flex-wrap justify-content-center gap-5 py-4`}>
          {
            doctors.length ?
            doctors.map((doctor) =>
              <DoctorCard doctor={doctor} />
            ) 
            :
            <span>No doctors found!</span>
          }

        </div>

        {dataSet.totalCount > pageSize ? <button onClick={() => setPageSize(pageSize + 9)} className={`bgcolor2 whiteC px-3 py-1 border-0 rounded`}>Show more</button> : <></>}
      </div>
    </div>
  )
}

export default Doctors