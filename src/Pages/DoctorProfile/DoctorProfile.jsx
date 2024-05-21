import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../Context/User';
import { useParams, Link } from 'react-router-dom';
import Female from '../../../public/FemaleM.png'
import Male from '../../../public/MaleM.png'
import style from './DoctorProfile.module.css'
import Loader from '../../Components/Loader'
function DoctorProfile() {

  const [loader, setLoader] = useState(true);
  const { name } = useParams();
  const [page, setPage] = useState("info");
  const [infoEdit, setInfoEdit] = useState(false);
  const [clinicEdit, setClinicEdit] = useState(false);
  const { userToken, User } = useContext(UserContext);
  const [doctor, setDoctor] = useState({});
  const [requests, setRequests] = useState({});

  const [dataSet, setDataSet] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [pageSize, setPageSize] = useState(9);

  const [clinic, setClinic] = useState({
    name: doctor?.clinic?.clinicName,
    location: doctor?.clinic?.location,
    openHours: doctor?.clinic?.openHours,
  });
  const [profileData, setProfileData] = useState({
    cvUrl: doctor?.cvUrl,
    bio: doctor?.bio,
  });

  const handleChangeClinic = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setClinic({
      ...clinic,
      [name]: value,
    });

  };

  const handleSubmitClinic = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/doctor/clinic',
        clinic, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setClinicEdit(false);
    } catch (e) {
      console.log(e);
    }

  };


  const handleChangeInfo = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });

  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/doctor/profileData',
        profileData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setInfoEdit(false);
    } catch (e) {
      console.log(e);
    }

  };
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`/api/doctor/${name}`);
      setDoctor(data);

      setClinic({
        name: doctor?.clinic?.clinicName,
        location: doctor?.clinic?.location,
        openHours: doctor?.clinic?.openHours,
      });
      setProfileData({
        cvUrl: doctor?.cvUrl,
        bio: doctor?.bio,
      });

    } catch (e) {
      console.log(e);
    }

  }
  const getRequests = async () => {
    try {
      const { data } = await axios.get(`/api/doctor/requests?pageNumber=1&pageSize=${pageSize}&isAnswered=${isAnswered}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setRequests(data.requests);
      setDataSet(data);

      setLoader(false);

    } catch (e) {
      console.log(e);
    }

  }


  useEffect(() => {

    getProfileData();
    if (User?.role == "Doctor") {
      getRequests();
    }else {
      setLoader(false);
    }
  }, [clinicEdit, infoEdit, isAnswered, name])


  if (loader) return <Loader />

  return (
    <div className={`position-relative`}>

      <div className={`container  py-5 color2 ${style.pages} kiwiMaruFont`}>
        <div className={`px-5 py-4 bgcolor5 rounded-5 border d-flex flex-wrap justify-content-start gap-5`}>
          <img className={`${style.imgPr}`} src={doctor.gender == "Female" ? Female : Male} />
          <div className={`flex-grow-1`}>

            <div className={`d-flex pb-3 border-bottom  flex-wrap justify-content-between align-items-center gap-3`}>
              <h3 className={`fw-semibold text-capitalize`}>Dr.{doctor.name}</h3>
              {User?.role == "Patient" ? <Link to={`/Request/${doctor.name}/${doctor.doctorId}`} className={`text-decoration-none bgcolor2 color4 px-4 py-2 rounded fw-semibold`}>Contact</Link> : <></>}
            </div>
            <div className={`pt-3  d-flex flex-column justify-content-start gap-3`}>
              <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                <i className="fa-solid fa-phone" style={{ color: "#176b87" }}></i>
                <span>{doctor.phoneNumber}</span>
              </div>
              <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                <i className="fa-solid fa-envelope" style={{ color: "#176b87" }}></i>
                <span>{doctor.email}</span>
              </div>
              <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                <i className="fa-solid fa-building" style={{ color: "#176b87" }}></i> <span>{doctor.address}</span>
              </div>
            </div>

          </div>
        </div>

        <div className={`mt-4  bgcolor5 rounded-5 border d-flex justify-content-start gap-5`}>
          <ul className={`mb-0  ps-0 d-flex align-self-stretch flex-column justify-content-start bgwhiteC `}>
            <li onClick={() => setPage("info")} className={`py-5 px-3 text-center ${page == "info" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512"><path fill="#176b87" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg></li>
            {User?.name == doctor.name ? <li onClick={() => setPage("requests")} className={`py-5 px-3 text-center ${page != "info" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 576 512"><path fill="#176887" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z" /></svg></li> : <></>}
          </ul>
          {
            page == "info" ? <>
              <div className={`p-5 d-flex flex-column flex-grow-1 gap-4`}>
                <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                  <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                    <span className={`fs-5 fw-semibold`}>About me</span>
                    {User?.name == doctor.name ? <i onClick={() => setInfoEdit(true)} className={`fa-solid fa-pen-to-square fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i> : <></>}

                  </div>

                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                    <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                      <i className="fa-solid fa-stethoscope fa-xl" style={{ color: "#176b87" }}></i>
                      <span className={`fs-5`}>Specialized in {doctor?.medicalSpecification?.msName}</span>
                    </div>
                    <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>

                      <i className="fa-solid fa-file fa-xl" style={{ color: "#176b7b" }}></i>
                      <a href={doctor.cvUrl} target="_blank" className={`fs-5 color2`}>CV link</a>
                    </div>

                    <span className={`p-4 bgcolor5 rounded-2 border  `}>
                      {doctor.bio == "" ? "No bio..." : doctor.bio}
                    </span>
                  </div>
                </div>

                {doctor?.clinic?.clinicName == "No Clinic Yet !" ?
                  <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                    <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                      <span className={`fs-5 fw-semibold`}>Clinic</span>
                      {User?.name == doctor.name ? <i onClick={() => setClinicEdit(true)} className={`fa-solid fa-pen-to-square fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i> : <></>}
                    </div>
                    <span className={`fs-6 fw-semibold py-4`}>No clinic data yet</span>
                  </div>

                  :

                  <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                      <span className={`fs-5 fw-semibold`}>Clinic</span>
                      {User?.name == doctor.name ? <i onClick={() => setClinicEdit(true)} className={`fa-solid fa-pen-to-square fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i> : <></>}
                    </div>
                    <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>

                      <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                        <i className="fa-solid fa-heading fa-xl" style={{ color: "#176b87" }}></i>
                        <span className={`fs-5`}>{doctor?.clinic?.clinicName}</span>
                      </div>
                      <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                        <i className="fa-solid fa-location-dot fa-xl" style={{ color: "#176b87" }}></i>
                        <span className={`fs-5`}>{doctor?.clinic?.location}</span>
                      </div>
                      <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                        <i className="fa-solid fa-clock fa-xl" style={{ color: "#176b87" }}></i>
                        <span className={`fs-5`}>{doctor?.clinic?.openHours}</span>
                      </div>

                    </div>

                  </div>

                }

              </div>
            </>
              :
              <div className={`p-5 pt-4 d-flex flex-column flex-grow-1 gap-4`}>
                {
                  <div className={` d-flex flex-column flex-grow-1 gap-4`}>
                    <ul className="nav nav-underline color2 pb-4">
                      <li className={`nav-item color2`} onClick={() => setIsAnswered(true)}>
                        <span className={`nav-link color2 ${isAnswered ? "active" : ""}`} aria-current="page" >Answered requests</span>
                      </li>
                      <li className={`nav-item color2`} onClick={() => setIsAnswered(false)}>
                        <span className={`nav-link  color2 ${!isAnswered ? "active" : ""}`} aria-disabled="true">Not answered requests</span>
                      </li>
                    </ul>
                    {requests.length == 0 ?
                      <span>No requests yet!</span>
                      :
                      requests.map((request) => (

                        <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>

                          <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                            <span className={`fs-5 `}>Request From <span className='fw-semibold'>{request.patientName}</span></span>
                            {!request.isAnswered ? <Link to={`/ResponseForm/${request.requestId}/${request.doctorId}/${request.doctorName}/${request.patientId}/${request.patientName}`}><i className={`fa-solid fa-reply fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i></Link> : <Link to={`/Response/${request.requestId}/${"Doctor"}`} className={`bgcolor2 whiteC py-1 px-3 border-0 rounded text-decoration-none`}>Response</Link>}

                          </div>

                          <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                            <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                              <i className="fa-solid fa-clock fa-xl" style={{ color: "#176b87" }}></i>
                              <span className={`fs-5`}>Sent at {request.date}</span>
                            </div>

                            <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                              <i className="fa-solid fa-comment-medical fa-xl" style={{ color: "#176b87" }}></i>
                              <span className={`fs-5`}>Description</span>
                            </div>
                            <span className={`p-4 bgcolor5 rounded-2 border  `}>
                              {request.description}
                            </span>

                            <Link to={`/patient/${request.patientName}`} className={` rounded-2 px-3 py-2 color4 bgcolor2 text-decoration-none text-center`}>Check {request.patientName} Profile</Link>

                          </div>

                          {dataSet.totalCount > pageSize ? <button onClick={() => setPageSize(pageSize + 9)} className={`bgcolor2 whiteC px-3 py-1 border-0 rounded`}>Show more</button> : <></>}

                        </div>
                      ))
                    }
                  </div>

                }

              </div>


          }


        </div>


      </div >

      {clinicEdit == true ?
        <div className={`${style.editForm}  position-absolute top-0 bottom-0 start-0 end-0 pt-5 d-flex justify-content-center align-items-center color2 ${style.pages} kiwiMaruFont`}>

          <form onSubmit={handleSubmitClinic} id="clinic" className={`w-50`} >

            <div className={`py-4 px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
              <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                <span className={`fs-5 fw-semibold`}>Clinic</span>
                <i className={`fa-solid fa-pen-to-square fa-xl ${style.pointer}`} style={{ color: "#176b87" }}></i>
              </div>

              <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>

                <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                  <i className="fa-solid fa-heading fa-xl" style={{ color: "#176b87" }}></i>
                  <span className={``}>Clinic Name
                    <input onChange={handleChangeClinic} type='text' name='name' value={clinic.name}></input>
                  </span>
                </div>
                <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                  <i className="fa-solid fa-location-dot fa-xl" style={{ color: "#176b87" }}></i>
                  <span className={``}>Location
                    <input onChange={handleChangeClinic} type='text' name='location' value={clinic.location}></input>
                  </span>
                </div>
                <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                  <i className="fa-solid fa-clock fa-xl" style={{ color: "#176b87" }}></i>
                  <span className={``}>Open Hours
                    <input onChange={handleChangeClinic} type='text' name='openHours' value={clinic.openHours}></input>
                  </span>
                </div>

                <div className={`d-flex mt-4 flex-wrap border-top pt-3 justify-content-end align-items-center gap-3`}>

                  <input className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`} type='submit' value='Save'></input>
                  <button onClick={() => {
                    setClinicEdit(false); setClinic({
                      name: doctor?.clinic?.clinicName,
                      location: doctor?.clinic?.location,
                      openHours: doctor?.clinic?.openHours,
                    })
                  }} className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`}>Cancel</button>
                </div>

              </div>
            </div>
          </form>
        </div>
        :
        <></>
      }

      {infoEdit == true ?
        <div className={`${style.editForm}  position-absolute top-0 bottom-0 start-0 end-0 pt-5 d-flex justify-content-center align-items-center color2 ${style.pages} kiwiMaruFont`}>

          <form onSubmit={handleSubmitInfo} id="info" className={`w-50`} >

            <div className={`py-4 px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
              <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                <span className={`fs-5 fw-semibold`}>About me</span>
                <i className={`fa-solid fa-pen-to-square fa-xl ${style.pointer}`} style={{ color: "#176b87" }}></i>
              </div>


              <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>

                <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                  <i className="fa-solid fa-file fa-xl" style={{ color: "#176b7b" }}></i>
                  <span >CV URL
                    <input onChange={handleChangeInfo} type='text' name='cvUrl' value={profileData.cvUrl} />
                  </span>
                </div>
                <textarea className={`p-4 bgcolor5 rounded-2 border w-100 `} placeholder='bio...' onChange={handleChangeInfo} type='text' name='bio' value={profileData.bio} />

                <div className={`d-flex mt-4 flex-wrap border-top pt-3 justify-content-end align-items-center gap-3`}>
                  <input className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`} type='submit' value='Save' />
                  <button onClick={() => {
                    setInfoEdit(false); setProfileData({
                      cvUrl: doctor?.cvUrl,
                      bio: doctor?.bio,
                    })
                  }} className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`}>Cancel</button>
                </div>

              </div>
            </div>
          </form>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default DoctorProfile

