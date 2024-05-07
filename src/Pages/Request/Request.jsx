import React ,{useState, useContext} from 'react'
import image from '../../../public/health-report.png'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../../Context/User';
import style from './Request.module.css'
import axios from 'axios'

function Request() {
  const { name, doctorId } = useParams();
  const {userToken} = useContext(UserContext);
  const [pRequest, setPRequest ] = useState({
    description: '',
   
  });

 const handleChange = (e)=>{
  e.preventDefault();
  const {name, value} = e.target;
  setPRequest({
    ...pRequest,
    [name]: value,
  });
 };

 const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    const {data} = await axios.post(`/api/patient/request/${doctorId}`,
    pRequest,{
      headers : {
        Authorization:`Bearer ${userToken}`,
      }
    });
    setPRequest ({
      description: '',
    });
  
  
  }catch(e){
    console.log(e);
  }
 };

  return (
    <div className={`d-flex flex-wrap justify-content-center my-5 `}>
      <div className={`${style.requestDev} d-flex flex-wrap justify-content-center  border`}>
        <div className={`col-8 p-4 d-flex flex-column justify-content-between gap-2`}>
          <p className={`kiwiMaruFont fw-normal color2`}> As part of our commitment to providing comprehensive healthcare services, we kindly ask you to complete the following request form.<br /><br />

            Your input will assist us in better understanding your current health condition becouse
           your health and well-being are our top priorities.
          </p>

          <form onSubmit={handleSubmit} className={`d-flex flex-column justify-content-between gap-4 flex-grow-1`}>
            <label htmlFor='description' className={`color2 kiwiMaruFont fw-semibold `}>Description</label>
            <input type='text' id='description' name='description' value={pRequest.description} onChange={handleChange} className={`flex-grow-1 p-2 `} placeholder='Kindly Provide a Detailed Description of Your Symptoms here...' />

            <input type='submit' value='Send Request' className={`color4 bgcolor2 kiwiMaruFont `} />
          </form>
        </div>

        <div className={`col-4 p-4 bgcolor2 d-flex flex-column justify-content-between align-items-center`}>
          <h4 className={`color4 kiwiMaruFont text-center`}>Health Check Request</h4>
          <img src={image} className={`w-100 p-4`} />

          <div className={`d-flex flex-column justify-content-between align-items-center gap-3`}>
            <span className={`color4 kiwiMaruFont`}>Sent to Dr.{name}</span>
            <Link to={`/DoctorProfile/${name}`} className={`text-decoration-none color4 fw-semibold bgcolor3 py-1 px-4 rounded-1`}>Check Doctor Profile</Link>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Request