import React, { useEffect, useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaymentPayPal = ({ datosCompra, dataInfoBuyer }) => {
    const [message, setMessage] = useState('');
    const [convertedPrice, setConvertedPrice] = useState(null);
    const [convertedUnitPrice, setConvertedUnitPrice] = useState(null); 
    const [loading, setLoading] = useState(true);

    const url = import.meta.env.VITE_APP_SERVER_URL;
    const clientId = import.meta.env.VITE_APP_PAYPAL_API_CLIENT;

    const urlExchange = import.meta.env.VITE_APP_SERVER_URL_EXCHANGE;

    const initialOptions = {
        clientId: clientId,
        currency: 'USD',
        intent: "capture",
    };

    const clearCart = () => {
        // Eliminar cartProducts del localStorage
        localStorage.removeItem('cartProducts');
    };

    // Calculamos el valor total de la compra sumando el precio de todos los productos en el carrito
    const totalValue = datosCompra.reduce((total, product) => {
        // Conversión del precio a número
        const price = parseFloat(product.price);
        // Sumamos el precio del producto multiplicado por la cantidad
        return total + price * product.quantity;
    }, 0);

    const convertCurrency = async (from, to, amount) => {
        try {
            const response = await fetch(`${urlExchange}?from=${from}&to=${to}&amount=${amount}`);
            if (!response.ok) {
                throw new Error('Error en la solicitud de conversión de moneda');
            }
            const data = await response.json();
            return data.conversion_result; // Devolver el resultado para usarlo más tarde
        } catch (error) {
            console.error('Error al convertir la moneda: ', error.message);
            // Maneja el error según tu lógica de aplicación
            throw error;
        }
    };

    const convertCurrencyPrice = async (from, to, amount) => {
        try {
            const response = await fetch(`${urlExchange}?from=${from}&to=${to}&amount=${amount}`);
            if (!response.ok) {
                throw new Error('Error en la solicitud de conversión de moneda');
            }
            const data = await response.json();
            return data.conversion_result; // Devolver el resultado para usarlo más tarde
        } catch (error) {
            console.error('Error al convertir la moneda: ', error.message);
            // Maneja el error según tu lógica de aplicación
            throw error;
        }
    };

    useEffect(() => {
        const convertCurrencyData = async () => {
            try {
                const fromCurrency = 'CRC';
                const toCurrency = 'USD';
                const amount = totalValue.toFixed(2);
                const convertedPrice = await convertCurrency(fromCurrency, toCurrency, amount);
                setConvertedPrice(convertedPrice);

                const totalPrice = await Promise.all(datosCompra.map(async (product) => {
                    try {
                        const amount = parseFloat(product.price) * product.quantity;
                        const convertUnitPrice = await convertCurrencyPrice(fromCurrency, toCurrency, amount);
                        return { id: product.id, value: convertUnitPrice };
                    } catch (error) {
                        console.error(`Error al convertir el precio del producto ${product.id}: ${error.message}`);
                        return null;
                    }
                })); 
                
                // Filtrar los productos que se pudieron convertir exitosamente
                const convertedTotalPrice = totalPrice.filter(price => price !== null);

                setConvertedUnitPrice(convertedTotalPrice);  
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Marcar la carga como completa, independientemente del resultado
            }
        };

        convertCurrencyData();
    }, [totalValue, urlExchange]);

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtiene convertedPrice
    }

    const product = datosCompra.map((product, index) => ({
        id: product.id,
        name: product.name,
        price: convertedUnitPrice[index].value.toFixed(2),
        unit_amount: {
            currency_code: 'USD',
            value: convertedUnitPrice[index].value.toFixed(2)
        },
        quantity: product.quantity
    }));

    const datosCompraBuyer = {
        purchase_units: [
            {
                reference_id: 'default',
                amount: {
                    currency_code: 'USD',
                    value: convertedPrice.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: convertedPrice.toFixed(2)
                        }
                    }
                },
                productos: product,
                totalValue: convertedPrice.toFixed(2)
            }
        ]
    };


    const createOrder = async () => {
        try {
            const response = await fetch(`${url}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: 'default',
                    datosCompraBuyer,
                }),
            });

            const orderData = await response.json();

            console.log(orderData);

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);
                
                console.log(errorMessage);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            console.log(error);
            resultMessage(`Could not initiate PayPal Checkout...${error}`);
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const response = await fetch(`${url}/api/orders/${data.orderID}/capture`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderID: data.orderID
                })
            });

            const orderData = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
            } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                    orderData?.purchase_units?.[0].payments?.captures[0] ||
                    orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}`,
                );
                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2),
                  );

                // Si la transacción se ha completado con éxito, redirige al usuario a otra página
                if (transaction.status === 'COMPLETED') {
                    actions.redirect('http://localhost:5173/ThankYouBuyer');
                    clearCart();
                }
            }
        } catch (error) {
            console.error(error);
            resultMessage(
                `Sorry, your transaction could not be processed...${error}`,
            );
        }
    };

    const onError = async (data) => {
        console.log('Se cancelo el pago', data);
    };

    const resultMessage = (message) => {
        setMessage(message);
    };

    return (
        <>
            <div className='paypal-button'>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        style={{
                            color: 'black',
                            layout: 'horizontal',
                            shape: 'pill'
                        }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                    />
                </PayPalScriptProvider>
            </div>
            {/* <div>
                {message && <div>{message}</div>}
            </div> */}
        </>
    )
};

export default PaymentPayPal



