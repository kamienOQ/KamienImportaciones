import { Typography } from '@mui/material';
import steven from '../assets/steven.webp';
import cristopher from '../assets/cristopher.webp';
import jose from '../assets/jose.webp';
import victor from '../assets/victor.webp';
import derian from '../assets/derian.webp';
import Developers from './Developers';


const DevelopersPage = () => {
    // Array de objetos de desarrolladores
    const developers = [
        { name: 'Steven Gerardo Alvarado Aguilar', image: steven, github: 'https://github.com/StevenAlvaradoAguilar', linkedin: 'https://www.linkedin.com/in/stevenalvaradoa/' },
        { name: 'Cristopher González Solís', image: cristopher, github: 'https://github.com/cris-gs', linkedin: 'https://www.linkedin.com/in/cristopher-gonzalez-solis-6832a0239/' },
        { name: 'Jose Carlo Hidalgo Chacón', image: jose, github: 'https://github.com/JoseCHidalgo', linkedin: 'https://www.linkedin.com/in/josehidalgoch/' },
        { name: 'Victor Julio Montero Alfaro', image: victor, github: 'https://github.com/VictorMA345', linkedin: 'https://www.linkedin.com/in/v%C3%ADctor-julio-montero-alfaro-9a270326a/' },
        { name: 'Derian Martín Rodríguez Durán', image: derian, github: 'https://github.com/derianrddev', linkedin: 'https://www.linkedin.com/in/derian-rodriguez22/' }
    ];

    return (
        <div className='main-developers-container animate__animated animate__fadeIn animate__slow'>
            <div className='developers-container'>
                <div className='developers-title-container'>
                    <Typography variant="h4">Desarrolladores</Typography>
                </div>
                <div className='developers-grid'>
                    {developers.map((developer, index) => (
                        <Developers
                            key={index}
                            name={developer.name}
                            image={developer.image}
                            github={developer.github}
                            linkedin={developer.linkedin}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DevelopersPage;