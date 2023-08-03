import React from 'react';
import api from '../../api';

interface IPaymentData {
	amount: string;
	phone: string;
}

interface IOrderStorePartial {
	carWashId?: number | null;
	bayNumber?: number | null;
	sum?: number | null;
	paymentId?: number | null;
	partnerCard?: number | null;
	isPaid?: boolean | null;
	paymentTocken?: string | null;
}
interface IOrderContext {
	store: IOrderStorePartial;
	sendOrder: () => Promise<void>;
	updateStore: (data: IOrderStorePartial) => void;
	sendPayment: (data: IPaymentData) => void;
}

const OrderContext = React.createContext<IOrderContext | null>(null);

const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [store, setStore] = React.useState<IOrderStorePartial>({
		carWashId: null,
		bayNumber: null,
		sum: null,
		paymentId: null,
		paymentTocken: null,
		partnerCard: null,
		isPaid: false,
	});

	const updateStore = (data: IOrderStorePartial) => {
		const state = { ...store, ...data };
		setStore(state);
	};

	const sendPayment = async (data: IPaymentData) => {
		try {
			console.log(data);
			const response = await api.post('payment/create', {
				amount: data.amount,
				phone: data.phone,
				redirect_url: 'http://localhost:3000',
			});
			console.log(response.data);
			updateStore({
				paymentId: response.data.id,
				paymentTocken: response.data.confirmation.confirmation_token,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const sendOrder = async () => {
		try {
			let data = {
				paymentId: store.paymentId,
				carWashId: store.carWashId,
				bayNumber: store.bayNumber,
				orderSum: store.sum,
				partnerCard: store.partnerCard,
			};
			if (!store.carWashId) {
				const carWash = sessionStorage.getItem('carWash');
				const bayNumber = sessionStorage.getItem('bayNumber');
				const sum = sessionStorage.getItem('sum');
				const partnerCard = sessionStorage.getItem('parterCard');
				if (carWash) {
					data = {
						...data,
						carWashId: JSON.parse(carWash).id,
						bayNumber: Number(bayNumber),
						orderSum: Number(sum),
						partnerCard: Number(partnerCard),
					};
				}
			}

			console.log(data);
			const response = await api.post(`order/create`, {
				paymentId: data.paymentId,
				carWashId: data.carWashId,
				bayNumber: data.bayNumber,
				orderSum: data.orderSum,
				partnerCard: data.partnerCard,
			});

			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<OrderContext.Provider
			value={{ store, sendOrder, sendPayment, updateStore }}
		>
			{children}
		</OrderContext.Provider>
	);
};

const useOrder = () => {
	const context = React.useContext(OrderContext);
	if (!context) {
		throw new Error('useOrder must be used within a OrderProvider');
	}
	return context;
};

export { OrderContext, OrderProvider, useOrder };
