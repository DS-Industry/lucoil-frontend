import { Spinner, Box, Flex } from "@chakra-ui/react";
import { YMaps, Placemark, GeolocationControl, Map, Button as YButton } from "@pbe/react-yandex-maps";
import { Button } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { carWashTest } from "../../variabels";
import GeoSVG  from '../../assets/icons/geo.svg'
import ActiveGeoSVG from '../../assets/icons/active_geo.svg'
import PlusSVG from '../../assets/icons/plus.svg'
import { Navbar } from "../../component/nav-bar";
import { TagInfo } from "../../component/tag-info";
import { CarWash } from "../../component/car-wash/car-wash-list-item";
import { ListInput } from "../../component/inputs/list-input";
import { NumInput } from "../../component/inputs/num-input";
import { OperButton } from "../../component/buttons/oper_button";
import { CustomDrawer } from "../../component/drawer";
import { CarWashMap } from "../../component/car-wash/car-wash-map-item";
import { CustomPlacemark } from "../../component/ya-map/placemark";


export const HomeLayout: React.FC = () => {

    const [ zoom, setZoom ] = useState(10);
    const [ drawerSwitch, setDrawerSwitch ] = useState<boolean>(false);
    const [ userPosition, setUserPosition ] = useState<number[]>([]);
    const [ carWashSVG, setCarWashSVG ] = useState<string>(GeoSVG);

    const handleZoomIn = () => {
        if (zoom < 20) setZoom(prevState => prevState + 1)
    }

    const handleZoomOut = () => {
        if (zoom > 5) setZoom(prevState => prevState - 1)
    }

    const handlePlaceMarkClick = () => {
        if (carWashSVG === GeoSVG) {
            setCarWashSVG(ActiveGeoSVG);
        } else {
            setCarWashSVG(GeoSVG);
        }

    }

    function handleOpenDrawer() {
        console.log('i am fucking placemark open drawer');
        setDrawerSwitch(true);
        handlePlaceMarkClick();
        console.log();
    }
    function handleCloseDrawer () {
        console.log('i am fucking placemark open drawer');
        setDrawerSwitch(false);
        handlePlaceMarkClick();
    }


    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords
          setUserPosition([latitude, longitude]);
        }
      )
    },[])
  
    return (
    <>
{/*       <Flex direction='column'  className="App" h='100vh'>
        <Button position='absolute' top='300px' w='40px' h='40px' borderRadius='2rem' borderColor='none' zIndex='2' onClick={handleZoomOut} bgImage={PlusSVG}></Button> 
        <Flex h='88%' w='100%' >
            {userPosition.length > 0 ? 
            <YMaps
            enterprise
            query={{
            apikey: '69daa1a6-dc1e-463c-915b-2e6f0ca0cc74'
          }}>
            <Map 
          
                width='100%'
                height='100%'
                state={{ 
                center: userPosition,
                zoom: zoom,
                controls: [] 
                }}
                modules={["control.ZoomControl", "control.FullscreenControl", "geoObject.addon.balloon", "geolocation", "geocode", "control.GeolocationControl"]} >
                <YButton 
                    options={{
                        position: {
                            'right': '10px',
                            'top' : '200px',
                        },
                        maxWidth: [35],
                    }} 
                    data={{ 
                        image: PlusSVG
                     }}
                    
                    onClick={handleZoomIn} 
                    defaultState={{ selected: true}} />
              {
                carWashTest.map((carWash: any, index: number) => {
                  console.log(carWash);
                  return (
                    <CustomPlacemark 
                        index={index} 
                        coords={carWash.coords} 
                        icon={carWashSVG}
                        activeIcon={ActiveGeoSVG}
                        size={[41,41]}
                        activeSize={[51,51]}
                        title={carWash.title}
                        getInfo={handleOpenDrawer}
                        />
                )})
              }          
              <Placemark options={{ preset: 'islands#redCircleDotIcon'}} geometry={ userPosition } />
              <GeolocationControl 
                options={{ float: "right" }} />
              </Map>
            </YMaps> 
            : <Spinner h='30px' w='30px' />}
            </Flex>
            <Navbar />
      </Flex>
      <TagInfo label="Информация" fontSize="14px" bgColor="colors.WHITE_GRAY" height="20px" color="colors.BLACK" />
      <Box mt='20px' ml='15px' mr='15px'>
      <CarWash title="МОЙ-КА!DS №156" label="1,9 км" address="Ул. Брусилова 4Е" openTime="24 часа"/>
      </Box>
      <Flex h='120px' pt='20px' w='100%' alignItems='center' justifyContent='center' flexDirection='column'>

            <NumInput label='Введите номер поста' />
      </Flex>
      <Flex justifyContent='center' mb='20px'>
        <OperButton title="Далее" />
      </Flex>

        <CustomDrawer isOpen={drawerSwitch} onClose={handleCloseDrawer}>
            <CarWashMap 
                title="МОЙ-КА!DS №156" 
                openTime="24 часа" 
                address="Воронежская обл., г. Воронеж, ул. Димитрова, 65" 
                distance="1,9" />
        </CustomDrawer> */}
      </>
    );
  }
