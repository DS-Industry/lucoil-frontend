import { Box, Flex, Text } from "@chakra-ui/react";
import { CarWashMap } from "../car-wash-map-item";
import { TagButton } from "../../buttons/tag-button";
import { TagInfo } from "../../tag-info";


interface ICarWash {
    carWash: any,
    setDrawerSwitch: any,
    distance: number,
    switchCarWashType: string,
}


export const CarWashFullInfo: React.FC<ICarWash> = ({ carWash, setDrawerSwitch, distance, switchCarWashType }) => {
    
    return(
        <>
        <Flex flexDir='column' pt='28px' h='90vh'>
            <CarWashMap isDisabled={false} title={carWash['name']} id={carWash['id']} openTime="24 часа" address={carWash['address']} distance={distance}  />
            <Flex pt='52px' h='100%' flexDirection='column' justifyContent='space-between' >
                {carWash['type'] === 'Portal' ? 
                    <>
                        <Box>
                        <Text lineHeight='20px' fontSize='12px' color='colors.DARK_GRAY'>Стоимость программ</Text>
                        {
                            carWash['price'].map((program : any) => {
                                return (
                                    <>
                                        <Box mb='8px'>
                                            <TagInfo label={`${program.name} ${program.cost} ₽`} bgColor="colors.PRIMARY_RED" color="colors.WHITE" fontSize="14px" height="20px" />
                                        </Box>
                                    </>
                                );
                            })
                        }
                        </Box>
                    </> : 
                    <>
                        <Box>
                            <Text lineHeight='20px' fontSize='12px' color='colors.DARK_GRAY'>Стоимость минуты</Text>
                            <TagInfo label={`${carWash['price'][0]['cost']} ₽`} bgColor="colors.PRIMARY_RED" color="colors.WHITE" fontSize="14px" height="20px"/>
                        </Box>
                        <Box>
                            <Text lineHeight='20px' fontSize='12px' color='colors.DARK_GRAY'>Программы</Text>
                            <Flex flexDir='row' flexWrap='wrap'>
                                {
                                    carWash.price.map((program : any) => {
                                        return (
                                            <>
                                                <Box mr='6px' mb='7px'>
                                                    <TagInfo label={program.name} bgColor="colors.WHITE_GRAY" color="colors.BLACK" fontSize="14px" height="20px" />
                                                </Box>
                                            </>
                                        );
                                    })
                                }
                            </Flex>
                        </Box>
                    </>

                }
                <Box mb='15px'>
                {carWash['tags'] && carWash['tags'].map((tag: any) => {
                    return (
                        <>
                            <Text lineHeight='20px' fontSize='12px' color='colors.DARK_GRAY'>Услуги</Text>
                            <Flex flexDir='row' flexWrap='wrap'>
                                <Box>
                                    <TagInfo label={tag.name} bgColor="colors.WHITE_GRAY" color="colors.BLACK" fontSize="14px" height="20px"/>
                                </Box>
                            </Flex>
                        </>
                    )
                })}
                </Box>
                {(distance && distance > 500) &&
                    <Flex w='100%' justifyContent='center' mb='15px'>
                        <TagInfo label="АМС слишком далеко от вас!" bgColor="colors.SECONDARY_RED" color="colors.PRIMARY_RED" fontSize="14px" height="28px"/>
                    </Flex>
                }
                <Box 
                w='100%'
                display='flex' 
                justifyContent='center'
                mb='25px'
                >
                <TagButton 
                    distance={distance} 
                    switchCarWashType={switchCarWashType}
                    carWash={carWash} 
                    disabled={distance > 500 ? true : false} 
                    onClick={setDrawerSwitch} 
                    height="50px" 
                    fontSize="15px" 
                    bgColor="colors.SECONDARY_RED" 
                    color="colors.PRIMARY_RED" 
                    label="Оплатить мойку"/>
            </Box>
            </Flex>
        </Flex>
        </>
    )
}