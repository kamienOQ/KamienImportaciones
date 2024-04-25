import './styless.css'
import { Typography, Snackbar } from '@mui/material';
import emailjs from '@emailjs/browser';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useRef, useState } from 'react';

const ContactInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [checked, setChecked] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    email: '',
    cellphone: ''
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);

  const serviceId = import.meta.env.VITE_APP_SERVICE_ID;
  const templateId = import.meta.env.VITE_APP_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

  const form = useRef();

  useEffect(() => {
    // Validate the name
    if (firstName.length > 15) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'El nombre debe tener máximo 15 caracteres.'
      }))
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'El nombre sólo puede contener letras.'
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: ''
      }))
    };

    // Validate the lastName
    if (lastName.length > 25) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Los apellidos deben tener máximo 25 caracteres.'
      }))
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Los apellidos sólo pueden contener letras.'
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: ''
      }))
    };

    // Validate the subject
    if (subject.length > 20) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subject: 'El asunto debe tener máximo 20 caracteres.'
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subject: ''
      }))
    };

    // Validate the cellphone
    if (cellphone.length > 15) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cellphone: 'El celular debe tener máximo 8 caracteres.'
      }))
    } else if (!/^[0-9+]{0,8}$/.test(cellphone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cellphone: 'El celular sólo puede contener números.'
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cellphone: ''
      }))
    };

    // Validate the email
    if (email.length > 50) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'El correo debe tener máximo 50 caracteres.'
      }))
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'El correo debe contener un "@" y un ".".'
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ''
      }))
    };

  }, [firstName, lastName, subject, email, cellphone]);

  useEffect(() => {
    // Check if the checkbox is checked to enable/disable the submit button
    setSubmitEnabled(checked);
  }, [checked]);


  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    // Toggle the checked state
    setChecked(!checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        setStateMessage('Mensaje enviado');
        setIsSubmitting(false);
        setAlertMessage('Envío éxitoso del formulario, muchas gracias por sus comentarios!');
        setAlertSeverity('success');
        setAlertOpen(true);
        setTimeout(() => {
          setStateMessage(null);
        }, 5000);
        resetFormFields();
      },
        (error) => {
          setStateMessage('Algo salio mal, por favor intente otra vez');
          setIsSubmitting(false);
          setAlertMessage('No se pudo enviar el formulario, por favor intente otra vez!', error.text);
          setAlertSeverity('error');
          setAlertOpen(true);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        }
      );
  };

  const resetFormFields = () => {
    // Reset all form fields 
    setFirstName('');
    setLastName('');
    setEmail('');
    setSubject('');
    setCellphone('');
    setAbout('');
    setChecked(false);

    // Clear any form validation errors
    setErrors([]);
  }

  return (
    <div className='main-contact-info-container'>
      <div className='contact-info-container'>
        <div className='contact-info-title-container'>
          <Typography variant="h4">Contacto</Typography>
        </div>
        <div className='contact-info-information'>
          <form id='form' ref={form} onSubmit={handleSubmit}>
            <label htmlFor="firstname">
              Nombre:
            </label>
            <input
              type="text"
              id='firstName'
              name='firstName'
              placeholder='José '
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              required
            />
            {errors.firstName && <p>{errors.firstName}</p>}
            <label htmlFor="lastName">Apellidos:</label>
            <input
              type="text"
              id='lastName'
              name='lastName'
              placeholder='Arce Ruiz'
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              required
            />
            {errors.lastName && <p>{errors.lastName}</p>}
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id='subject'
              name='subject'
              placeholder='Inserte el asunto'
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            />
            {errors.subject && <p>{errors.subject}</p>}
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id='email'
              name='email'
              placeholder='Ejemplo del formato correo@gmail.com'
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
            {errors.email && <p>{errors.email}</p>}
            <label htmlFor="cellphone">Celular:</label>
            <input
              type="number"
              id='cellphone'
              name='cellphone'
              placeholder='Ejemplo del formato: 89475126'
              value={cellphone}
              onChange={(e) =>
                setCellphone(e.target.value)
              }
            />
            {errors.cellphone && <p>{errors.cellphone}</p>}
            <label htmlFor="about">Mensaje:</label>
            <textarea
              placeholder='Comentario'
              id='about'
              name='about'
              value={about}
              onChange={(e) =>
                setAbout(e.target.value)
              }
              required
            />
            {errors.about && <p>{errors.about}</p>}

            <input
              type="checkbox"
              id='PrivacyPolitic'
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="PrivacyPolitic" className="excluir">
              He leido y acepto la <a href="kamien.store/policy-politics" style={{ color: 'red' }}>política de privacidad.</a>
            </label>

            <div className='button-contact-info'>
              <button type='submit' value={'Send'} disabled={!submitEnabled}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        sx={{ alignItems: "flex-start", mt: "42px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MuiAlert
          sx={{ width: '100%' }}
          variant='filled'
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default ContactInfo