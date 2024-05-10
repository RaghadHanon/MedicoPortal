import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './MedicalSpecification.css'
import '../../../node_modules/swiper/swiper-bundle.min.css';
import list from '../../../public/customer.png'
import surgery from '../../../public/scalpel.png'
import heart from '../../../public/cardiology.png'
import test from '../../../public/blood-test.png'
import tooth from '../../../public/tooth.png'
import ribbon from '../../../public/ribbon.png'
import maternity from '../../../public/mother.png'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import MdeCard from './MdeCard';

export default function Medicals() {
    const [MedSpeArray, setMedSpeArray] = useState([]);
    const GetMedSpe = async () => {
        try {
            const { data } = await axios.get(`/api/MedicalSpecification`);
            setMedSpeArray(data);
            console.log(MedSpeArray);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        GetMedSpe();
    }, []);

    let index = 0;
    const arr = [heart, surgery, test, tooth, ribbon, maternity];
    return (

        <div className='allMEd'>
            <div className='container m-3 w-100 d-flex gap-5 flex-column justify-content-center align-items-center'>
                <h2 className={`kiwiMaruFont color2 fw-semibold`}>Medical Specifications</h2>
                <div className='Specifics'>
                    {
                        MedSpeArray.map((MedSpec) => (
                            <div className="book">
                                <div className='inBook'>
                                    <img src={list} />
                                    <p>check Doctors list</p>
                                    <NavLink to={`/DoctorMS/${MedSpec.msName}/${MedSpec.msId}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" /></svg>
                                    </NavLink>
                                </div>

                                <div className="cover">
                                    <MdeCard MedImg={arr[index++]} description={MedSpec.msName} />

                                </div>
                            </div>
                        )
                        )
                    }
                </div>


            </div>
        </div>



    )
}
