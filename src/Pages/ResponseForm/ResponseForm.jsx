import React, { useContext, useEffect, useState } from 'react'
import axios, { all } from 'axios'
import { UserContext } from '../../Context/User';
import { useParams, Link, useNavigate } from 'react-router-dom';
import style from './ResponseForm.module.css'

import { ToastContainer } from 'react-toastify';
import { Bounce, toast } from 'react-toastify';
function ResponseForm() {
  const navigate = useNavigate();
  const { requestId, doctorId, doctorName, patientId, patientName } = useParams();
  const { userToken, User } = useContext(UserContext);
  const [page, setPage] = useState("GeneralReport");
  const [generalReport, setGeneralReport] = useState({
    diagnosis: "",
    treatmentPlan: "",
    notes: "",
    attachment:"",
  });
  const [allergy, setAllergy] = useState({
    allergyName: "",
    symptons: ""
  },)
  const [chronicDisease, setChronicDisease] = useState({
    chronicDiseaseName: "",
    description: "",
    causes: "",
    symptoms: "",
    digonsis: "",
    treatment: "",
    dateOfDiagonsis: ""
  });
  const [medicine, setMedicine] = useState({
    medicinName: "",
    dosage: "",
    frequency: "",
    instructions: "",
    isMaintenace: true,
  });
  const [response, setResponse] = useState({
    requestId: requestId,
    doctorId: doctorId,
    doctorName: doctorName,
    patientId: patientId,
    patientName: patientName,
    allergy: allergy,
    chronicDisease: chronicDisease,
    medicine: medicine,
    generalReport: generalReport,
  });

  const handleChangeGeneralReport = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setGeneralReport({
      ...generalReport,
      [name]: value,
    });
    setResponse({
      ...response,
      generalReport: generalReport,
    });

  };

  const handleChronicDisease = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setChronicDisease({
      ...chronicDisease,
      [name]: value,
    });
    setResponse({
      ...response,
      chronicDisease: chronicDisease,
    });

  };

  const handleAllergy = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAllergy({
      ...allergy,
      [name]: value,
    });
    setResponse({
      ...response,
      allergy: allergy,
    });

  };
  const handleChangeMedicin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMedicine({
      ...medicine,
      [name]: value,
    });
    setResponse({
      ...response,
      medicine: medicine,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/response', response,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
        });
        toast.success("Response sent successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate(`/DoctorProfile/${doctorName}`);
    } catch (e) {
      console.log(e);
    }

  };

  console.log(response);

  return (
    <div className={`container w-75  py-5 color2 ${style.responseForm} kiwiMaruFont`}>
      <form onSubmit={handleSubmit}>
        <div className={`mt-4  bgcolor5 rounded-5 border d-flex flex-column justify-content-start gap-5`}>
          <ul className={`mb-0  ps-0 d-flex align-self-stretch flex-wrap justify-content-start align-items-center bgwhiteC `}>
            <li onClick={() => setPage("GeneralReport")} className={`py-3 px-4 fw-semibold ${page == "GeneralReport" ? "bgcolor5" : ""}`}>General Report</li>
            <li onClick={() => setPage("Medicine")} className={`py-3 px-5 py-3 px-4 fw-semibold ${page == "Medicine" ? "bgcolor5" : ""}`}>Medicine</li>
            <li onClick={() => setPage("ChronicDisease")} className={`py-3 px-5 py-3 px-4 fw-semibold ${page == "ChronicDisease" ? "bgcolor5" : ""}`}>Chronic Disease</li>
            <li onClick={() => setPage("Allergy")} className={`py-3 px-5 py-3 px-4 fw-semibold ${page == "Allergy" ? "bgcolor5" : ""}`}>Allergy</li>
            <li className={`flex-grow-1 text-end px-5`}><input className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded-5`} type='submit' value='Save'></input>
            </li>
          </ul>

          {
            page == "GeneralReport"  ? <>
              <div className={`${style.Form} pb-5 d-flex justify-content-center align-items-center color2  ${style.responseForm} kiwiMaruFont`}>

                <div id="GeneralReport" className={`w-75`}  >

                  <div className={`pt-4 pb-5 px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                      <span className={`fs-5 fw-semibold`}>General Report</span>
                    </div>

                    <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Diagnosis </span>
                        <textarea onChange={handleChangeGeneralReport} type='text' name='diagnosis' value={generalReport.diagnosis} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Treatment Plan </span>
                        <textarea onChange={handleChangeGeneralReport} type='text' name='treatmentPlan' value={generalReport.treatmentPlan} className='w-100 ' ></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Notes  </span>
                        <textarea onChange={handleChangeGeneralReport} type='text' name='notes' value={generalReport.notes} className='w-100'></textarea>

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
              <div className={`${style.Form} pb-5 d-flex justify-content-center align-items-center color2  ${style.responseForm} kiwiMaruFont`}>

                <div id="Medicine" className={`w-75`}  >

                  <div className={`pt-4 pb-5  px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                      <span className={`fs-5 fw-semibold`}>Medicine</span>
                    </div>

                    <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Medicin Name </span>
                        <textarea onChange={handleChangeMedicin} type='text' name='medicinName' value={medicine.medicinName} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Dosage </span>
                        <textarea onChange={handleChangeMedicin} type='text' name='dosage' value={medicine.dosage} className='w-100 ' ></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Frequency  </span>
                        <textarea onChange={handleChangeMedicin} type='text' name='frequency' value={medicine.frequency} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Instructions  </span>
                        <textarea onChange={handleChangeMedicin} type='text' name='instructions' value={medicine.instructions} className='w-100'></textarea>

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
              <div className={`${style.Form} pb-5 d-flex justify-content-center align-items-center color2  ${style.responseForm} kiwiMaruFont`}>

                <div id="ChronicDisease" className={`w-75`}  >

                  <div className={`pt-4 pb-5  px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                      <span className={`fs-5 fw-semibold`}>Chronic Disease</span>
                    </div>

                    <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>chronic Disease Name </span>
                        <textarea onChange={handleChronicDisease} type='text' name='chronicDiseaseName' value={chronicDisease.chronicDiseaseName} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Description </span>
                        <textarea onChange={handleChronicDisease} type='text' name='description' value={chronicDisease.description} className='w-100 ' ></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Causes  </span>
                        <textarea onChange={handleChronicDisease} type='text' name='causes' value={chronicDisease.causes} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Symptoms  </span>
                        <textarea onChange={handleChronicDisease} type='text' name='symptoms' value={chronicDisease.symptoms} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Digonsis  </span>
                        <textarea onChange={handleChronicDisease} type='text' name='digonsis' value={chronicDisease.digonsis} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Treatment  </span>
                        <textarea onChange={handleChronicDisease} type='text' name='treatment' value={chronicDisease.treatment} className='w-100'></textarea>

                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Date Of Diagonsis  </span>
                        <textarea onChange={handleChronicDisease} type='text' name='dateOfDiagonsis' value={chronicDisease.dateOfDiagonsis} className='w-100'></textarea>

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
              <div className={`${style.Form} pb-5 d-flex justify-content-center align-items-center color2  ${style.responseForm} kiwiMaruFont`}>

                <div id="Allergy" className={`w-75`}  >

                  <div className={`pt-4 pb-5  px-5 d-flex flex-column gap-3  bgwhiteC w-100 border rounded-5`}>
                    <div className={`p-2 d-flex flex-wrap justify-content-between align-items-center border-bottom `}>
                      <span className={`fs-5 fw-semibold`}>Allergy</span>
                    </div>

                    <div className={`pt-4  d-flex flex-column justify-content-start gap-4`}>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Allergy Name </span>
                        <textarea onChange={handleAllergy} type='text' name='allergyName' value={allergy.allergyName} className='w-100'></textarea>
                      </div>
                      <div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Symptons </span>
                        <textarea onChange={handleAllergy} type='text' name='symptons' value={allergy.symptons} className='w-100 ' ></textarea>

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

      </form>
    </div>
  )
}

