import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import Logo from '../../assets/logo/header_logo.svg'
import { Header } from "../../component/header"
import { instructionList } from "../../variabels"
import { OperButton } from "../../component/buttons/oper_button"
import { useNavigate } from "react-router-dom"

export const InstructionPage : React.FC = () => {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/home');
    }

    return (
        <>
            <Flex 
                w='100vw'
                bgColor='colors.WHITE' 
                justifyContent='center'
                alignItems='center' 
                flexDirection='column'
                >
                <Header label="" />

                <Box  mt='30px'>
                    <Image h='25vh' w='50vw' src={Logo} alt='logo car wash' mr='0'/>
                </Box>

                <Box textAlign='center' mt='50px'>
                    <Text color='colors.BLACK' fontSize='22px' fontWeight='500' >
                        Мойте автомобиль с выгодой на МОЙ-КА!DS и получайте 
                    </Text>
                    <Text color='colors.PRIMARY_RED' fontSize='22px' fontWeight='500'>
                        10% кешбэк 
                    </Text>
                    <Text color='colors.BLACK' fontSize='22px' fontWeight='500'> 
                        баллами на вашу карту Лукойла.    
                    </Text>
                </Box>

                <Flex 
                    flexDirection='column' 
                    ml='16px'mr='16px' mt='50px'
                    pt='40px' pb='60px'
                    h='90vh'
                    justifyContent='space-between'
                    borderTopRadius='25px'
                    bgColor='rgba(235, 235, 236, 0.40);'
                    alignItems='baseline'>
                    {
                        instructionList.map((info: string, index: number) => {
                            return (
                                <>
                                    <Flex key={index}
                                        justifyContent='flex-start'
                                        alignItems='flex-start' 
                                        pl='16px' pr='16px' >
                                        <Avatar name={String(index+1)} w='28px' h='28px' bgColor='colors.PRIMARY_RED' ml='30px' fontSize='16px' fontWeight='600' />
                                        <Text
                                            ml='16px' 
                                            fontSize='14px' 
                                            fontWeight='600'
                                            color='colors.BLACK'
                                            >{info}
                                        </Text>
                                    </Flex>
                                </>
                            )
                        })
                    }
                <Box pl='13px' pr='13px' w='100%' >
                    <OperButton 
                        title="Искать мойку" 
                        onClick={handleClick} 
                        disabled={false}/>
                </Box>
                </Flex>
            </Flex>
        </>
    )
}