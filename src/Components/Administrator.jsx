import {
    AppBar,
    Avatar,
    Box,
    Container,
    Dialog,
    IconButton,
    Rating,
    Slide,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
  } from '@mui/material';
import { Close, StarBorder } from '@mui/icons-material';
import { forwardRef, useEffect, useState } from 'react';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
// import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });

  const handleClose = () => {
    console.log("Manejar Cierre")
//   dispatch({ type: 'UPDATE_ROOM', payload: null });
  };
// Boolean(room)
const Administrator = () => {
  return (
     <Dialog
      fullScreen
      open={true}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
          <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
                    {/* {Administrados?.title} */}
                    Victor Julio Montero
                </Typography>
                <IconButton color="inherit" onClick={handleClose}>
                    <Close />
                </IconButton>
            </Toolbar>
          </AppBar>
          <Container sx={{ pt: 5 }}>
            {/* <Swiper
                modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
                centeredSlides
                slidesPerView={2}
                grabCursor
                navigation
                autoplay
                lazy
                zoom
                effect="coverflow"
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                >
            
            </Swiper> */}
          </Container>
    </Dialog>
  )
}

export default Administrator;