import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import {OrderContext, useOrder} from "../../../context/order-context";

interface IOperButton {
    title: string,
    onClick: any,
    disabled: boolean,
    value?: string,
    isBay?: boolean,
    isSum?: boolean,
}

export const OperButton: React.FC<IOperButton> = ({ isBay=false,isSum=false, title, onClick, disabled, value }) => {

    const { updateStore } = useOrder();

    const handleClick = () => {
        if(isBay) {
            updateStore({
                bayNumber: Number(value)
            })
        }
        if (isSum) {
            updateStore({
                sum: Number(value)
            })
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