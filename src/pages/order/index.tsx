import { useContext, useEffect } from "react";
import { CarWashMap } from "../../component/car-wash/car-wash-map-item"
import { OrderContext } from "../../context/order-context";
import { Flex, Text } from "@chakra-ui/react";
import { OperButton } from "../../component/buttons/oper_button";

export const OrderPage: React.FC = () => {
    const { order } = useContext(OrderContext);

    useEffect(() => {
        console.log(order);
    },[])

    const handleClick = () => {

    }

    return (
        <>  <Flex 
                flexDirection='column' 
                justifyContent='space-between' 
                h='100vh' 
                p='28px'
                >
                <CarWashMap 
                    id={String(order?.carWashId)} 
                    title={order?.title} 
                    openTime="24часа" 
                    address={order?.address} 
                    distance={order.distance}/> 
                <>
                </>
                <Flex flexDirection='inherit' justifyContent='center'>
                    <Text 
                        w='100%' 
                        textAlign='center' 
                        fontSize='48px' 
                        fontWeight='700'
                        >{order.sum} ₽</Text>
                    <OperButton title="Оплатить" onClick={handleClick} disabled={false}/>
                </Flex>
            </Flex>
        </>
    );
}