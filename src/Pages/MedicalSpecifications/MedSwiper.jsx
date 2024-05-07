import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "./card.css"
import '../../../node_modules/swiper/swiper-bundle.min.css';

import surgery from '../../../public/scalpel.png'
import heart from '../../../public/cardio.png'
import test from '../../../public/test.png'
import tooth from '../../../public/tooth.png'
import ribbon from '../../../public/ribbon.png'
import maternity from '../../../public/maternity.png'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import MedicalSpecifications from './MedicalSpecifications';

export default function MedSwiper() {
    const [MedSpeArray, setMedSpeArray] = useState([]);
    const GetMedSpe = async () => {
        try {
            const { data } = await axios.get(`/api/MedicalSpecification`);
            setMedSpeArray(data);
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

        <div className='container m-3 w-100'>
            <Swiper
            className='Swiper'
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                MedSpeArray.map((MedSpec) => (
                    <SwiperSlide  key={MedSpec.msId}>
                        <div className="book">
                            <NavLink to={`/DoctorMS/${MedSpec.msName}/${MedSpec.msId}`}>Show Doctor's <br />List <br /><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#176b87" d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" /></svg></NavLink>
                            <div className="cover">
                                <img src={arr[index++]} />
                                <p>{MedSpec.msName}</p>
                            </div>
                        </div>
                    </SwiperSlide>)

                )
            }


        </Swiper>
        </div>
        
    )
}
