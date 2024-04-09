import React from 'react';
import { useAboutStore } from '../hooks/useAboutStore';

export const AboutPage = () => {

  const { description, name, logo } = useAboutStore();
  return (
    <div className='about-container'>
      <div className='about-container-firstSection'>
        <div className='firstSection-data-container'>
          <div className='data-container'>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className='firstSection-img-container'>
          <img src={logo} alt="" className='firstSection-img' loading="lazy" />
        </div>
      </div>


    </div>
  )
}