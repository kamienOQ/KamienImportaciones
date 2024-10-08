import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Developers = ({ name, image, github, linkedin }) => { 
    return (
        <div className='developers-card'>
            <figure className='container-figure-img'>
                <motion.img
                    src={image}
                    alt={name}
                    loading="lazy"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                />
            </figure>
            <div className='container-figure-img-name'>
                <p>{name}</p>
            </div>
            <div className='main-developers-contactInfo'>
                <div className='developers-contactInfo'>
                    <div className='network-button-wrapper'>
                        <IconButton
                            className='network-button'
                            sx={{ backgroundColor: 'tertiary.main', borderRadius: 5 }}
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon sx={{ color: 'dark.main' }} />
                        </IconButton>
                        <IconButton
                            className='network-button'
                            sx={{ backgroundColor: 'tertiary.main', borderRadius: 5 }}
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedInIcon sx={{ color: 'dark.main' }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Developers;