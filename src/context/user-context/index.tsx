import React from 'react';
import secureLocalStorage from 'react-secure-storage';

interface IUserPartial {
	partnerCard?: string | number | null;
	phNumber?: string | null;
	token?: string | null;
	isLoading?: boolean;
	error?: any | null;
}

interface IUserContext {
	user: IUserPartial;
	updateStore: (data: IUserPartial) => void;
	sendCode: (verificationCode: string) => void;
	sendPhNumber: (phNumber: string) => void;
	getStore: () => void;
}

const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<IUserPartial>({
		partnerCard: null,
		phNumber: null,
		token: null,
		isLoading: false,
		error: null,
	});

	const updateStore = (data: IUserPartial) => {
		const state = { ...user, ...data };
		secureLocalStorage.setItem('user-store', state);
		getStore();
	};

	const getStore = () => {
		const store: IUserPartial | any = secureLocalStorage.getItem('user-store');
		setUser(store);
	};

	const sendPhNumber = async (phNumber: string) => {
		try {
			updateStore({ isLoading: true });
			const correctPhNumber = phNumber.replaceAll(' ', '');
			//-------- Add endPoint to send Number and get code --------
			console.log('Отправка номера...', correctPhNumber);
			/*
			cosnt response = await api.post('', {
				correctPhNumber,
			}); 
			const { signUp } = response.data
			*/
			//----------------------------------------------------------

			setTimeout(() => {
				const random = Math.floor(Math.random() * 100);
				console.log('this is random number: ', random);
				updateStore({
					isLoading: false,
					phNumber: random >= 0 && random <= 50 ? phNumber : null,
					error: random >= 50 ? 'error' : null,
				});
			}, 3000);
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, error, phNumber: null });
		}
	};

	const sendCode = async (verificationCode: string) => {
		try {
			const partnerCard = user.partnerCard;
			updateStore({ isLoading: true });
			//-------- Add endPoint to send code and get status --------
			console.log('Отправка кода...');
			/* 
			const response = await api.post('', {
				verificationCode,
				parterCard
			}); 
			
			
			const verification = response.data
			*/
			setTimeout(() => {
				const random = Math.floor(Math.random() * 100);
				console.log('this is random number: ', random);
				updateStore({
					isLoading: false,
					token:
						random >= 0 && random <= 33
							? 'success token'
							: random > 33 && random < 66
							? 'error token'
							: null,
					error: random >= 66 ? 'error' : null,
				});
			}, 5000);
			//----------------------------------------------------------
			/* 			updateStore({ isLoading: false, verification: true }); */
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, error: error });
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateStore,
				sendCode,
				sendPhNumber,
				getStore,
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
