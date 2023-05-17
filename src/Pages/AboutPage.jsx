import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useAboutStore } from '../hooks/useAboutStore';

export const AboutPage = () => {

  const {description, instagram, name, whatsapp, logo} = useAboutStore();
  return (
    <div className='about-container'>
      <div className='about-container-firstSection'>
        <div className='firstSection-data-container'>
          <div className='data-container'>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className='comunication-container'>
            <div className='instagram-container'>
              <a href={instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            </div>
            
            <div className='whatsapp-container'> 
              <LocalPhoneIcon sx={{fontSize: 'small'}}/>
              <p>{whatsapp}</p>
            </div>
          </div>
        </div>
        <div className='firstSection-img-container'>
          <img src={logo} alt="" className='firstSection-img'/>
        </div>
      </div>

      
    </div>
  )
}