import React, { useEffect, useState } from 'react';
import './styless.css';
import { useNavigate } from 'react-router-dom';
import cookie from '../../assets/cookie.webp';

const NoticeCookies = () => {
    const [showNotice, setShowNotice] = useState(true);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const navigate = useNavigate();

    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
    });

    useEffect(() => {
        // Check the cookies haven been accepted previously
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (cookiesAccepted) {
            // Accepted cookies we hide the notice
            setShowNotice(false);
            hideNotice();
        };
    }, []);

    // Accepted cookies and save in localStorage and hide the notice
    const aceptarCookies = () => {
        // Set the cookie with value 'true' and expiration in 30 days
        document.cookie = '1P_JAR=true; expires=' + new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString() + '; path=/';
        document.cookie = 'myAwesomeCookieConsent=true; expires=' + new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString() + '; path=/';
        document.cookie = 'categorySelected=true; expires=' + new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString() + '; path=/';
        document.cookie = 'firebaseLocalStorageDb#firebaseLocalStorage=true; expires=' + new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString() + '; path=/';
        document.cookie = 'firebase-heartbeat-database#firebase-heartbeat-store=true; expires=' + new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString() + '; path=/';

        // We save in localStorage that cookies have been accepted
        localStorage.setItem('cookiesAccepted', 'true');

        // We update the statuses
        setCookiesAccepted(true);
        setShowNotice(false);
    };

    const rechazarCookies = () => {
        // Rwmove cookies don't accepted from localStorage
        localStorage.removeItem('cookiesAccepted')

        // We update the cookies in false
        document.cookie = '1P_JAR=false; path=/';
        document.cookie = 'myAwesomeCookieConsent=false; path=/';
        document.cookie = 'categorySelected=false; path=/';
        document.cookie = 'firebaseLocalStorageDb#firebaseLocalStorage=false; path=/';
        document.cookie = 'firebase-heartbeat-database#firebase-heartbeat-store=false; path=/';

        setShowNotice(false);
    };

    const hideNotice = () => {
        const noticeContainer = document.querySelector('notice-cookies-container');
        if (noticeContainer) {
            noticeContainer.innerHTML = ''; // Replace the class
        };
    }

    const redirectPoliticsCookies = () => {
        navigate('/politica-cookies');
    };

    return (
        showNotice && (
            <div className="notice-cookies-container animate__animated animate__fadeIn">
                <div className="cookie-icon-container">
                    <img src={cookie} alt="Cookies" className="cookie-icon" />
                </div>
                <div className="notice-cookies">
                    <p>Este sitio web utiliza cookies para mejorar la experiencia de usuario.</p>
                    <p>Al continuar navegando, aceptas el uso de cookies.</p>
                    <div className="buttons-cookies">
                        <button onClick={aceptarCookies} className='aceptar-cookies'>Aceptar</button>
                        <button onClick={rechazarCookies} className='rechazar-cookies'>Rechazar</button>
                    </div>
                    <p>Lea nuestra <a onClick={redirectPoliticsCookies}>Politica de Cookies</a> para obtener una descripción más detallada.</p>
                </div>
            </div>
        )
    )
}

export default NoticeCookies