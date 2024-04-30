import React from 'react'
import FeatureCard from './FeatureCard.jsx'

function Features() {
  let featuresArray = [
    {
      title:'Health Trackers',
      description: 'Monitor your health and track vital signs such as blood pressure, blood sugar levels, and activity levels using integrated health tracking tools'
    }, {
      title:'Customizable Profiles',
      description: 'Create customizable user profiles with preferences, medical history, and health goals to personalize the healthcare experience and receive tailored recommendations'
    },{
      title:'Health Records Access Control',
      description:' Control access to personal health records and selectively share information with healthcare providers'
    },{
      title:'Chronic Disease Managemen',
      description:' Implement tools and resources for managing chronic conditions'
    },{
      title:'Integrative Health Record Management',
      description:'Provide a centralized platform for managing and organizing all health-related documents, including medical records, test results,  ensuring easy access with healthcare providers'
    }
  ]
  return (
    <div className={`my-5 p-5 d-flex justify-content-center gap-3 row-gap-3 flex-wrap`}>
     {featuresArray.map((feature) => (
      <FeatureCard
        title={feature.title}
        description={feature.description}
      />
     ))
    }
      

    </div>
  )
}

export default Features