import { Box, Divider, Text } from "@chakra-ui/react";
import { CarWash } from "../../component/car-wash/car-wash-list-item";
import { ListInput } from "../../component/inputs/list-input";
import { carWashList } from "../../variabels";
import { useContext, useState } from "react";
import { MdArrowBackIos } from 'react-icons/md'
import { NavButton } from "../../component/buttons/nav-button";
import { Header } from "../../component/header";
import { useCarWash } from "../../context/carwash-context";
export const ListPage = () => {

    const [term, setTerm] = useState<string>('');
    const { store } = useCarWash();

    return (
        <>
            <Header label='Поиск АМС'/>
            <Box w='100%' bg='#F8F8F8' pt='12px' pl='16px' pr='16px' pb='12px' display='flex' justifyContent='space-between' >
                <ListInput setTerm={setTerm} />
                <NavButton ariaLabel="Back button" icon={<MdArrowBackIos />} link={'/home'} />
            </Box>
            <Divider />
            <Box w='100%' h='30px' bg='#F8F8F8'>
                <Text 
                    ml='12px'
                    pt='5px'
                    pb='5px' 
                    color='colors.DARK_GRAY' 
                    fontSize='10px'
                    fontWeight='500'
                    lineHeight='20px'>ВСЕ</Text>
            </Box>
            {store.carWashes.map((carwash: any) => {
                return carwash['carwashes'];
            }).flat().filter((carWash: any) => {
                return carWash['name'].includes(term) ||
                       carWash['address'].includes(term)
            }).map((filteredCarWash: any, index: number) => {
                console.log(filteredCarWash);
                return (
                    <CarWash 
                        key={index}
                        id={filteredCarWash['id']}
                        title={filteredCarWash['name']} 
                        address={filteredCarWash['address']} 
                        />
                )
            })}
        </>
    );
}