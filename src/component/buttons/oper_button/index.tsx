import { Button } from "@chakra-ui/react";

interface IOperButton {
    title: string,
    onClick: any,
    redirect: boolean
}

export const OperButton: React.FC<IOperButton> = ({ title, onClick, redirect }) => {

    const handleClick = () => {
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
            >
            {title}
        </Button>
    </>
);
}