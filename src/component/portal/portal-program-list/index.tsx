import { Box, Text } from "@chakra-ui/react";
import { PortalService } from "../portal-programm";

interface IPortalProgramList {
    programList: Array<any> | undefined,
}

export const PortalProgramList: React.FC<IPortalProgramList> = ({ programList }) => {
    return (
        <>
            <Box>
            <Text w='100%' textAlign='center' fontWeight='700' mb='30px' >Выберите программу</Text>
            {programList && programList.map((program: any) => {
                return (
                <>
                    <Box mb='10px'>
                        <PortalService name={program.name} cost={program.cost}/>
                    </Box>
                </>
                )
            })}
            </Box>
        </>
    );
}