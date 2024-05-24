import React, { useContext, useEffect, useState } from 'react'
import axios, { all } from 'axios'
import { UserContext } from '../../Context/User';
import { useParams, Link, useNavigate } from 'react-router-dom';
import style from './Response.module.css'
function Response() {
  const navigate = useNavigate();
  const { requestId, role } = useParams();
  const { userToken, User } = useContext(UserContext);
  const [page, setPage] = useState("Descirption");

  const [response, setResponse] = useState({});

  const gatData = async () => {
    try {
      const { data } = await axios.get(`/api/${role}/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
        });
      setResponse(data);
    
    } catch (e) {
      console.log(e);
    }

  };

  useEffect(() => {
    gatData();
  }, [])

  console.log(User)
  return (
    <div className={`container w-75  py-5 color2 ${style.response} kiwiMaruFont`}>

      <div className={`mt-4  bgcolor5 rounded-5 border d-flex flex-column justify-content-start gap-5`}>
        <ul className={`mb-0  ps-0 d-flex align-self-stretch flex-wrap justify-content-start align-items-center bgwhiteC `}>
          <li onClick={() => setPage("Descirption")} className={`py-3 px-4 fw-semibold ${page == "Descirption" ? "bgcolor5" : ""}`}>Descirption</li>
          <li onClick={() => setPage("GeneralReport")} className={`py-3 px-4 fw-semibold ${page == "GeneralReport" ? "bgcolor5" : ""}`}>General Report</li>
          <li onClick={() => setPage("Medicine")} className={`py-3 px-5 py-3 px-4 fw-semibold ${page == "Medicine" ? "bgcolor5" : ""}`}>Medicine</li>
          <li onClick={() => setPage("ChronicDisease")} className={`py-3 px-5 py-3 px-4 fw-semibold ${page == "ChronicDisease" ? "bgcolor5" : ""}`}>Chronic Disease</li>
          <li onClick={() => setPage("Allergy")} className={`py-3 px-5 py-3 px-4 fw-semibold ${page == "Allergy" ? "bgcolor5" : ""}`}>Allergy</li>
          <li className={`py-3 px-2 py-3  text-end flex-grow-1 `}>
            {role == "Doctor" ?
              <Link to={`/patient/${response.patientName}`} className={` rounded-5 px-3 py-2 color4 bgcolor2 text-decoration-none`}>{response.patientName}</Link>
              :
              <Link to={`/DoctorProfile/${response.doctorName}`} className={` rounded-5 px-3 py-2 color4 bgcolor2 text-decoration-none`}>Dr.{response.doctorName}</Link>
            }
          </li>
        </ul>
        {
          (page == "Descirption") ?
            <div className={`${style.Resp} pb-5 d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

              <div id="Descirption" className={`w-75`}  >
                <div className={`pt-4 pb-5 px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                  <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                    <span className={`fs-5 fw-semibold`}>Descirption</span>
                  </div>

                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                    <p className='w-100'>{response.description}</p>

                  </div>
                </div>
              </div>
            </div> : <></>
        }
        {
          (page == "GeneralReport") ? <>
            <div className={`${style.Resp} pb-5 d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

              <div id="GeneralReport" className={`w-75`}  >

                <div className={`pt-4 pb-5 px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                  <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                    <span className={`fs-5 fw-semibold`}>General Report</span>
                  </div>

                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.generalReport?.diagnosis ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Diagnosis </span>
                      </div>
                      <p className='w-100'>{response.generalReport?.diagnosis ? response.generalReport?.diagnosis : " None reported"}</p>
                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.generalReport?.treatmentPlan ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Treatment Plan  </span>
                      </div>
                      <p className='w-100 ' > {response.generalReport?.treatmentPlan ? response.generalReport?.treatmentPlan : " None reported"}</p>
                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.generalReport?.notes ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Notes  </span>
                      </div>
                      <p className='w-100'>{response.generalReport?.notes ? response.generalReport?.notes : " None reported"}</p>

                    </div>



                  </div>
                </div>
              </div>
            </div>
          </>
            :
            <></>


        }
        {
          page == "Medicine" ? <>
            <div className={`${style.Resp} pb-5 d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

              <div id="Medicine" className={`w-75`}  >

                <div className={`pt-4 pb-5  px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                  <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                    <span className={`fs-5 fw-semibold`}>Medicine</span>
                  </div>

                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.medicine?.medicineName ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Medicin Name </span>
                      </div>
                      <p className='w-100'>{response.medicine?.medicineName ? response.medicine?.medicineName : " None reported"} </p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.medicine?.dosage ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Dosage </span>
                      </div>
                      <p className='w-100 ' >{response.medicine?.dosage ? response.medicine?.dosage : " None reported"}</p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.medicine?.frequency ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Frequency  </span>
                      </div>
                      <p className='w-100'>{response.medicine?.frequency ? response.medicine?.frequency : " None reported"} </p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.medicine?.instructions ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Instructions  </span>
                      </div>
                      <p className='w-100'>{response.medicine?.instructions ? response.medicine?.instructions : " None reported"} </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
            :
            <></>


        }
        {
          page == "ChronicDisease" ? <>
            <div className={`${style.Resp} pb-5 d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

              <div id="ChronicDisease" className={`w-75`}  >

                <div className={`pt-4 pb-5  px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                  <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                    <span className={`fs-5 fw-semibold`}>Chronic Disease</span>
                  </div>

                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.chronicDisease?.chronicDiseaseName ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>chronic Disease Name </span>
                      </div>
                      <p className='w-100'>{response.chronicDisease?.chronicDiseaseName ? response.chronicDisease?.chronicDiseaseName : " None reported"}</p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.chronicDisease?.description ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Description </span>
                      </div>
                      <p className='w-100 ' >{response.chronicDisease?.description ? response.chronicDisease?.description : " None reported"}</p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.chronicDisease?.causes ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Causes  </span>
                      </div>
                      <p className='w-100'>{response.chronicDisease?.causes ? response.chronicDisease?.causes : " None reported"} </p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.chronicDisease?.symptoms ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }<span className={``}>Symptoms  </span>
                      </div>
                      <p className='w-100'>{response.chronicDisease?.symptoms ? response.chronicDisease?.symptoms : " None reported"} </p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.chronicDisease?.digonsis ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Digonsis  </span>
                      </div>
                      <p className='w-100'>{response.chronicDisease?.digonsis ? response.chronicDisease?.digonsis : " None reported"}</p>

                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.chronicDisease?.treatment ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Treatment  </span>
                      </div>
                      <p className='w-100'>{response.chronicDisease?.treatment ? response.chronicDisease?.treatment : " None reported"}</p>
                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.chronicDisease?.dateOfDiagonsis ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Date Of Diagonsis  </span>
                      </div>
                      <p className='w-100'>{response.chronicDisease?.dateOfDiagonsis ? response.chronicDisease?.dateOfDiagonsis : " None reported"}</p>

                    </div>



                  </div>
                </div>
              </div>
            </div>
          </>
            :
            <></>


        }
        {
          page == "Allergy" ? <>
            <div className={`${style.Resp} pb-5 d-flex justify-content-center align-items-center color2  ${style.response} kiwiMaruFont`}>

              <div id="Allergy" className={`w-75`}  >

                <div className={`pt-4 pb-5  px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                  <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                    <span className={`fs-5 fw-semibold`}>Allergy</span>
                  </div>

                  <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.allergy?.allergyName ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        }
                        <span className={``}>Allergy Name </span>
                      </div>
                      <p className='w-100'>{response.allergy?.allergyName ? response.allergy?.allergyName : " None reported"}</p>
                    </div>
                    <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                      <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center gap-3 `}>
                        {response.allergy?.symptons ? <i class="fa-solid fa-check fa-xl" style={{ color: "#48d564" }}></i>
                          :
                          <i class="fa-solid fa-xmark fa-xl" style={{ color: "#d81313" }}></i>
                        } <span className={``}>Symptons </span>
                      </div>
                      <p className='w-100 ' >{response.allergy?.symptons ? response.allergy?.symptons : " None reported"}</p>

                    </div>



                  </div>
                </div>
              </div>
            </div>
          </>
            :
            <></>


        }


      </div>

    </div>
  )
}

export default Response