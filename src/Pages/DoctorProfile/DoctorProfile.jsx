import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../../Context/User';
import { useParams ,Link} from 'react-router-dom';
import Request from './../Request/Request';


function DoctorProfile() {
  const {name}= useParams();
  const {userToken,User} = useContext(UserContext);
  const [doctor,setDoctor] = useState({});
  const [clinic, setClinic ] = useState({
    name: '',
    location: '',
    openHours: '',
  });

 const handleChange = (e)=>{
  e.preventDefault();
  const {name, value} = e.target;
  setClinic({
    ...clinic,
    [name]: value,
  });
 };

 const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    const {data} = await axios.post('https://localhost:7281/api/doctor/clinic',
    clinic,{
      headers : {
        Authorization:`Bearer ${userToken}`,
      }
    });
    setClinic({
      name: '',
      location: '',
      openHours: '',
    });
  
  }catch(e){
    console.log(e);
  }
 };

 const getProfileData = async ()=>{
  try{
    const {data}=await axios.get(`/api/doctor/${name}`);
    setDoctor(data);

  }catch(e){
    console.log(e);
  }
  
 }

 useEffect(()=>{
  
  getProfileData();
 },[])

  return (
    <div>
      
    </div>
  )
}

export default DoctorProfile



/*
<form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='name' value={clinic.name}></input>
        <input onChange={handleChange} type='text' name='location' value={clinic.location}></input>
        <input onChange={handleChange} type='text' name='openHours' value={clinic.openHours}></input>
        <input type='submit' ></input>

      </form>


      {User?.role == "Patient"? <Link to={`/Request/${doctor.name}/${doctor.doctorId}`}>Request</Link>:<></> }
      {doctor? <h2>${doctor.name}</h2> :<></>}
      */