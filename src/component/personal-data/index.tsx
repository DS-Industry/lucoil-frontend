import { Box } from '@chakra-ui/react';
import { OperButton } from '../buttons/oper_button';

interface IPersonalData {
	hadnleRegistrationClick: () => void;
}

export const PersonalData: React.FC<IPersonalData> = ({
	hadnleRegistrationClick,
}) => {
	return (
		<Box mb="30px" w="100%" pl="12px" pr="12px">
			<OperButton title="Авторизоваться" onClick={hadnleRegistrationClick} />
		</Box>
	);
};
