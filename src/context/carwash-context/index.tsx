import React, { ReactNode } from 'react';
import api from '../../api';

interface ICarWashStorePartial {
	carWash?: any | null;
	carWashes?: any | [];
	pingStatus?: any | null;
	isLoading?: boolean;
}

interface ICarWashContext {
	store: ICarWashStorePartial;
	getCarWashList: () => void;
	pingCarWash: (carWashId: number, bayNumber: number) => void;
	updateStore: (newState: ICarWashStorePartial) => void;
}

const CarWashContext = React.createContext<ICarWashContext | null>(null);

const CarWashProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [store, setStore] = React.useState({
		carWash: null,
		carWashes: [],
		pingStatus: null,
		isLoading: false,
	});

	const updateStore = (newState: ICarWashStorePartial) => {
		const state = { ...store, ...newState };
		setStore(state);
	};

	const getCarWashList = async () => {
		try {
			updateStore({ isLoading: true });
			const response = await api.get('carwash/list');
			console.log(response.data);
			updateStore({ carWashes: response.data, isLoading: false });
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, carWashes: null });
		}
	};

	const pingCarWash = async (carWashId: number, bayNumber: number) => {
		try {
			updateStore({ isLoading: true });
			const response = await api.get(
				`carwash/ping?carWashId=${carWashId}&bayNumber=${bayNumber}`
			);
			if (response.status === 200) {
				updateStore({ pingStatus: 200, isLoading: false });
			}
			return;
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, pingStatus: 400 });
		}
	};

	return (
		<CarWashContext.Provider
			value={{
				store,
				getCarWashList,
				pingCarWash,
				updateStore,
			}}
		>
			{children}
		</CarWashContext.Provider>
	);
};

const useCarWash = () => {
	const context = React.useContext(CarWashContext);
	if (!context) {
		throw new Error('useCarWash must be used within a CarWashProvider');
	}
	return context;
};

export { CarWashContext, CarWashProvider, useCarWash };
