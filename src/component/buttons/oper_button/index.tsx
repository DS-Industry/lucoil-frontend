import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { OrderContext } from "../../../context/order-context";

interface IOperButton {
    title: string,
    onClick: any,
    disabled: boolean,
    value?: string,
    isBay?: boolean,
    isSum?: boolean,
}

export const OperButton: React.FC<IOperButton> = ({ isBay=false,isSum=false, title, onClick, disabled, value }) => {

    const { setOrder } = useContext(OrderContext);


    const handleClick = () => {
        if(isBay) {
            setOrder((prevValue: any) => ({
                ...prevValue,
                bayNumber: value
            }))
        }
        if (isSum) {
            setOrder((prevValue: any) => ({
                ...prevValue,
                sum: value
            }))
        }
        onClick();
    }
return (
    <>
        <Button 
            bg='colors.PRIMARY_RED' 
            w='100%' 
            borderRadius='4px' 
            color='colors.WHITE' 
            onClick={handleClick}
            isDisabled={disabled}
            >
            {title}
        </Button>
    </>
);
}