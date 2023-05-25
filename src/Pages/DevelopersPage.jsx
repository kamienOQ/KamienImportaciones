import { IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import steven from '../assets/steven.jpg'
import cristopher from '../assets/cristopher.jpeg'
import jose from '../assets/jose.jpeg'
import victor from '../assets/victor.jpeg'
import derian from '../assets/derian.jpeg'


export const DevelopersPage = () => {
  return (
    <div className='main-developers-container'>
        <div className='developers-container'>
            <div className='developers-title-container'>
                <Typography variant="h4">Desarrolladores</Typography>
            </div>
            <div className='developers-grid'>
                <div className='developers-card'>
                    <figure className='container-figure-img'>
                        <img src={steven} alt="Steven" />
                    </figure>
                    <p>Steven Gerardo Alvarado Aguilar</p>
                    <div className='main-developers-contactInfo'>
                        <div className='developers-contactInfo'>
                            <IconButton className='network-button' 
                                sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://github.com/StevenAlvaradoAguilar'
                            >
                                <GitHubIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                            <IconButton 
                                className='network-button' sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://www.linkedin.com/in/steven-gerardo-alvarado-aguilar-2868b014a/'
                            >
                                <LinkedInIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className='developers-card'>
                    <figure className='container-figure-developers-img'>
                        <img src={cristopher} alt="Cristopher" />
                    </figure>
                    <p>Cristopher González Solís</p>
                    <div className='main-developers-contactInfo'>
                        <div className='developers-contactInfo'>
                        <IconButton className='network-button' 
                                sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://github.com/cris-gs'
                            >
                                <GitHubIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                            <IconButton 
                                className='network-button' sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://www.linkedin.com/in/cristopher-gonzalez-solis-6832a0239/'
                            >
                                <LinkedInIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className='developers-card'>
                    <figure className='container-figure-developers-img'>
                        <img src={jose} alt="Jose" />
                    </figure>
                    <p>Jose Carlo Hidalgo Chacón</p>
                    <div className='main-developers-contactInfo'>
                        <div className='developers-contactInfo'>
                        <IconButton className='network-button' 
                                sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://github.com/JoseCHidalgo'
                            >
                                <GitHubIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                            <IconButton 
                                className='network-button' sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://www.linkedin.com/in/josehidalgoch/'
                            >
                                <LinkedInIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className='developers-card'>
                    <figure className='container-figure-developers-img'>
                        <img src={victor} alt="Victor" />
                    </figure>
                    <p>Victor Julio Montero Alfaro</p>
                    <div className='main-developers-contactInfo'>
                        <div className='developers-contactInfo'>
                        <IconButton className='network-button' 
                                sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://github.com/VictorMA345'
                            >
                                <GitHubIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                            <IconButton 
                                className='network-button' sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://www.linkedin.com/in/v%C3%ADctor-julio-montero-alfaro-9a270326a/'
                            >
                                <LinkedInIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className='developers-card'>
                    <figure className='container-figure-developers-img'>
                        <img src={derian} alt="Derian" />
                    </figure>
                    <p>Derian Martín Rodríguez Durán</p>
                    <div className='main-developers-contactInfo'>
                        <div className='developers-contactInfo'>
                        <IconButton className='network-button' 
                                sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://github.com/derianrddev'
                            >
                                <GitHubIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                            <IconButton 
                                className='network-button' sx={{backgroundColor: 'tertiary.main', borderRadius: 5}}
                                href='https://www.linkedin.com/in/derian-rodriguez22/'
                            >
                                <LinkedInIcon sx={{color: 'dark.main'}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
