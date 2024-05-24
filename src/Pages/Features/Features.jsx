import React from 'react'
import FeatureCard from './FeatureCard.jsx'
import style from './Features.module.css'
function Features() {
  let featuresArray = [
    {
      title: 'Health Trackers',
      description: 'Monitor your health and track vital signs such as blood pressure, blood sugar levels, and activity levels using integrated health tracking tools'
    }, {
      title: 'Customizable Profiles',
      description: 'Create customizable user profiles with preferences, medical history, and health goals to personalize the healthcare experience and receive tailored recommendations'
    }, {
      title: 'Health Records Access Control',
      description: ' Control access to personal health records and selectively share information with healthcare providers'
    }, {
      title: 'Chronic Disease Managemen',
      description: ' Implement tools and resources for managing chronic conditions'
    }, {
      title: 'Health Record Management',
      description: 'Provide a centralized platform for managing and organizing all health-related documents, including medical records, test results,  ensuring easy access with healthcare providers'
    }
  ]
  return (

    <div className={`${style.box} py-4 my-4`}>
      <div className={`d-flex justify-content-start align-items-center gap-3 m-5 mb-4 ps-5 `}>
        <i className="fa-solid fa-heart fa-2xl" style={{ color: "#176b87" }}></i>
        <h4 className={`kiwiMaruFont color2 fw-semibold`}>How Can Our Website Enhance Your Experience?</h4>

      </div>
      <div className={`mt-3 mb-4 pt-3 pb-4 d-flex justify-content-center gap-3 row-gap-3 flex-wrap`}>
        {featuresArray.map((feature) => (
          <FeatureCard
            title={feature.title}
            description={feature.description}
          />
        ))
        }


      </div>
    </div>

  )
}

export default Features