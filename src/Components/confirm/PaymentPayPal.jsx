import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { format } from "date-fns";

const PaymentPayPal = ({ datosCompra, dataInfoBuyer }) => {
    const [message, setMessage] = useState('');

    const url = import.meta.env.VITE_APP_SERVER_URL;
    const clientId = import.meta.env.VITE_APP_PAYPAL_API_CLIENT;
    const apiSecret = import.meta.env.VITE_APP_PAYPAL_API_SECRET;

    const initialOptions = {
        clientId: clientId,
        currency: 'USD',
        intent: "capture",
    };

    const clearCart = () => {
        // Eliminar cartProducts del localStorage
        localStorage.removeItem('cartProducts');
    }

    // Calculamos el valor total de la compra sumando el precio de todos los productos en el carrito
    const totalValue = datosCompra.reduce((total, product) => {
        // Conversión del precio a número
        const price = parseFloat(product.price);
        // Sumamos el precio del producto multiplicado por la cantidad
        return total + price * product.quantity;
    }, 0);


    const product = datosCompra.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        unit_amount: {
            currency_code: 'USD',
            value: product.price * product.quantity // Ensure the value is formatted correctly
        },
        quantity: product.quantity
    }));

    console.log(product);

    const datosCompraBuyer = {
        purchase_units: [
            {
                reference_id: 'default',
                amount: {
                    currency_code: 'USD',
                    value: totalValue.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: totalValue.toFixed(2)
                        }
                    }
                },
                productos: product,
                totalValue: totalValue.toFixed(2)
            }
        ]
    };

    console.log(datosCompraBuyer);

    const createOrder = async () => {
        try {
            const response = await fetch(`${url}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    //id: product[0].id,
                    datosCompraBuyer,
                }),
            });

            const orderData = await response.json();

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
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
                    orderData.purchase_units[0].payments.captures[0];
                setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}`,
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