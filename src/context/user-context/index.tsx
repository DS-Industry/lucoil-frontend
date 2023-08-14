import React from 'react';

interface IUserPartial {
	partnerCard?: string | number | null;
	phNumber?: string | null;
	token?: boolean | null;
	verification?: boolean | string | null;
	isLoading?: boolean;
}

interface IUserContext {
	user: IUserPartial;
	updateStore: (data: IUserPartial) => void;
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
		token: null,
		verification: null,
		isLoading: false,
	});

	const updateStore = (data: IUserPartial) => {
		const state = { ...user, ...data };
		setUser(state);
	};

	const sendPhNumber = async (phNumber: string) => {
		try {
			updateStore({ isLoading: true });
			const correctPhNumber = phNumber.replaceAll(' ', '');
			//-------- Add endPoint to send Number and get code --------
			console.log('Отправка номера...', correctPhNumber);
			sessionStorage.setItem('phone', correctPhNumber);
			/*
			cosnt response = await api.post('', {
				correctPhNumber,
			}); 
			const { signUp } = response.data
			*/
			//----------------------------------------------------------
			updateStore({ isLoading: false, phNumber: correctPhNumber /* signUp */ });
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
			/* 
			const response = await api.post('', {
				verificationCode,
			}); 
			
			
			const verification = response.data
			*/
			setTimeout(() => {
				updateStore({ isLoading: false, verification: true });
			}, 5000);
			//----------------------------------------------------------
			/* 			updateStore({ isLoading: false, verification: true }); */
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false });
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateStore,
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
