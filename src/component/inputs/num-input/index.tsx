import { Input, Text } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react";
import { OperButton } from "../../buttons/oper_button";

interface INumInput {
 label: string,
 isBay: boolean,
 getValue: any,
 onClick?: any,
 redirect: boolean,
 minValue: number,
 maxValue: number
}

export const NumInput: React.FC<INumInput> = ({ 
    label, 
    isBay, 
    getValue, 
    onClick, 
    redirect,
    minValue,
    maxValue,
 }) => {

    const minValueMessage = `Сумма должна быть не менее ${minValue}`;
    const maxValueMessage = `Сумма должна быть не более ${maxValue}`;

    const [value, setValue] = useState<string>('');
    const [ messageSwitch, setMessageSwitch ] = useState<number>(0);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let regexp = /^$|^[1-9]$/;
        if(isBay) {
            if(regexp.test(event.target.value)) {
                setValue(event.target.value);
                console.log(value);
            }
        } else {
            setValue(event.target.value);
            console.log(event.target.value)
            if ( Number(event.target.value) < minValue ) {
                setMessageSwitch(1);
            } else {
                if ( Number(event.target.value) > maxValue ) {
                    setMessageSwitch(2)
                } else {
                    setMessageSwitch(0);
                }
            }

        }
    }

    return (
        <>
                <Text 
                    fontSize='20px' 
                    fontWeight='700' 
                    w='100%' 
                    textAlign='center' 
                    lineHeight='20px'>{label}</Text>

                {messageSwitch !== 0 && 
                    <Text color='colors.PRIMARY_RED' fontSize='12px' >
                        {
                            messageSwitch === 1 ? minValueMessage : maxValueMessage
                        }
                    </Text>   
                }
                <Input 
                    textAlign='center'
                    value={value} 
                    onChange={handleChange} 
                    mt='10px' 
                    mb='10px' 
                    w='100%' 
                    variant='unstyled' 
                    fontWeight='700' 
                    bg='colors.WHITE' 
                    h='60px' 
                    fontSize='60px' 
                    type="number" />
                <OperButton 
                    disabled={messageSwitch === 1 || messageSwitch === 2 ? true : false} 
                    onClick={onClick} 
                    redirect={redirect} 
                    value={value}
                    getValue={getValue}
                    title="Далее"/>
        </>
    )
}