import React from 'react';
import './styless.css';
import { Typography } from '@mui/material';

const CookiesPolitics = () => {
    const sections = [
        {
            title: 'Introduccción',
            content: (
                <>
                    Kamienimportaciones informa acerca del uso de las cookies en su página web: <strong><u>kamien.store</u></strong>
                    <br /> <br />
                    En Costa Rica, la regulación del comercio electrónico se basa en la normativa establecida en el Código de
                    Comercio, el Código Civil y las leyes relacionadas con la defensa del consumidor, como la Ley de Promoción
                    de la Competencia y Defensa Efectiva del Consumidor (Ley N° 7472), entre otras. Sin embargo, dado que el
                    comercio electrónico se lleva a cabo principalmente a través de Internet y sus transacciones se realizan
                    en un entorno electrónico, requiere una regulación especial para proteger de manera adecuada a los
                    consumidores, quienes son considerados la parte más vulnerable en la relación de consumo.
                    <br /> <br />
                    Debido a la falta de una ley específica emitida por la Asamblea General, el Poder Ejecutivo reformó el
                    Reglamento de la Ley de Promoción de la Competencia y Defensa Efectiva del Consumidor (N° 7472, N° 37899-MEIC)
                    en el año 2017. Esta reforma dio lugar al establecimiento del Capítulo X, el cual aborda la protección al
                    consumidor en el contexto del comercio electrónico.
                    <br /> <br />
                    En cumplimiento con lo dispuesto esta página web le informa, en esta sección, sobre la política de recogida
                    y tratamiento de cookies.

                </>
            )
        },
        {
            title: '¿Qué son las cookies?',
            content: (
                <>
                    Las cookies son archivos que se pueden descargar en su equipo a través de las páginas web. Son herramientas
                    que tienen un papel esencial para la prestación de numerosos servicios de la sociedad de la información.
                    Entre otros, permiten a una página web almacenar y recuperar información sobre los hábitos de navegación de
                    un usuario o de su equipo y, dependiendo de la información obtenida, se pueden utilizar para reconocer al
                    usuario y mejorar el servicio ofrecido.
                </>
            )
        },
        {
            title: '¿Qué tipos de cookies utiliza esta página web?',
            content: (
                <>
                    Esta página web utiliza los siguientes tipos de cookies:
                    <br /> <br />
                    <strong><u>Cookies de análisis</u></strong>: Son aquéllas que bien tratadas por nosotros o por terceros, nos
                    permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización
                    que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en nuestra página web con el
                    fin de mejorar la oferta de productos o servicios que le ofrecemos.
                    <br /> <br />
                    <strong><u>Cookies técnicas</u></strong>: Son aquéllas que permiten al usuario la navegación a través del área
                    restringida y la utilización de sus diferentes funciones, como por ejemplo, llevar a cambio el proceso de
                    compra de un artículo.
                    <br /> <br />
                    <strong><u>Cookies de personalización</u></strong>: Son aquéllas que permiten al usuario acceder al servicio
                    con algunas características de carácter general predefinidas en función de una serie de criterios en el
                    terminal del usuario como por ejemplo serían el idioma o el tipo de navegador a través del cual se conecta
                    al servicio.
                    <br /> <br />
                    <strong><u>Cookies publicitarias</u></strong>: Son aquéllas que, bien tratadas por esta web o por terceros,
                    permiten gestionar de la forma más eficaz posible la oferta de los espacios publicitarios que hay en la
                    página web, adecuando el contenido del anuncio al contenido del servicio solicitado o al uso que realice
                    de nuestra página web. Para ello podemos analizar sus hábitos de navegación en Internet y podemos mostrar
                    le publicidad relacionada con su perfil de navegación.
                    <br /> <br />
                    <strong><u>Cookies de publicidad comportamental</u></strong>: Son aquéllas que permiten la gestión, de la
                    forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una
                    página web, aplicación o plataforma desde la que presta el servicio solicitado. Este tipo de cookies almacenan
                    información del comportamiento de los visitantes obtenida a través de la observación continuada de sus hábitos
                    de navegación, lo que permite desarrollar un perfil específico para mostrar avisos publicitarios en función
                    del mismo.

                </>
            )
        },
        {
            title: 'Cookies usadas en la página Kamien.store',
            content: (
                <>
                    <table border="1">
                        <tbody>
                            <tr>
                                <td>Nombre</td>
                                <td>Proveedor</td>
                                <td>Categoría</td>
                                <td>Los datos se envían durante</td>
                            </tr>
                            <tr>
                                <td>1P_JAR</td>
                                <td>.gstatic.com</td>
                                <td>Análisis</td>
                                <td>Sesión</td>
                            </tr>
                            <tr>
                                <td>categorySelected</td>
                                <td>kamien.store</td>
                                <td>Técnica</td>
                                <td>Sesión</td>
                            </tr>
                            <tr>
                                <td>firebaseLocalStorageDb#firebaseLocalStorage</td>
                                <td>kamien.store</td>
                                <td>Terceros</td>
                                <td>Sesión</td>
                            </tr>
                            <tr>
                                <td>firebase-heartbeat-database#firebase-heartbeat-store</td>
                                <td>kamien.store</td>
                                <td>Terceros</td>
                                <td>Sesión</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )
        },
        {
            title: 'Desactivar las cookies.',
            content: (
                <>
                    Puede usted <strong>permitir, bloquear o eliminar las cookies</strong> instaladas en su equipo mediante la
                    configuración de las opciones del navegador instalado en su ordenador.
                    <br /> <br />
                    En la mayoría de los navegadores web se ofrece la posibilidad de permitir, bloquear o eliminar las cookies
                    instaladas en su equipo.
                    <br /> <br />
                    A continuación puede acceder a la configuración de los navegadores webs más frecuentes para aceptar,
                    instalar o desactivar las cookies:
                    <br /> <br />
                    <a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>Configurar cookies en Google Chrome</a>
                    <br /> <br />
                    <a href="http://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>Configurar cookies en Microsoft Internet Explorer</a>
                    <br /> <br />
                    <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectlocale=es&redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>Configurar cookies en Mozilla Firefox</a>
                    <br /> <br />
                    <a href="https://support.apple.com/es-es/HT201265" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>Configurar cookies en Safari (Apple)</a>
                </>
            )
        },
        {
            title: 'Aceptación de la Política de cookies ',
            content: (
                <>
                    <strong>kamien.store</strong> asume que usted acepta el uso de cookies. No obstante, muestra información sobre
                    su Política de cookies en la parte inferior o superior de cualquier página del portal con cada inicio de sesión
                    con el objeto de que usted sea consciente.
                    <br /> <br />
                    Ante esta información es posible llevar a cabo las siguientes acciones:
                    <br /> <br />
                    <li>
                        Aceptar cookies. No se volverá a visualizar este aviso al acceder a cualquier página del portal durante
                        la presente sesión.
                    </li>
                    <li>
                        Cerrar. Se oculta el aviso en la presente página.
                    </li>
                    <li>Modificar su configuración. Podrá obtener más información sobre qué son las cookies, conocer la
                        Política de cookies de www.miempresa.es y modificar la configuración de su navegador.</li>
                </>
            )
        },
    ]

    return (
        <div className='main-cookies-politics-container'>
            <div className='cookies-politics-container'>
                <div className='cookies-politics-title-container'>
                    <Typography variant="h4">Política de cookies</Typography>
                </div>
                <div className='cookies-politics-information'>
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h2>{section.title}</h2>
                            <div>{section.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CookiesPolitics