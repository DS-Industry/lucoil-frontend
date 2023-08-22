import React from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { useUser } from '../user-context';

interface IPaymentData {
	amount: string;
	phone: string;
}

interface IOrderStorePartial {
	carWashId?: number | null;
	bayNumber?: number | null;
	sum?: number | null;
	paymentId?: number | null;
	isPaid?: boolean | null;
	paymentTocken?: string | null;
	isLoading?: boolean;
	error?: any | null;
}
interface IOrderContext {
	store: IOrderStorePartial;
	sendOrder: () => Promise<void>;
	updateStore: (data: IOrderStorePartial) => void;
	sendPayment: (data: IPaymentData) => void;
	getStore: () => void;
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
		isPaid: false,
		isLoading: false,
		error: null,
	});
	const navigate = useNavigate();
	const { user } = useUser();

	const updateStore = (data: IOrderStorePartial) => {
		const state = { ...store, ...data };
		secureLocalStorage.setItem('order-store', state);
		getStore();
	};

	const getStore = () => {
		const store: IOrderStorePartial | any =
			secureLocalStorage.getItem('order-store');
		setStore(store);
	};

	const sendPayment = async (data: IPaymentData) => {
		try {
			updateStore({ isLoading: true });
			console.log(data);
			const response = await api.post('payment/create', {
				amount: data.amount,
				phone: data.phone,
				redirect_url: 'http://localhost:3000',
			});
			console.log(response.data);
			updateStore({
				isLoading: false,
				paymentId: response.data.id,
				paymentTocken: response.data.confirmation.confirmation_token,
			});
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, error });
		}
	};

	const sendOrder = async () => {
		try {
			updateStore({ isLoading: true });
			const response = await api.post(`order/create`, {
				paymentId: store.paymentId,
				carWashId: store.carWashId,
				bayNumber: store.bayNumber,
				orderSum: store.sum,
				partnerCard: user.partnerCard,
			});
			navigate('/success');
		} catch (error: any) {
			console.log(error);
			updateStore({ isLoading: false, error });
		}
	};

	return (
		<OrderContext.Provider
			value={{ store, sendOrder, sendPayment, updateStore, getStore }}
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
