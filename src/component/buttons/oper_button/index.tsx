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
    first?: boolean
}

export const OperButton: React.FC<IOperButton> = ({ isBay=false,isSum=false, title, onClick, disabled, value, first }) => {

    const { setOrder } = useContext(OrderContext);


    const handleClick = () => {
        if(isBay) {
            onClick('sum')
            setOrder((prevValue: any) => ({
                ...prevValue,
                bayNumber: value
            }))
        }
        if (isSum) {
            onClick();
            setOrder((prevValue: any) => ({
                ...prevValue,
                sum: value
            }))
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
            isDisabled={first ? false : value ? disabled : true}
            >
            {title}
        </Button>
    </>
);
}