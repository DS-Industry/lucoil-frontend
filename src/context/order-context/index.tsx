import React from 'react';
import api from '../../api';

interface IOrderStorePartial {
	carWashId?: number | null;
	bayNumber?: number | null;
	sum?: number | null;
	paymentId?: number | null;
	partnerCard?: number | null;
	isPaid?: boolean | null;
}
interface IOrderContext {
	store: IOrderStorePartial;
	sendOrder: () => Promise<void>;
	updateStore: (data: IOrderStorePartial) => void;
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
		partnerCard: null,
		isPaid: false,
	});

	const updateStore = (data: IOrderStorePartial) => {
		const state = { ...store, ...data };
		setStore(state);
	};

	const sendOrder = async () => {
		try {
			const response = await api.post(`order/create`, {
				paymentId: store.paymentId,
				carWashId: store.carWashId,
				bayNumber: store.bayNumber,
				orderSum: store.sum,
				partnerCard: store.partnerCard,
			});

			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<OrderContext.Provider value={{ store, sendOrder, updateStore }}>
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
