import { Box, Flex, HStack, Text, Divider } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

interface ICarWash {
    id: string,
    title: string,
    address: string,
}

export const CarWash: React.FC<ICarWash> = ({id, title, address }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/home?carWashId=${id}`)
    }

    return (
        <Box mt='12px' ml='16px' mr='16px' onClick={handleClick}>
        <Flex justifyContent='space-between' mb='12px'>
            <Box >
                <Text fontSize='15px' fontWeight='700' lineHeight='20px' >{title}</Text>
                <HStack>
                    <Text fontSize='12px' fontWeight='500' color='colors.DARK_GRAY'>{address}</Text>
                </HStack>
            </Box>
            <Box>
                <Text fontSize='10px' fontWeight='500' lineHeight='20px'>24 часа</Text>
            </Box>
            
        </Flex>
        <Divider />
        </Box>
    )
}