import { Avatar, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import logo from '../assets/logo.png'
export const MasterPage = () => {
  return (
    <div class="page-wrapper">
        <header className='header-navbar'>
            <IconButton sx={{ mr: 1 }} to="/">
              <Avatar src = {logo}/>
            </IconButton>
            <div className='navbar-shoppingCar'>
              <ShoppingCartIcon color='quaternary' sx={{marginTop: 2}}/>
              <div className='badge'>
                <span className='span-icon'>1</span>
              </div>
            </div>
        </header>
        <footer className='footer'>
          <div className='footer-socialNetworks'>
            <div className='socialNetworks-background'>
              <InstagramIcon/>
            </div>
          </div>
          <div className='footer-contactInfo'>
            <div className='phoneNumber'>
              <LocalPhoneIcon sx={{fontSize: 'small'}}/>
              <p>8123-6522</p>
            </div>
              <a href="">Acerca de nosotros</a>
          </div>
          <div className='footer-copyright'>
            Todos los derechos reservados hasta 2024.
          </div>
        </footer>
    </div>
  )
}
