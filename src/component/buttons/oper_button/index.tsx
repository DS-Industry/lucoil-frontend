import { Button } from "@chakra-ui/react";

interface IOperButton {
    title: string,
    onClick: any,
    disabled: boolean,
    redirect: boolean,
    value: string,
    getValue: any,
}

export const OperButton: React.FC<IOperButton> = ({ title, onClick, redirect, disabled, getValue, value }) => {

    const handleClick = () => {
        getValue(value);
        if (redirect) {
            onClick();
        } else {
         onClick(true);
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
            isDisabled={disabled}
            >
            {title}
        </Button>
    </>
);
}