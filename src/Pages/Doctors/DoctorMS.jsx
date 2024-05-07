import React ,{useState ,useEffect} from 'react'
import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';

function DoctorMS() {

  //هون كاردز عبير
  const {msName , msId} = useParams();
  
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
    <div>
      <h1>{msName} Doctors</h1>
      {
        doctors.map((doctor)=> 
          <Link to={`/DoctorProfile/${doctor.name}`}>{doctor.name}</Link>
        )
      }
    </div>
  )
}

export default DoctorMS