import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAboutStore } from '../hooks/useAboutStore';

export const AboutPage = () => {

  const { description, instagram, name, whatsapp, facebook, logo } = useAboutStore();
  return (
    <div className='about-container'>
      <div className='about-container-firstSection'>
        <div className='firstSection-data-container'>
          <div className='data-container'>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className='comunication-container'>
            <h4>Redes Sociales</h4>
            <div className='instagram-container'>
              <a href={instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon style={{ color: '#DE3163' }} /></a>
            </div>

            <div className='whatsapp-container'>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon style={{ color: 'SeaGreen' }} /></a>
            </div>
            <div className='facebook-container'>
              <a href={facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon style={{ color: '#0000FF' }}/></a>
            </div>
          </div>
        </div>
        <div className='firstSection-img-container'>
          <img src={logo} alt="" className='firstSection-img' loading="lazy" />
        </div>
      </div>


    </div>
  )
}