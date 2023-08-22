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
	signUp: (verificationCode: string) => void;
	signIn: (verificationCode: string) => void;
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

	const signUp = async (verificationCode: string) => {
		try {
			const partnerCard = user.partnerCard;
			updateStore({ isLoading: true });
			console.log('Отправка кода для регистрации');
			// -------------- Add endpoint to send code for registration -----------
			/* 
				const response = await api.post('', {
				verificationCode,
				parterCard
			});

			*/
			setTimeout(() => {
				const random = Math.floor(Math.random() * 100);
				console.log('this is random number: ', random);
				updateStore({
					isLoading: false,
					token: random >= 0 && random <= 50 ? 'success registration' : null,
					error: random >= 50 ? 'error' : null,
				});
			}, 2000);
		} catch (error: any) {
			console.log(error);
			updateStore({ isLoading: false, error });
		}
	};
	const signIn = async (verificationCode: string) => {
		try {
			updateStore({ isLoading: true });
			//-------- Add endPoint to authentication --------
			console.log('Отправка кода для авторизации...');
			/* 
			const response = await api.post('', {
				verificationCode,
			}); 
			
			
			const verification = response.data
			*/
			setTimeout(() => {
				const random = Math.floor(Math.random() * 100);
				console.log('this is random number: ', random);
				updateStore({
					isLoading: false,
					token: random >= 0 && random <= 50 ? 'success authorization' : null,
					error:
						random >= 50 && random <= 75
							? { status: 505 }
							: random > 75
							? { status: 404 }
							: null,
				});
			}, 2000);
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
				signIn,
				signUp,
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
