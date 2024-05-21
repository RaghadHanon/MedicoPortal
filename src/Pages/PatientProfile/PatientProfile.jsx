import React, { useEffect, useState } from 'react'
import style from './PatientProfile.module.css'
import Female from '../../../public/woman.png'
import Male from '../../../public/man.png'
import bloodType from '../../../public/blood-type.png'
import height from '../../../public/height.png'
import weight from '../../../public/weight-scale.png'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../Context/User'
import { useContext } from 'react'
import { PiArticleNyTimesFill } from 'react-icons/pi'
import Loader from '../../Components/Loader'
function PatientProfile() {

  
  const [loader, setLoader] = useState(true);
  const { name } = useParams();
  const { userToken, User } = useContext(UserContext);
  const [patient, setPatient] = useState({});
  const [MedInfoEdit, setMedInfoEdit] = useState(false);
  const [MedicalData, setMedicalData] = useState({
    bloodType: '',
    height: '',
    weight:'',
  });
  const [bloodP, setBloodP] = useState({
    up: '',
    down: '',
  });
  const [requests, setRequests] = useState({});
  const [bloodPToSend, setBloodPToSend] = useState("");
  const [sugar, setSugar] = useState("");
  const [page, setPage] = useState("info");
  const [subPage, setSubPage] = useState("Medicine");
  const [bloodPData, setBloodPData] = useState({});
  const [bloodSData, setBloodSData] = useState({});

  const [dataSet, setDataSet] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [pageSize, setPageSize] = useState(9);

  const [medicines, setMedicines] = useState([]);
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [allergies, setAllergies] = useState([]);

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMedicalData({
      ...MedicalData,
      [name]: value,
    });

  };
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`/api/patient/${name}`);
      setPatient(data);
      setMedicalData({
        bloodType: data.bloodType,
        height: data.height,
        weight: data.weight,
      });
    } catch (e) {
      console.log(e);
    }

  }



  const handleChangeBPInfo = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBloodP({
      ...bloodP,
      [name]: value,
    });
    setBloodPToSend(
      `${bloodP.up}/${bloodP.down}`
    );
  };

  const addBloodP = async (e) => {
    e.preventDefault();
    setBloodPToSend(`${e.target[0].value}/${e.target[1].value}`);

    try {
      const { data } = await axios.post(`/api/patient/bloodPressure`,
        { value: bloodPToSend }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setBloodP({
        up: '',
        down: '',
      });
      
    getBloodPData();

    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeBSInfo = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let x = e.target.value;

    setSugar(e.target.value);
    console.log(`sugar: ${sugar}`);

  };

  const addSugar = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/patient/bloodSugar`,
        { value: sugar }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setSugar('');
      
    getBloodSData();
    } catch (error) {
      console.log(error);
    }
  }




  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/patient/profileData',
        MedicalData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setMedInfoEdit(false);
      setMedicalData({
        bloodType: patient?.bloodType,
        height: patient?.height,
        weight: patient?.weight,
      });
    } catch (e) {
      console.log(e);
    }

  };


  const getBloodPData = async () => {
    try {
      const { data } = await axios.get(`/api/patient/bloodPressures/${name}`);
      setBloodPData(data);
    } catch (error) {

    }
  }
  const getBloodSData = async () => {
    try {
      const { data } = await axios.get(`/api/patient/bloodSugars/${name}`);
      setBloodSData(data);
    } catch (error) {

      console.log(error);
    }
  }
  const getRequests = async () => {
    try {
      const { data } = await axios.get(`/api/patient/requests?pageNumber=1&pageSize=${pageSize}&isAnswered=${isAnswered}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      setRequests(data.requests);
      setDataSet(data);
    } catch (e) {
      console.log(e);
    } finally{
      
      setLoader(false);
    }

  }
  const getMedicines = async () => {
    try {
      const { data } = await axios.get(`/api/patient/medicine/${name}`);
      setMedicines(data);
    } catch (e) {
      console.log(e);
    }
  }
  const getChronicDiseases = async () => {
    try {
      const { data } = await axios.get(`/api/patient/chronicDisease/${name}`);
      setChronicDiseases(data);
    } catch (e) {
      console.log(e);
    }
  }
  const getAllergy = async () => {
    try {
      const { data } = await axios.get(`/api/patient/allergies/${name}`);
      setAllergies(data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getProfileData();
    if (User?.role == "Patient") getRequests();
    else setLoader(false);
    getMedicines();
    getChronicDiseases();
    getAllergy();
    getBloodPData();
    getBloodSData();
  }, [MedInfoEdit, isAnswered]);
  
  if (loader) return <Loader/>

  return (
    <div className={'position-relative'}>
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
            <li onClick={() => setPage("info")} className={`py-5 px-3 ${page == "info" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512"><path fill="#176b87" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg></li>
            <li onClick={() => setPage("dailyCheck")} className={`py-5 px-3 ${page == "dailyCheck" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512"><path fill="#176b87" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" /></svg></li>

            {
              User?.name == patient.name ?
                <li onClick={() => setPage("requests")} className={`py-5 px-3 ${page == "requests" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 576 512"><path fill="#176887" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z" /></svg></li>
                : <></>
            }
            <li onClick={() => setPage("MedHistory")} className={`py-5 px-3 ${page == "MedHistory" ? "bgcolor5" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512"><path fill="#176b87" d="M96 0C60.7 0 32 28.7 32 64V288H144c6.1 0 11.6 3.4 14.3 8.8L176 332.2l49.7-99.4c2.7-5.4 8.3-8.8 14.3-8.8s11.6 3.4 14.3 8.8L281.9 288H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-6.1 0-11.6-3.4-14.3-8.8L240 275.8l-49.7 99.4c-2.7 5.4-8.3 8.8-14.3 8.8s-11.6-3.4-14.3-8.8L134.1 320H32V448c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V160H288c-17.7 0-32-14.3-32-32V0H96zM288 0V128H416L288 0z" /></svg></li>
          </ul>
          {
            page == "info" ?
              <div className={`p-5 d-flex flex-column flex-grow-1 gap-4`}>
                <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                  <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                    <span className={`fs-5 fw-semibold`}>General</span>

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
                    {User?.name == patient.name ? <i onClick={() => setMedInfoEdit(true)} className={`fa-solid fa-pen-to-square fa-2xl ${style.pointer}`} style={{ color: "#176b87" }}></i> : <></>}
                  </div>
                  <div className={style.medicalInfo}>
                    <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>

                      {patient.bloodType != "" ? <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                        <img src={bloodType} />
                        <span className={`fs-5`}>{patient?.bloodType}</span>
                      </div> : <></>
                      }
                      <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                        <img src={weight} />

                        <span className={`fs-5`}>{patient?.weight} kg</span>
                      </div>
                      <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                        <img src={height} />
                        <span className={`fs-5`}>{patient?.height} cm</span>
                      </div>

                    </div>
                  </div>



                </div>



              </div>
              :
              <></>

          }

          {page == "dailyCheck" ?

            <div className={`p-5 d-flex flex-column flex-grow-1 gap-4`}>
              <div className={`py-4 px-5 d-flex flex-column  bgwhiteC w-100 border rounded-5`}>
                <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                  <span className={`fs-5 fw-semibold`}>Daily CheckUp</span>

                </div>

                {User?.name == patient.name ?
                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                    <form onSubmit={addBloodP} id="info" className={`w-100 d-flex justify-content-between`} >
                      <div className={`d-flex flex-wrap justify-content-start align-items-center gap-3`}>
                        <span className={`fs-5`}>blood Pressure:  </span>
                        <input onChange={handleChangeBPInfo} type='number' name='up' value={bloodP.up} min="0" max="250" />/
                        <input onChange={handleChangeBPInfo} type='number' name='down' value={bloodP.down} min="0" max="250" />
                      </div>
                      <input className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`} type='submit' value='Save' />
                    </form>
                    <form onSubmit={addSugar} id="info" className={`w-100 d-flex justify-content-between`} >
                      <div className={`d-flex flex-row justify-content-start align-items-center gap-3`}>
                        <span className={`fs-5`}>blood Sugar: </span>
                        <input onChange={handleChangeBSInfo} type='text' name='sugar' value={sugar} min="0" max="1000" />
                      </div>
                      <input className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`} type='submit' value='Save' />

                    </form>


                  </div>
                  : <></>}

              </div>

              <div className={`py-4 px-5 d-flex flex-column bgwhiteC w-100 border rounded-5`}>
                <div className={`p-2 d-flex flex-column justify-content-between`}>
                  <h3 className={`fs-4 fw-semibold border-bottom p-1`}>History</h3>
                  <div className={`d-flex flex-row bgwhiteC w-100 gap-3`}>
                    <div className={` py-4 px-4 d-flex flex-column  bgwhiteC w-100 border rounded-5 overflow-auto`}>
                      <h5 className={`fw-semibold pb-2 border-bottom`}>Blood Pressure</h5>
                      {
                        (bloodPData.length > 0) ?

                          <div className={`d-flex flex-column gap-3 ${style.BloodBox}`}>
                            {bloodPData.map((bloodP) => (
                              <div className='d-flex flex-column border rounded p-2'>
                                <div className={`d-flex flex-wrap gap-3 `}>
                                  <span className={`fw-semibold`}>Value</span>
                                  <span>{bloodP.value}</span>
                                </div>
                                <div className={`d-flex flex-wrap gap-3 `}>
                                  <span className={`fw-semibold`}>Date</span>
                                  <span>{bloodP.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          : <span>No Data for Blood Pressure yet!</span>

                      }
                    </div>
                    <div className={` py-4 px-4 d-flex flex-column  bgwhiteC w-100 border rounded-5 overflow-auto`}>
                      <h5 className={`fw-semibold pb-2 border-bottom`}>Blood Sugur</h5>
                      {
                        (bloodSData.length > 0) ?
                          <div className={`d-flex flex-column gap-3 ${style.BloodBox}`}>
                            {bloodSData.map((bloodS) => (
                              <div className='d-flex flex-column border rounded p-2'>
                                <div className={`d-flex flex-wrap gap-3 `}>
                                  <span className={`fw-semibold`}>Value</span>
                                  <span>{bloodS.value}</span>
                                </div>
                                <div className={`d-flex flex-wrap gap-3 `}>
                                  <span className={`fw-semibold`}>Date</span>
                                  <span>{bloodS.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          : <span>No Data for Blood Sugar yet!</span>


                      }
                    </div>
                  </div>

                </div>


              </div>

            </div>


            : <></>
          }
          {page == "requests" ?

            <div className={`p-5 pt-4 gap-3 d-flex flex-column flex-grow-1 gap-4`}>
              {
                <div className={` d-flex flex-column flex-grow-1 gap-4`} >
                  <ul className="nav nav-underline color2 pb-4">
                    <li className={`nav-item color2`} onClick={() => setIsAnswered(true)}>
                      <span className={`nav-link color2 ${isAnswered ? "active" : ""}`} aria-current="page" >Answered requests</span>
                    </li>
                    <li className={`nav-item color2`} onClick={() => setIsAnswered(false)}>
                      <span className={`nav-link  color2 ${!isAnswered ? "active" : ""}`} aria-disabled="true">Not answered requests</span>
                    </li>
                  </ul>
                  { (requests?.length==0) ?
                    <span>No requests yet!</span>
                    :
                    requests.map((request) => (

                      <div className={`py-4 px-5 d-flex flex-column   bgwhiteC w-100 border rounded-5`}>

                        <div className={`p-2 d-flex flex-wrap justify-content-between border-bottom `}>
                          <span className={`fs-5 `}>Request For <span className='fw-semibold'>Dr.{request.doctorName}</span></span>
                          {!request.isAnswered ? <></> : <Link to={`/Response/${request.requestId}/${"Patient"}`} className={`bgcolor2 whiteC py-1 px-3 border-0 rounded text-decoration-none`}>Response</Link>}

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
                          <Link to={`/DoctorProfile/${request.doctorName}`} className={` rounded-2 px-3 py-2 color4 bgcolor2 text-decoration-none text-center`}>Check Dr.{request.doctorName} Profile</Link>

                        </div>

                        {dataSet.totalCount > pageSize ? <button onClick={() => setPageSize(pageSize + 9)} className={`bgcolor2 whiteC px-3 py-1 border-0 rounded`}>Show more</button> : <></>}

                      </div>
                    ))
                  }
                </div>

              }

            </div>
            :
            <></>
          }
          {page == "MedHistory" ?
            <div className={`container w-75  py-5 color2 ${style.response} kiwiMaruFont`}>

              <div className={`p-4 mb-4 d-flex rounded-5 border flex-wrap justify-content-between bgwhiteC `}>
                <span className={`fs-5 fw-semibold`}>Medical History</span>
              </div>
              <div className={`mt-0  bgcolor5 rounded-5 border d-flex flex-column justify-content-start gap-5`}>
                <ul className={`mb-0  ps-0 d-flex align-self-stretch flex-wrap justify-content-start align-items-center bgwhiteC `}>
                  <li onClick={() => setSubPage("Medicine")} className={`py-3 px-5 py-3 px-4 fw-semibold ${subPage == "Medicine" ? "bgcolor5" : ""}`}>Medicine</li>
                  <li onClick={() => setSubPage("ChronicDisease")} className={`py-3 px-5 py-3 px-4 fw-semibold ${subPage == "ChronicDisease" ? "bgcolor5" : ""}`}>Chronic Disease</li>
                  <li onClick={() => setSubPage("Allergy")} className={`py-3 px-5 py-3 px-4 fw-semibold ${subPage == "Allergy" ? "bgcolor5" : ""}`}>Allergy</li>

                </ul>


                {subPage == "Medicine" ?
                  <div className={`${style.Box}`}>
                    {medicines.map((medicine) =>
                      <div className={`${style.Resp} pb-5 px-5 d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

                        <div id="Medicine" className={`w-100`}  >

                          <div className={`pt-3 pb-3  px-4 d-flex flex-column   bgwhiteC w-100 border rounded-5`}>
                            <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                              <span className={`fs-5 fw-semibold`}>Medicine</span>
                              <span>By Dr.{medicine.addedBy}</span>
                            </div>

                            <div className={`pt-2  d-flex flex-column justify-content-start `}>
                              <div className={`d-flex flex-column justify-content-start align-items-start `}>
                                <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                  {medicine.medicineName ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                    :
                                    <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                  }
                                  <span className={``}>Medicin Name </span>
                                </div>
                                <p className='w-100'>{medicine.medicineName ? medicine.medicineName : " None reported"} </p>

                              </div>
                              <div className={`d-flex flex-column justify-content-start align-items-start `}>
                                <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                  {medicine.dosage ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                    :
                                    <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                  }
                                  <span className={``}>Dosage </span>
                                </div>
                                <p className='w-100 ' >{medicine.dosage ? medicine.dosage : " None reported"}</p>

                              </div>
                              <div className={`d-flex flex-column justify-content-start align-items-start`}>
                                <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                  {medicine.frequency ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                    :
                                    <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                  }
                                  <span className={``}>Frequency  </span>
                                </div>
                                <p className='w-100'>{medicine.frequency ? medicine.frequency : " None reported"} </p>

                              </div>
                              <div className={`d-flex flex-column justify-content-start align-items-start`}>
                                <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                  {medicine.instructions ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                    :
                                    <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                  }
                                  <span className={``}>Instructions  </span>
                                </div>
                                <p className='w-100'>{medicine.instructions ? medicine.instructions : " None reported"} </p>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  :
                  <></>


                }
                {
                  subPage == "ChronicDisease" ?
                    <div className={`${style.Box}`}>
                      {
                        chronicDiseases.map((chronicDisease) =>
                          <div className={`${style.Resp}  pb-5 px-5  d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

                            <div id="ChronicDisease" className={`w-100`}  >

                              <div className={`pt-3 pb-3  px-4 d-flex flex-column   bgwhiteC w-100 border rounded-5`}>
                                <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                                  <span className={`fs-5 fw-semibold`}>Chronic Disease</span>
                                  <span>By Dr.{chronicDisease.addedBy}</span>
                                </div>

                                <div className={`pt-2  d-flex flex-column justify-content-start `}>
                                  <div className={`d-flex flex-column justify-content-start align-items-start `}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {chronicDisease?.chronicDiseaseName ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }
                                      <span className={``}>chronic Disease Name </span>
                                    </div>
                                    <p className='w-100'>{chronicDisease?.chronicDiseaseName ? chronicDisease?.chronicDiseaseName : " None reported"}</p>

                                  </div>
                                  <div className={`d-flex flex-column justify-content-start align-items-start`}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {chronicDisease?.description ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }
                                      <span className={``}>Description </span>
                                    </div>
                                    <p className='w-100 ' >{chronicDisease?.description ? chronicDisease?.description : " None reported"}</p>

                                  </div>
                                  <div className={`d-flex flex-column justify-content-start align-items-start `}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {chronicDisease?.causes ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }
                                      <span className={``}>Causes  </span>
                                    </div>
                                    <p className='w-100'>{chronicDisease?.causes ? chronicDisease?.causes : " None reported"} </p>

                                  </div>
                                  <div className={`d-flex flex-column justify-content-start align-items-start`}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {chronicDisease?.symptoms ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }<span className={``}>Symptoms  </span>
                                    </div>
                                    <p className='w-100'>{chronicDisease?.symptoms ? chronicDisease?.symptoms : " None reported"} </p>

                                  </div>
                                  <div className={`d-flex flex-column justify-content-start align-items-start`}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {chronicDisease?.digonsis ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }
                                      <span className={``}>Digonsis  </span>
                                    </div>
                                    <p className='w-100'>{chronicDisease?.digonsis ? chronicDisease?.digonsis : " None reported"}</p>

                                  </div>
                                  <div className={`d-flex flex-column justify-content-start align-items-start`}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {chronicDisease?.treatment ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }
                                      <span className={``}>Treatment  </span>
                                    </div>
                                    <p className='w-100'>{chronicDisease?.treatment ? chronicDisease?.treatment : " None reported"}</p>
                                  </div>
                                  <div className={`d-flex flex-column justify-content-start align-items-start `}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {chronicDisease?.dateOfDiagonsis ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }
                                      <span className={``}>Date Of Diagonsis  </span>
                                    </div>
                                    <p className='w-100'>{chronicDisease?.dateOfDiagonsis ? chronicDisease?.dateOfDiagonsis : " None reported"}</p>

                                  </div>



                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                    :
                    <></>
                }
                {
                  subPage == "Allergy" ?
                    <div className={`${style.Box}`}>
                      {
                        allergies.map((allergy) =>

                          <div className={`${style.Resp}  pb-5 px-5  d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

                            <div id="Allergy" className={`w-100`}  >

                              <div className={`pt-3 pb-3  px-4 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                                <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                                  <span className={`fs-5 fw-semibold`}>Allergy</span>
                                  <span>By Dr.{allergy.addedBy}</span>
                                </div>

                                <div className={`pt-2 d-flex flex-column justify-content-start `}>
                                  <div className={`d-flex flex-column justify-content-start align-items-start `}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {allergy?.allergyName ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      }
                                      <span className={``}>Allergy Name </span>
                                    </div>
                                    <p className='w-100'>{allergy?.allergyName ? allergy?.allergyName : " None reported"}</p>
                                  </div>
                                  <div className={`d-flex flex-column justify-content-start align-items-start `}>
                                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                                      {allergy?.symptons ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                                        :
                                        <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                                      } <span className={``}>Symptons </span>
                                    </div>
                                    <p className='w-100 ' >{allergy?.symptons ? allergy?.symptons : " None reported"}</p>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                    :
                    <></>


                }


              </div>

            </div>
            :

            <></>
          }
        </div>
      </div >
      {
        MedInfoEdit == true ?
          <div className={`${style.editForm}  position-absolute top-0 bottom-0 start-0 end-0 pt-5 d-flex justify-content-center align-items-center color2 ${style.pages} kiwiMaruFont`}>

            <form onSubmit={handleSubmitInfo} id="info" className={`w-50`} >

              <div className={`py-4 px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>

                <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>

                  <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                    <div className={`d-flex flex-row justify-content-start align-items-start w-100 gap-3`}>
                      <span >Blood Type </span>

                      <select onChange={handleChangeInfo} value={MedicalData.bloodType} name='bloodType' className={`kiwiMaruFont color1 col-3 p-1`}>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>


                    </div>

                    <span className='w-100'>height (cm)
                      <input onChange={handleChangeInfo} className='w-50' type='number' name='height' value={MedicalData.height} min="40" max="250" />
                    </span>
                    <span className='w-100'>weight (kg)
                      <input onChange={handleChangeInfo} className='w-50' type='number' name='weight' value={MedicalData.weight} min="3" max="250" />
                    </span>
                  </div>

                  <div className={`d-flex mt-4 flex-wrap border-top pt-3 justify-content-end align-items-center gap-3`}>
                    <input className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`} type='submit' value='Save' />
                    <button onClick={() => {
                      setMedInfoEdit(false); setMedicalData({
                        bloodType: patient?.bloodType,
                        height: patient?.height,
                        weight: patient?.weight,
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

    </div >

  )
}

export default PatientProfile











