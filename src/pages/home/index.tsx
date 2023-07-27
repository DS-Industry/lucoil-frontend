import { Flex } from "@chakra-ui/react";
import { Navbar } from "../../component/nav-bar";
import { CustomYMap } from "../../component/ya-map/map";
import { Header } from "../../component/header";


export const HomePage = () => {


    return (
    <>
      <Flex direction='column'  className="App" h='100vh'>
            <Header label='Автомойки'/>
            <CustomYMap />
            <Navbar />
            <></>
      </Flex> 
      </>
      )
}