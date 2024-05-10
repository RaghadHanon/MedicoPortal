import React, { useEffect, useState } from 'react'
import style from './PatientProfile.module.css'
import Female from '../../../public/woman.png'
import Male from '../../../public/man.png'
import bloodType from '../../../public/blood-type.png'
import height from '../../../public/height.png'
import weight from '../../../public/weight-scale.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../Context/User'
import { useContext } from 'react'
function PatientProfile() {
  const { name } = useParams();
  const [patient, setPatient] = useState({});
  const [requests, setRequests] = useState({});
  const [bloodP, setBloodP] = useState({});
  const [sugar, setSugar] = useState({});
  const [page, setPage] = useState("info");
  const { userToken, User } = useContext(UserContext);
  const [responses, setResponses] = useState({});
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`/api/patient/${name}`);
      setPatient(data);
    } catch (e) {
      console.log(e);
    }

  }
  const getRequests = async () => {
    try {
      const { data } = await axios.get(`/api/patient/requests`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      
      setRequests(data);
      } catch (e) {
      console.log(e);
    }

  }
  const getBloodP = async ()=>{
    try {
      const { data } = await axios.get(`/api/patient/bloodPressures`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setBloodP(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const getSugar = async ()=>{
    try {
      const { data } = await axios.get(`/api/patient/bloodSugars`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setSugar(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getProfileData();
    getRequests();
    getBloodP();
    getSugar();
  }, [])
  return (
    <div className={`container py-5 color2 ${style.pages} kiwiMaruFont`}>
      <div className={`px-5 py-4 bgcolor5 rounded-5 border d-flex flex-wrap justify-content-start gap-5`}>
        <img className={`${style.imgPr}`} src={patient.gender == "Female" ? Female : Male} />
        <div className={`flex-grow-1`}>
          <h3 className={`pb-3 border-bottom  fw-semibold text-capitalize`}>{patient.gender == "Female" ? `Miss. ` : `Mr. `}{patient.name}</h3>

          <div className={`pt-3  d-flex flex-column justify-content-start gap-3`}>
            <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
              <i className="fa-solid fa-phone" style={{ color: "#176b87" }}></i>
              <span>{patient.phoneNumber}</span>
            </div>
            <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
              <i className="fa-solid fa-envelope" style={{ color: "#176b87" }}></i>
              <span>{patient.email}</span>
            </div>
            <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
              <i className="fa-solid fa-building" style={{ color: "#176b87" }}></i> <span>{patient.address}</span>
            </div>
          </div>

        </div>
      </div>

      <div className={`mt-4  bgcolor5 rounded-5 border d-flex justify-content-start gap-5`}>
        <ul className={`mb-0  ps-0 d-flex align-self-stretch flex-column justify-content-start bgwhiteC `}>
          <li onClick={() => setPage("info")} className={`py-5 px-3 ${page == "info" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 448 512"><path fill="#176b87" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg></li>
          <li onClick={() => setPage("requests")} className={`py-5 px-3 ${page == "requests" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 576 512"><path fill="#176887" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z" /></svg></li>
          <li onClick={() => setPage("dailyCheck")} className={`py-5 px-3 ${page == "dailyCheck" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg></li>
          
        </ul>
        {
          page == "info" ? <>
            <div className={`p-5 d-flex flex-column flex-grow-1 gap-4`}>
              <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                  <span className={`fs-5 fw-semibold`}>General</span>
                  <i className={`fa-solid fa-pen-to-square fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i>

                </div>

                <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                  <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                    <span className={`fs-5`}>Gender: {patient?.gender}</span>
                  </div>
                </div>
              </div>
              <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                  <span className={`fs-5 fw-semibold`}>Medical Information</span>
                  <i className={`fa-solid fa-pen-to-square fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i>
                </div>
                <div className={style.medicalInfo}>
                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>

                    <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                      <img src={bloodType} />
                      <span className={`fs-5`}>{patient?.Blood_type}</span>
                    </div>
                    <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                      <img src={weight} />

                      <span className={`fs-5`}>{patient?.weight}</span>
                    </div>
                    <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                      <img src={height} />
                      <span className={`fs-5`}>{patient?.height}</span>
                    </div>

                  </div>
                </div>



              </div>



            </div>
          </>
            :page == "requests"?
            <div className={`p-5 d-flex flex-column flex-grow-1 gap-4`}>
              {
                (requests) ? <span>No requests yet!</span> :
                requests.map((request) => (
                    <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                        <span className={`fs-5 `}>requests for <span className='fw-semibold'>{request.doctorName}</span></span>
                        <i className={`fa-solid fa-reply fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i>

                      </div>

                      <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                        <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                          <i class="fa-solid fa-clock fa-xl" style={{ color: "#176b87" }}></i>
                          <span className={`fs-5`}>Sent at {request.date}</span>
                        </div>

                        <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                          <i class="fa-solid fa-comment-medical fa-xl" style={{ color: "#176b87" }}></i>
                          <span className={`fs-5`}>request:</span>
                        </div>
                        <span className={`p-4 bgcolor5 rounded-2 border  `}>
                          {request.description}
                        </span>
                      </div>
                    </div>
                  ))
              }

            </div>
            :
            <>
            <div className={`p-5 d-flex flex-column flex-grow-1 gap-4`}>
              <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                  <span className={`fs-5 fw-semibold`}>Daily CheckUp</span>
                  <i className={`fa-solid fa-pen-to-square fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i>

                </div>

                <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                  <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                    <span className={`fs-5`}>blood Pressure: {bloodP?.value}</span>
                  </div>
                  <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                    <span className={`fs-5`}>blood Sugar: {sugar?.value}</span>
                  </div>
                </div>
              </div>
            </div>
            </>
            

        }


      </div>
    </div >
  )
}

export default PatientProfile