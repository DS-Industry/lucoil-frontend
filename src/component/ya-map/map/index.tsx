import { Flex, Spinner } from '@chakra-ui/react';
import {
	YMaps,
	Map,
	Placemark,
	GeolocationControl,
	ZoomControl,
} from '@pbe/react-yandex-maps';
import React, { useEffect } from 'react';
import { CustomPlacemark } from '../placemark';
import GeoSVG from '../../../assets/icons/geo.svg';
import ActiveGeoSVG from '../../../assets/icons/geo-2.svg';
import { CustomAlert } from '../../alert';
import { useCarWash } from '../../../context/carwash-context';
import { Navbar } from '../../nav-bar';

interface IYandexMaps {
	userPosition: Array<number>;
	carWashCoords: Array<number> | null;
	setCarWash: any;
	setCarWashCoords: any;
	setDrawerSwitch: any;
	setDistance: any;
	setCarWashMainInfo: any;
	setCarWashIdList: any;
	carWashIdList: number;
	drawerSwitch: string;
	setUserPosition: any;
}

export const YandexMaps: React.FC<IYandexMaps> = React.memo(
	({
		userPosition,
		carWashCoords,
		setCarWash,
		setCarWashCoords,
		setDrawerSwitch,
		setDistance,
		setCarWashMainInfo,
		setCarWashIdList,
		carWashIdList,
		drawerSwitch,
		setUserPosition,
	}) => {
		const { getCarWashList, store } = useCarWash();

		useEffect(() => {
			async function getCarWashListWithCoords() {
				await getCarWashList();
				navigator.geolocation.getCurrentPosition((position) => {
					const { latitude, longitude } = position.coords;
					setUserPosition([latitude, longitude]);
				});
			}
			getCarWashListWithCoords();
		}, []);

		return (
			<Flex
				h="100vh"
				w="100%"
				justifyContent="space-evenly"
				alignItems="center"
				flexDirection="column"
			>
				{store.carWashes && userPosition.length > 0 ? (
					<>
						<YMaps
							enterprise
							query={{
								apikey: '8933ab08-0e8f-418a-aa0f-292d4f89c156',
							}}
						>
							<Map
								width="100%"
								height="85vh"
								state={{
									center: carWashCoords ? carWashCoords : userPosition,
									zoom: 15,
									controls: [],
								}}
								modules={[
									'control.ZoomControl',
									'control.FullscreenControl',
									'geoObject.addon.balloon',
									'geolocation',
									'geocode',
									'control.GeolocationControl',
									'multiRouter.MultiRoute',
								]}
							>
								{store &&
									store.carWashes.map((carWash: any, index: number) => {
										if (carWash.lat && carWash.lon) {
											return (
												<CustomPlacemark
													key={index}
													carWash={carWash}
													index={index}
													coords={[carWash.lat, carWash.lon]}
													carWashes={carWash.carwashes}
													setCarWash={setCarWash}
													icon={GeoSVG}
													activeIcon={ActiveGeoSVG}
													userPosition={userPosition}
													getCoords={setCarWashCoords}
													setPlaceMarkStyle={setDrawerSwitch}
													getDistance={setDistance}
													size={[41, 41]}
													activeSize={[61, 61]}
													getInfo={setCarWashMainInfo}
													setCarWashId={setCarWashIdList}
													placemarkId={carWashIdList >= 0 ? carWashIdList : -1}
													setDrawerSwitch={setDrawerSwitch}
													placeMarkSwitch={drawerSwitch}
												/>
											);
										}
									})}
								<Placemark
									key={98928397239231}
									options={{ preset: 'islands#redCircleDotIcon' }}
									geometry={userPosition}
								/>
								<GeolocationControl options={{ float: 'right' }} />
								<ZoomControl
									options={{
										position: {
											right: '10px',
											top: '150px',
										},
									}}
								/>
							</Map>
						</YMaps>
						<Navbar openList={setDrawerSwitch} />
					</>
				) : store.carWashes === null ? (
					<CustomAlert />
				) : (
					<Spinner h="30px" w="30px" />
				)}
			</Flex>
		);
	}
);
