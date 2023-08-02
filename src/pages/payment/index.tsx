import React, { useEffect } from 'react';
export const PaymentPage = () => {

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
		script.async = true;
		script.onload = () => {
			// Initialization of the widget
			// @ts-ignore
			const checkout = new window.YooMoneyCheckoutWidget({
				confirmation_token: 'ct-2c5c60d5-000f-5000-a000-160dad9b3808', // Your confirmation token obtained from YooKassa// Your completion payment page URL

				// Uncomment the following block if you need to customize the widget's appearance
				// customization: {
				//   colors: {
				//     control_primary: '#00BF96', // HEX color value for accent elements
				//     background: '#F2F3F5', // HEX color value for the payment form and its elements
				//   },
				// },
				// @ts-ignore
				error_callback: function (error) {
					console.log(error);
				},
			});

			checkout.on('success', () => {
				//Код, который нужно выполнить после успешной оплаты.
				console.log('Start Equipment');
				//Удаление инициализированного виджета
				checkout.destroy();
			});

			// Render the payment form in the container with the 'payment-form' id
			checkout.render('payment-form');
		};

		document.head.appendChild(script);

		// Clean up the script when the component is unmounted
		return () => {
			document.head.removeChild(script);
		};
	}, [])
	return (
			<div id="payment-form"></div>
	);
};

