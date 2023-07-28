import { Button} from "@chakra-ui/react"
import { useContext } from "react"
import {OrderContext, useOrder} from "../../../context/order-context"
import {useCarWash} from "../../../context/carwash-context";

interface ITagButton {
    height: string,
    fontSize: string,
    bgColor: string,
    color: string,
    label: string,
    onClick?: any,
    onClose: any
    disabled: boolean,
    carWash: any,
    distance: number
}


export const TagButton: React.FC<ITagButton> = ({ 
    disabled, 
    height, 
    fontSize, 
    color, 
    label, 
    bgColor, 
    onClick, 
    onClose,
    carWash,
    distance,
}) => {

    const { updateStore } = useOrder();
    const { updateStore: updateCWState} = useCarWash();

    const handleClick = () => {
        onClick(true);
        onClose();
        updateStore({
            carWashId: carWash.id
        });
        updateCWState({
            carWash: carWash,
        });
    }

    return (
        <>
            <Button 
                isDisabled={disabled}
                display='flex' 
                w='100%' 
                h={height} 
                paddingTop='10px' 
                paddingBottom='10px' 
                borderRadius='4px' 
                bg={bgColor}
                fontWeight='600' 
                fontSize={fontSize} 
                color={color}
                onClick={handleClick}
                >
                {label}
            </Button>
        </>
    )
}