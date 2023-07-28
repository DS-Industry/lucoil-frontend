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
    isOper?: boolean
}

export const OperButton: React.FC<IOperButton> = ({ isBay=false,isSum=false, title, onClick, disabled, value, isOper=true }) => {

    const { updateStore } = useOrder();

    const handleClick = () => {
        if(isBay) {
            onClick('sum')
            updateStore({
                bayNumber: Number(value)
            })
        }
        if (isSum) {
            onClick();
            updateStore({
                sum: Number(value)
            })
        }

        if (!isBay && !isSum) {
            onClick();
        }

    }
return (
    <>
        <Button 
            bg='colors.PRIMARY_RED' 
            w='100%' 
            borderRadius='4px' 
            color='colors.WHITE' 
            onClick={handleClick}
            isDisabled={!isOper ? false : value ? disabled : true}
            >
            {title}
        </Button>
    </>
);
}