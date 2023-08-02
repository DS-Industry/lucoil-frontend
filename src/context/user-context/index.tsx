import React from 'react';
import api from '../../api';

interface IUserPartial {
	partnerCard?: string | number | null;
	phNumber?: string | null;
	verification?: boolean | string | null;
	isLoading?: boolean | null;
}

interface IUserContext {
	user: IUserPartial;
	updateStore: (data: IUserPartial) => void;
	getVerificationStatus: (data: IUserPartial) => void;
	sendCode: (verificationCode: string) => void;
	sendPhNumber: (phNumber: string) => void;
}

const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<IUserPartial>({
		partnerCard: null,
		phNumber: null,
		verification: null,
		isLoading: null,
	});

	const updateStore = (data: IUserPartial) => {
		const state = { ...user, ...data };
		setUser(state);
	};

	const sendPhNumber = async (phNumber: string) => {
		try {
			updateStore({ isLoading: true });
			//-------- Add endPoint to send Number and get code --------
			console.log('Отправка номера...');
			/* 	await api.post('', {
				phNumber,
			}); */
			//----------------------------------------------------------
			updateStore({ isLoading: false });
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false });
		}
	};

	const sendCode = async (verificationCode: string) => {
		try {
			updateStore({ isLoading: true });
			//-------- Add endPoint to send code and get status --------
			console.log('Отправка кода...');
			/* 			await api.post('', {
				verificationCode,
			}); */
			//----------------------------------------------------------
			updateStore({ isLoading: false });
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false });
		}
	};

	const getVerificationStatus = async () => {
		try {
			updateStore({ isLoading: true });
			//-------- Add endPoint to get verification result --------
			const verifStatus = true;
			/* 			const verifStatus: boolean | string = await api.get(''); */
			console.log('Получение статуса...');
			//----------------------------------------------------------
			updateStore({ verification: verifStatus, isLoading: false });
		} catch (error) {
			console.log(error);
			updateStore({ verification: null, isLoading: false });
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateStore,
				getVerificationStatus,
				sendCode,
				sendPhNumber,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

const useUser = () => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useOrder must be used within a OrderProvider');
	}
	return context;
};

export { UserContext, UserProvider, useUser };