export default ResponseForm






  /*
  const clearGeneralReport = () =>{
    setGeneralReport({
      attachment: "",
      treatmentPlan: "",
      notes: "",
    });
    setResponse({
      ...response,
      generalReport:generalReport,
    });
  }*/
/*
  const clearMedicine = () => {
    setMedicine({
      medicinName: "",
      dosage: "",
      frequency: "",
      instructions: "",
      isMaintenace: false,
    });
    setResponse({
      ...response,
      medicine:medicine
    });
  };*/
  
  /*
  const clearChronicDisease = () =>{
    setChronicDisease({
      chronicDiseaseName: "",
      description: "",
      causes: "",
      symptoms: "",
      digonsis: "",
      treatment: "",
      dateOfDiagonsis: ""
    });
    setResponse({
      ...response,
      chronicDisease:chronicDisease
    });
  };*/
  /*const clearAllergy = () => {
    setAllergy({
      allergyName: "",
      symptons: "",
    });
    setResponse({
      ...response,
      allergy: allergy,
    });
  };*/
  /*const handleChangeMedicin2 = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setMedicine({
      ...medicine,
      isMaintenace: (value=="Yes")?true:false,
    });
    setResponse({
      ...response,
      medicine: medicine,
    });
  };*/


  {/* <div className={`d-flex mt-4 flex-wrap border-top p-3 justify-content-end align-items-center gap-3`}>
                        <button onClick={clearAllergy} className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`}>Clear</button>

                      </div>
          */}


             
                   
{/*
                      <div className={`d-flex mt-4 flex-wrap border-top p-3 justify-content-end align-items-center gap-3`}>
                        <button onClick={clearChronicDisease} className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`}>Clear</button>

                      </div>
          */}  { /*<div className={`d-flex flex-column justify-content-start align-items-start gap-3`}>
                        <span className={``}>Is Maintenace (Yes / No) </span>
                        <textarea onChange={handleChangeMedicin2} type='text' id="true" name='isMaintenace' value={medicine.instructions?"Yes":"No"} className='w-100' ></textarea>
                      </div>

                      <div className={`d-flex mt-4 flex-wrap border-top p-3 justify-content-end align-items-center gap-3`}>
                        <button onClick={clearMedicine} className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`}>Clear</button>

                      </div>

          */}   
                     {/*<div className={`d-flex mt-4 flex-wrap border-top p-3 justify-content-end align-items-center gap-3`}>
                        <button onClick={clearGeneralReport} className={`text-decoration-none bgcolor2 border-0 color4 px-3 py-1 rounded`}>Clear</button>

          </div>*/}