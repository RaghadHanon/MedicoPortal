import React, {useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../../Context/User';


function DoctorProfile() {
  const {userToken,User} = useContext(UserContext)
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='name' value={clinic.name}></input>
        <input onChange={handleChange} type='text' name='location' value={clinic.location}></input>
        <input onChange={handleChange} type='text' name='openHours' value={clinic.openHours}></input>
        <input type='submit' ></input>

      </form>
    </div>
  )
}

export default DoctorProfile