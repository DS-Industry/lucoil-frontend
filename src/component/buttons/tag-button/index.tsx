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
    disabled: boolean,
    carWash: any,
    distance: number,
    switchCarWashType: string,
}


export const TagButton: React.FC<ITagButton> = ({ 
    disabled, 
    switchCarWashType,
    height, 
    fontSize, 
    color, 
    label, 
    bgColor, 
    onClick, 
    carWash,
    distance,
}) => {

    const { setOrder } = useContext(OrderContext);

    const handleClick = () => {
        onClick(switchCarWashType);
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