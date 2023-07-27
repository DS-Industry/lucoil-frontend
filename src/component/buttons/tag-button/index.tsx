import { Button} from "@chakra-ui/react"
import { useContext } from "react"
import { OrderContext } from "../../../context/order-context"

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

    const { setOrder } = useContext(OrderContext);

    const handleClick = () => {
        onClick(true);
        onClose();
        console.log('This is car wash id for Order context => ', carWash['id']);
        setOrder((prevValue: any) =>({
            ...prevValue,
            carWashId: carWash['id'],
            title: carWash['name'],
            address: carWash['address'],
            distance: distance
        }));
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