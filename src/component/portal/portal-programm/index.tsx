import { Box, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IPortalService {
    name: string,
    cost: string,
}

export const PortalService: React.FC<IPortalService> = ({ name, cost }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/order');
    }

    return (
        <>
            <Box 
                onClick={handleClick} 
                p='18px' 
                borderRadius='8px' 
                bgColor='colors.WHITE_GRAY'>
                <HStack justifyContent='space-between' >
                    <Text fontSize='24px' fontWeight='700' lineHeight='20px'>{name}</Text>
                    <Text fontSize='24px' fontWeight='700' lineHeight='20px'>{cost} ₽</Text>
                </HStack>
            </Box>
        </>
    );
}