import React from 'react';

interface IUserPartial {
	identifier?: string | null;
}

interface IUserContext {
	user: IUserPartial | null;
	updateStore: (data: IUserPartial) => void;
}

const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<IUserPartial>({
		identifier: null,
	});

	const updateStore = (data: IUserPartial) => {
		const state = { ...user, ...data };
		setUser(state);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateStore,
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
