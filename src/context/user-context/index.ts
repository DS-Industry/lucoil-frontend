import React from 'react';

interface IUserContext {
	person: string;
}

export const UserContext = React.createContext<IUserContext>({
	person: '',
});
