import { Placemark, useYMaps } from "@pbe/react-yandex-maps/"
import { useEffect, useState } from "react"

interface ICustomPlacemark {
    index: number | null,
    placemarkId: number,
    userPosition: Array<number>
    coords: Array<number>,
    getCoords: any,
    icon: string,
    activeIcon: string,
    size: Array<number>,
    activeSize: Array<number>,
    carWashes: Array<any>,
    getInfo: any,
    setDrawerSwitch: any,
    placeMarkSwitch: boolean,
    getDistance: any,
    setPlaceMarkStyle: any,
    setCarWash: any
}

interface IRouteDistance {
    text: string,
    value: number,
}


export const CustomPlacemark: React.FC<ICustomPlacemark> = ({ 
    index, 
    placemarkId, 
    coords, 
    icon,
    activeIcon, 
    activeSize, 
    size, 
    carWashes, 
    getInfo, 
    setDrawerSwitch, 
    placeMarkSwitch, 
    userPosition, 
    getDistance, 
    getCoords, 
    setPlaceMarkStyle, 
    setCarWash, 
   }) => {
    const yMaps = useYMaps();
    const [ placeMarkParams, setPlaceMarkParams] = useState({
        icon: icon,
        size: size
    });

    const calculateDistance = () => {
        if (yMaps) {
            yMaps.ready(() => {
                const multiRoute = new yMaps.multiRouter.MultiRoute(
                    {
                      referencePoints: [userPosition, coords],
                      params: {
                        routingMode: 'auto',
                      },
                    },
                    {
                      boundsAutoApply: true,
                    }
                  );
            
                  // Get detailed information about the route
                   multiRoute.model.events.add('requestsuccess', () => {
                    const activeRoute = multiRoute.getActiveRoute();
                    
                    if (activeRoute) {
                      const routeDistance = activeRoute.properties.get('distance', {'value' : 0, 'text': '0 км'}) as IRouteDistance;
                      if (routeDistance) {
                        getDistance(routeDistance.value);
                      }
                    }
            }) 
        });
        } 
    }

    useEffect(() => {
        if(placemarkId === index) {
            if(placeMarkSwitch) {
                setPlaceMarkParams({
                    icon: activeIcon,
                    size: activeSize
                })
            } else {
                setPlaceMarkParams({
                    icon: icon,
                    size: size,
                })
            }
        }
    },[placeMarkSwitch])

    return (
        <>
            <Placemark 
                key={index}
                geometry={coords}

                options= {
                    { 
                    iconLayout: 'default#image',
                    iconImageHref: placeMarkParams.icon,
                    iconImageSize: placeMarkParams.size,                 
                    }}
                onClick={() => {
                    if(carWashes.length < 2 ) {
                        setCarWash(carWashes[0]);
                    }
                    getCoords(coords);
                    calculateDistance();
                    getInfo({
                        id: index,
                        carWashes: carWashes});
                    setDrawerSwitch(true);
                    setPlaceMarkStyle(true);
                }}
                        />
        </>
    )
}