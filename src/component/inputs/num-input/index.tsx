import { Input, Text } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react";

interface INumInput {
 label: string,
 isBay: boolean,
 getValue?: any
}

export const NumInput: React.FC<INumInput> = ({ label, isBay, getValue }) => {

    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let regexp = isBay ? /^$|^[1-9]$/ : /^(5[0-9]{1,2}|[1-4][0-9]{2}|500)$/
        
        if(regexp.test(event.target.value)) {
            setValue(event.target.value);
            console.log(value);
        }
    }

    return (
        <>
                <Text fontSize='20px' fontWeight='700' w='100%' textAlign='center' lineHeight='20px'>{label}</Text>
                <Input value={value} onChange={handleChange} mt='10px' mb='10px' w='30%' variant='unstyled' fontWeight='700' bg='colors.WHITE' h='60px' fontSize='60px' type="number" />
        </>
    )
}