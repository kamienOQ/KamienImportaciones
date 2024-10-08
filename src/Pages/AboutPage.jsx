import React from 'react';
import { useAboutStore } from '../hooks/useAboutStore';
import Spinner from '../Spinner';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const AboutPage = () => {
  const { description, name, logo } = useAboutStore();
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className='about-container animate__animated animate__fadeIn animate__slow'>
      <div className='about-container-firstSection'>
        <div className='firstSection-data-container'>
          <div className='data-container'>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className='firstSection-img-container'>
          {loading && <Spinner />}
          <motion.img
            src={logo}
            alt=""
            className='firstSection-img'
            loading="lazy"
            onLoad={handleImageLoad}
            style={{ display: loading ? 'none' : 'block' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
      </div>


    </div>
  )
}