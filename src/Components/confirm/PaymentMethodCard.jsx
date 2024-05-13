
import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import axios from 'axios';

const PaymentMethodCard = () => {
    const [token, setToken] = useState(''); // Campo obligatorio, tipo string. Token obtenido del método, GetTokenSdk del Api Tiliopay.
    const [tokenizationResult, setTokenizationResult] = useState('');
    const [paymentResult, setPaymentResult] = useState('');
    const [paymentUrl, setPaymentUrl] = useState('');
    const [transactionInfo, setTransactionInfo] = useState(null);
    const [integrationSettings, setIntegrationSettings] = useState({});
    const [error, setError] = useState(null);

    const [tilopayData, setTilopayData] = useState(null);
    const [sinpeMovilData, setSinpeMovilData] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedCard, setSelectedCard] = useState('');
    const [saveCards, setSaveCards] = useState([]);
    const [showCVV, setShowCVV] = useState(false);
    const [typeDni, setTypeDni] = useState(0); // Campo condicionado, tipo integer. Tipo de identificación (obligatorio para sinpe movil). Ver tabla tipos de identificación.
    const [dni, setDni] = useState(''); // Campo condicionado, tipo string. Número de identificación del cliente (obligatorio para sinpe movil).
    const [cardNumber, setCardNumber] = useState(''); // Estado para almacenar el número de tarjeta ingresado por el usuario
    const [cardType, setCardType] = useState(null); // Estado para almacenar el tipo de tarjeta
    const [sinpeData, setSinpeData] = useState(null);


    const [currency, setCurrency] = useState(''); // Campo obligatorio, tipo string, logitud de 3 caracteres. Códigos de divisa ISO 4217, ejemplo CRC, USD. Moneda de la compra.
    const [language, setLanguage] = useState(''); // Campo obligatorio, tipo string, logitud de 2 caracteres. Códigos ISO 639-1, ejemplo: en, es. Moneda de la compra.
    const [amount, setAmount] = useState(0.0); // Campo obligatorio, tipo decimal, logitud de 12,2 caracteres. Monto de la compra.
    const [billToEmail, setBillToEmail] = useState(''); // Campo obligatorio, tipo string. Correo electrónico del cliente.  
    /* Campo obligatorio, tipo string puede ser alfanumérico, de valor
        único, no se puede repitir por comercio. Número de orden, ejemplo: 1001, TPY-1001, xbkshHwqrKjs98.
    */
    const [orderNumber, setOrdeNumber] = useState(0); // Campo obligatorio, tipo string puede ser alfanumérico, de valor único, no se puede repitir por comercio. Número de orden, ejemplo: 1001, TPY-1001, xbkshHwqrKjs98.
    const [billToFirstName, setBillToFirstName] = useState(''); // Campo obligatorio, tipo string. Nombre del cliente.
    const [billToLastName, setBillToLastName] = useState(''); // Campo obligatorio, tipo string. Apellidos del cliente.
    const [billToAddress, setBillToAddress] = useState(''); // Campo obligatorio, tipo string. Dirección 1 del cliente.
    const [billToAddress2, setBillToAddress2] = useState(''); // Campo opcional, tipo string. Dirección 2 del cliente.
    const [billToCity, setBillTooCity] = useState(''); // Campo recomendado, tipo string. Ciudad del cliente.
    const [billToState, setBillToState] = useState(''); // Campo recomendado, tipo string. Estado del cliente.
    const [billToZipPostCode, setBillToZipPostCode] = useState(''); // Campo recomendado, tipo string. Código postal del cliente.
    const [billToCountry, setBillToCountry] = useState(''); // Campo recomendado, tipo string. País del cliente, ISO 3166-1 dos caracteres, ejemplo CR, FR, PA.
    const [billToTelephone, setBillToTelephone] = useState(''); // Campo recomendado, tipo string. Teléfono del cliente.
    const [capture, setCard] = useState(0); // Campo obligatorio, tipo integer. Indica si desea autorizar mediante un 0 (cero) o capturar mediante un 1 (uno) la compra.
    const [redirect, setRedirect] = useState(''); //Campo obligatorio, tipo string. Url (callback) donde se espera la respuesta final de la compra.
    const [subscription, setSubscription] = useState(''); // Campo obligatorio, tipo integer. Indica si el cliente desea guardar su tarjeta en Tilopay, 1 (uno) para si, 0 (cero) para no.

    const Apikey = import.meta.env.VITE_APP_TILOPAY_API_KEY;
    const ApiUser = import.meta.env.VITE_APP_TILOPAY_API_USER;
    const ApiPassword = import.meta.env.VITE_APP_TILOPAY_API_PASSWORD;

    useEffect(() => {
        // Function to fetch token 
        const fetchToken = async () => {
            try {
                const response = await fetch("https://app.tilopay.com/api/v1/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        apiuser: ApiUser,
                        password: ApiPassword
                    })
                });
                const data = await response.json();
                setToken(data.token);
            } catch (error) {
                console.log('Error al obtener el token: ', error);
            }
        };
    });

    // Function to process payment
    const processPayment = async () => {
        try {
            const response = await fetch("https://app.tilopay.com/api/v1/processPayment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    'Authorization': `bearer ${token}` // Use the token obtained from the previous request
                },

                body: JSON.stringify({
                    redirect: "https://www.urlToRedirect.com",
                    key: Apikey,
                    amount: "1.00",
                    currency: "USD",
                    billToFirstName: "DEMO",
                    billToLastName: "DEMO",
                    billToAddress: "San Jose",
                    billToAddress2: "Catedral",
                    billToCity: "JS",
                    billToState: "SJ",
                    billToZipPostCode: "10061",
                    billToCountry: "CR",
                    billToTelephone: "88888888",
                    billToEmail: "myemail@example.com",
                    orderNumber: "1212122",
                    capture: "1",
                    subscription: "0",
                    platform: "api",
                    returnData: "dXNlcl9pZD0xMg==",
                    hashVersion: "V2"
                })
            });
            const responseData = await response.json();
            if (response.ok) {
                setPaymentUrl(responseData.paymentUrl);
                setPaymentResult('URL de pago obtenida exitosamente.');
            } else {
                setPaymentResult('No se pudo obtener la URL de pago.');
            }
        } catch (error) {
            console.log('Error al obtener el token: ', error);
            setPaymentResult('Error en el proceso de pago.')
        }
    };

    // Function to process modification in a payment
    const processModification = async () => {
        try {
            const response = await fetch("https://app.tilopay.com/api/v1/processModification", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    'Authorization': `bearer ${token}` // Use the token obtained from the previous request
                },

                body: JSON.stringify({
                    "orderNumber": "1212122",
                    "type": "2",
                    "amount": "1.00",
                    "key": "api_key",
                    "webhook": "",
                    "hashVersion": "V2"
                })
            });
            const responseData = await response.json();
            if (response.ok) {
                setPaymentUrl(responseData.paymentUrl);
                setPaymentResult('Proceso de modificación exitoso.');
            } else {
                setPaymentResult('No se pudo procesar la modificación.');
            }
        } catch (error) {
            console.log('Error en el proceso de modificación: ', error);
        }
    };

    const consultTransaction = async () => {
        try {
            const response = await fetch("https://app.tilopay.com/api/v1/consult", {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    // "Accept": "application/json",
                    'Authorization': `bearer ${token}` // Use the token obtained from the previous request
                },

                body: JSON.stringify({
                    key: Apikey,
                    orderNumber: "1212122",
                    merchantId: ""
                })
            });
            const responseData = await response.json();
            if (response.ok) {
                setTransactionInfo(responseData);
                console.log('Información de transacción: ', responseData);
            } else {
                console.log('No se pudo consultar la transacción: ', responseData);
            }
        } catch (error) {
            console.log('Error al consultar la transacción: ', error);
        }
    }

    const processRecurrentPayment = async () => {
        try {
            const response = await fetch('https://app.tilopay.com/api/v1/processRecurrentPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    'Authorization': `bearer ${token}` // Use the token obtained from the previous request
                },

                body: JSON.stringify({
                    redirect: "https://www.urlToRedirect.com",
                    key: Apikey,
                    amount: "10.00",
                    currency: "USD",
                    orderNumber: "12135",
                    capture: "1",
                    email: "myemail@exapmle.com",
                    card: "511111_00GOB1111"
                })
            });
            const responseData = await response.json();
            if (response.ok) {
                setTransactionInfo(responseData);
                console.log('Proceso de pago recurrente exitoso: ', responseData);
            } else {
                console.log('Proceso de pago recurrente fallido: ', responseData);
            }
        } catch (error) {
            console.log('Error al procesar el pago recurrente: ', error);
        }
    };

    const processTokenize = async () => {
        try {
            const response = await fetch('https://app.tilopay.com/api/v1/processTokenize', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}` // Use the token obtained from the previous request
                },
                body: JSON.stringify({
                    redirect: "https://www.urlToRedirect.com",
                    key: Apikey,
                    email: "email@example.com",
                    language: "es",
                    firstName: "John",
                    lastName: "Doe"
                })
            });
            const responseData = await response.json();
            if (response.ok) {
                setTokenizationResult(responseData);
                console.log('Tokenización de tarjeta exitosa.');
            } else {
                setTokenizationResult('Tokenización de tarjeta fallida.');
            }
        } catch (error) {
            console.log('Error del proceso de tokenización');
        }
    };

    const fetchIntegrationSettings = async () => {
        try {
            const response = await fetch(`https://app.tilopay.com/api/v1/getIntegrationSetting/${Apikey}`, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}` // Use the token obtained from the previous request
                }
            });
            const data = await response.json();
            if (response.ok) {
                setIntegrationSettings(data);
            } else {
                setError('Failed to fetch integration settings');
            }
        } catch (error) {
            console.error('Error fetching integration settings:', error);
            setError('Error fetching integration settings');
        }
    };

    useEffect(() => {
        if (token) {
            // Process payment when token is available
            processPayment();
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            // Process modification after payment is completed
            processModification();
        }
    }, [paymentUrl]);

    useEffect(() => {
        if (transactionInfo === null && paymentResult === 'Payment URL obtained successfully.') {
            // Consult transaction after payment is completed
            consultTransaction();
        }
    }, [transactionInfo, paymentResult]);

    useEffect(() => {
        if (token) {
            // Call the function to process the recurrent payment
            processRecurrentPayment();
        }
    }, []);

    useEffect(() => {
        if (token) {
            // Process tokenization when token is available
            processTokenize();
        }
    }, [token]);

    useEffect(() => {
        // Call the function to fetch integration settings
        fetchIntegrationSettings();
    }, []);

    // Inicialización del método de pago, este recibe una serie de parámetros. Retorna mensaje de error,
    // en caso de existir, y retorna los métodos de pago disponibles.
    const starPayment = async () => {
        try {
            var initialize = await Tilopay.Init({
                setToken: "634bc4e3ccd88ea0e187e5c61285cd2dbc9d8b0d3e0c07a3...",
                setCurrency: "USD",
                setLanguage: "es",
                setAmount: 1,
                setBillToFirstName: "Jose",
                setBillToLastName: "Lopez",
                setBillToAddress: "San Jose",
                setBillToAddress2: "",
                setBillToCity: "",
                setBillToState: "",
                setBillToZipPostCode: "",
                setBillToCountry: "CR",
                setBillToTelephone: "",
                setBillToEmail: "sac+new-sdk@tilo.co",
                setOrderNumber: "sdk-" + Date.now(),
                setCapture: 1,
                setRedirect: "https://tilopay.test/response",
                setSubscription: 0,
                hashVersion: "V2",
                returnData: "W2N1c3RvbV9wYXJhbWV0ZXJfYSA9PiAidmFsb3IgZGUgYSIsY3VzdG9tX3BhcmFtZXRlcl9iID0+ICJ2YWxvciBkZSBiIl0=" // base 64 array [custom_parameter_a => "valor de a",custom_parameter_b => "valor de b"]
            });

            await chargeMethods(initialize.methods);
            await chargeCards(initialize.cards);
        } catch (error) {
            console.error('Error al inicializar el pago:', error);
        }
    };

    useEffect(() => {
        // Verifica si se han cargado los datos de inicialización de Tilopay
        if (tilopayData) {
            // Inicializa Tilopay con los datos obtenidos de la API
            Tilopay.Init({
                token: tilopayData.token,
                currency: tilopayData.currency,
                language: tilopayData.language,
                amount: tilopayData.amount,
                billToFirstName: tilopayData.billToFirstName,
                billToLastName: tilopayData.billToLastName,
                billToAddress: tilopayData.billToAddress,
                billToAddress2: tilopayData.billToAddress2,
                billToCity: tilopayData.billToCity,
                billToState: tilopayData.billToState,
                billToZipPostCode: tilopayData.billToZipPostCode,
                billToCountry: tilopayData.billToCountry,
                billToTelephone: tilopayData.billToTelephone,
                billToEmail: tilopayData.billToEmail,
                orderNumber: tilopayData.orderNumber,
                capture: tilopayData.capture,
                redirect: tilopayData.redirect,
                subscription: tilopayData.subscription
            });
            chargeMethods(tilopayData.methods);
            setSaveCards(tilopayData.cards); // Almacena las tarjetas guardadas en el estado
        }
    }, [tilopayData, typeDni, dni]);

    useEffect(() => {
        if (sinpeMovilData) {
            alert(`Para realizar el pago con SINPE Móvil, debe asegurarse de realizar el pago de la siguiente forma:
            Teléfono: ${sinpeMovilData.phoneNumber}
            Monto exacto: ${sinpeMovilData.amount}
            Indicar en la descripción: ${sinpeMovilData.description}`);
        }
    }, [sinpeMovilData]);

    const chargeMethods = async (methods) => {
        methods.forEach(function (method) {
            const option = document.createElement("option");
            option.value = method.id;
            option.text = method.name;
            document.getElementById("tlpy_payment_method").appendChild(option);
        });
    };

    const chargeCards = async (cards) => {
        cards.forEach(function (card) {
            const option = document.createElement("option");
            option.value = card.id;
            option.text = card.name;
            document.getElementById("cards").appendChild(option);
        });
    };

    const iniciateTokenize = async () => {
        try {
            const initialize = await Tilopay.InitTokenize({
                token,
                currency,
                language,
                amount,
                billToFirstName,
                billToLastName,
                billToAddress,
                billToAddress2,
                billToCity,
                billToState,
                billToZipPostCode,
                billToCountry,
                billToTelephone,
                billToEmail,
                redirect,
            });

            await chargeMethods(initialize.methods);
            await chargeCards(initialize.cards);

            // Procesar la respuesta de la inicialización del tokenizado, si es necesario
            console.log(initialize);
        } catch (error) {
            console.error('Error al inicializar el tokenizado:', error);
        }
    };

    // Función para manejar el cambio en el número de tarjeta ingresado por el usuario
    const handleCardNumberChange = (event) => {
        setCardNumber(event.tarjet.value);
    };

    // Método para obtener el tipo de tarjeta que ingreso el usuario. Retorna el tipo de tarjeta visa – mastercard – amex.
    const getCardType = async () => {
        try {
            const cardType = await Tilopay.getCardType();
            console.log('Tipo de tarjeta: ', cardType);
        } catch (error) {
            console.error('Error al obtener el tipo de tarjeta: ', error);
        }
    };

    // Función para mostrar el icono correspondiente al tipo de tarjeta
    const renderCardIcon = () => {
        switch (cardType) {
            case 'VISA':
                return <img src="visa-icon.pgn" alt="Visa" />;
            case 'MASTERCARD':
                return <img src="mastercard-icon.pgn" alt="Mastercard" />;
            case 'Amex':
                return <img src="Amex-icon.pgn" alt="AmericaN Express" />;
            default:
                return null;
        }
    }

    const updatePaymentOptions = async () => {
        try {
            const updateOptions = await Tilopay.updateOptions({
                typeDni,
                dni,
                billToFirstName,
                billToLastName,
                billToAddress,
                billToAddress2,
                billToCity,
                billToState,
                billToZipPostCode,
                billToCountry,
                billToTelephone,
                capture,
                redirect,
                subscription
            });
            console.log('Se actualizaron las opciones de de pago exitosamente: ', updateOptions);
        } catch (error) {
            console.error('Error al actualizar las opciones de pago: ', error);
        }
    };

    // Método para obtener datos de pago para el método Sinpe Móvil. Retorna mensaje de error en caso de existir, 
    // y retorna los parámetros de Sinpe Móvil.
    const getSinpeMovil = async () => {
        try {
            const sinpeMovilData = await Tilopay.getSinpeMovil();
            console.log('Información del Sinpe Móvil', sinpeMovilData);
        } catch (error) {
            console.error('Error al obtener los datos del Sinpe Móvil: ', error);
        }
    };

    // Método para enviar a procesar el pago en Tilopay, no recibe ningún parámetro. Retorna mensaje de error en caso de existir.
    const pay = async () => {
        try {
            // Obtain the selected payment method 
            const selectedMethodId = document.getElementById('tlpy_payment_method').value;
            // Realice the payment utilizing the selected method
            const paymentResponse = await Tilopay.startPayment(selectedMethodId);
            console.log('Respuesta de pago', paymentResponse);
        } catch (error) {
            console.error('Error al iniciar el pago: ', error);
        }
    };

    const getCipherData = async () => {
        var cipher = await Tilopay.getCipherData();
        console.log(cipher);
    };

    const handleCardChange = (event) => {
        selectedCard(event.target.value);
        // Enable CVV field if a saved card is selected
        setShowCVV(event.target.value !== '');
    };

    return (
        <div className='main-privacy-politics-container'>
            <div className='privacy-politics-container'>
                <div className='privacy-politics-title-container'>
                    <Typography variant="h4">Pagos con tarjeta</Typography>
                    <p>Token: {token}</p>
                    <p>Payment URL: {paymentUrl}</p>
                    <p>Payment Result: {paymentResult}</p>
                    {transactionInfo && (
                        <div>
                            <h3>Transaction Information</h3>
                            <p>Processed Amount: {transactionInfo.amount}</p>
                            <p>Transaction Status: {transactionInfo.status}</p>
                            <p>Tokenization Result: {tokenizationResult}</p>
                        </div>
                    )}
                    <h4>Tilopay Integration Settings</h4>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div>
                            <p>Integration Settings:</p>
                            <pre>{JSON.stringify(integrationSettings, null, 2)}</pre>
                        </div>
                    )}
                </div>

                {/* Agrega campos para el tipo de identificación y la identificación del cliente */}
                <label htmlFor="">Tipo de identificación:</label>
                <select name="identificacion" value={typeDni} onChange={(e) => setTypeDni(e.target.value)}>
                    <option value={0}>Seleccione: </option>
                    <option value={1}>Cédula de identidad</option>
                    <option value={2}>Céula jurídica</option>
                    <option value={3}>Gobierno central</option>
                    <option value={4}>Institución autónoma</option>
                    <option value={5}>Extranjero no residente</option>
                    <option value={6}>DIMEX</option>
                    <option value={7}>DIDI</option>
                </select>

                <label htmlFor="">Identificación del cliente:</label>
                <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} />

                <div className='payFormTilopay'>
                    <label htmlFor="">Metódo de pago</label>
                    <select name="tlpy_payment_method" id="tlpy_payment_method">
                        <option value="">Seleccione el metódo de pago</option>
                    </select>

                    <br /> <br />

                    <label htmlFor="">Tarjetas Guardadas</label>
                    <select name="tlpy_saved_cards" id="tlpy_saved_cards" onChange={handleCardChange}>
                        <option value="">Seleccione la tarjeta</option>
                        {/* Mapea las tarjetas guardadas y crea las opciones para el select */}
                        {saveCards.map(card => (
                            <option key={card.id} value={card.id}></option>
                        ))}
                    </select>

                    <br /> <br />

                    <label htmlFor="">Número de tarjeta</label>
                    <input type="text" value={cardNumber} id='tlpy_cc_number' name='tlpy_cc_number' onChange={handleCardNumberChange} />

                    {/* Botón para obtener el tipo de tarjeta */}
                    <button onClick={getCardType}>Obtener tipo de Tarjeta</button>

                    {/* Muestra el icono correspondiente al tipo de tarjeta */}
                    {renderCardIcon()}

                    <br /> <br />

                    <label htmlFor="">Caducación de la tarjeta</label>
                    <input type="text" id='tlpy_cc_expiration' name='tlpy_cc_expiration' />

                    {showCVV && (
                        <>
                            <label htmlFor="">Número de CVV</label>
                            <input type="text" id='tlpy_cvv' name='tlpy_cvv' />
                        </>
                    )}

                    <input type="button" onClick={pay} value='Finalizar Pago' />

                    {/* Botón para obtener los datos de SINPE Móvil */}
                    <button onClick={getSinpeMovil}>Pagar con Sinpe Móvil</button>

                    {/* Muestra los datos de SINPE Móvil */}
                    {sinpeData && (
                        <div>
                            <Typography variant='body1'>Para realizar el Sinpe Móvil:</Typography>
                            <Typography variant='body1'>Teléfono: {sinpeData.phoneNumber}</Typography>
                            <Typography variant='body1'>Monto exacto: {sinpeData.amount}</Typography>
                            <Typography variant='body1'>Indicar en la descripciónL {sinpeData.description}</Typography>
                        </div>
                    )}

                    <br /> <br />

                    {/* Agregar campos para actualizar los parámetros de pago */}
                    <label htmlFor="">Tipo de identificación</label>
                    <select name="typeDni" id="typeDni" value={typeDni} onChange={(e) => setTypeDni(e.target.value)}>
                        <option value={1}>Cédula de identidad</option>
                        <option value={2}>Cédula jurídica</option>
                        <option value={3}>Gobierno central</option>
                        <option value={4}>Institución autónoma</option>
                        <option value={5}>Extranjero no residente</option>
                        <option value={6}>DIMEX</option>
                        <option value={7}>DIDI</option>
                    </select>

                    <label htmlFor="">Identificación del cliente:</label>
                    <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} />

                    <label htmlFor="">Nombre del cliente:</label>
                    <input type="text" value={billToFirstName} onChange={(e) => setBillToFirstName(e.target.value)} />

                    <label htmlFor="">Apellidos del cliente:</label>
                    <input type="text" value={billToLastName} onChange={(e) => setBillToLastName(e.target.value)} />

                    <button onClick={updatePaymentOptions}>Actualizar Opciones de Pago</button>

                    <br /> <br />

                    <input type="button" onClick={pay} value='Pay' />
                    <input type="button" onClick={updatePaymentOptions} value='Reload' />
                    <input type="button" onClick={getCardType} value='Get Type' />
                    <input type="button" onClick={getSinpeMovil} value='Get Sinpe Data' />
                    <input type="button" onClick={getCipherData} value='Get Cipher Data' />
                </div>
                {/* container with the id “response Tilopay”, its function is to carry out the 3ds 
                            process in case the payment method requires it */}
                <div id='responseTilopay'></div>
            </div>
        </div>
    )
}

export default PaymentMethodCard