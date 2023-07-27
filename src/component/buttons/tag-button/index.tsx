import { Button} from "@chakra-ui/react"

interface ITagButton {
    height: string,
    fontSize: string,
    bgColor: string,
    color: string,
    label: string,
    onClick?: any,
    onClose: any
    disabled: boolean,
    setCarWashData: any,
    carWash: any,
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
    setCarWashData,
    carWash,
}) => {

    const handleClick = () => {
        onClick(true);
        onClose();
        setCarWashData(carWash)
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