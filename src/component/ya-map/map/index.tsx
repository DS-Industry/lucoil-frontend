import { Flex, Spinner } from '@chakra-ui/react';
import {
	YMaps,
	Map,
	Placemark,
	GeolocationControl,
	ZoomControl,
} from '@pbe/react-yandex-maps';
import React from 'react';
import { CustomPlacemark } from '../placemark';
import GeoSVG from '../../../assets/icons/geo.svg';
import ActiveGeoSVG from '../../../assets/icons/geo-2.svg';
import { CustomAlert } from '../../alert';

interface IYandexMaps {
	userPosition: Array<number>;
	store: any;
	carWashCoords: Array<number> | null;
	setCarWash: any;
	setCarWashCoords: any;
	setDrawerSwitch: any;
	setDistance: any;
	setCarWashMainInfo: any;
	setCarWashIdList: any;
	carWashIdList: number;
	drawerSwitch: string;
}

export const YandexMaps: React.FC<IYandexMaps> = React.memo(
	({
		userPosition,
		store,
		carWashCoords,
		setCarWash,
		setCarWashCoords,
		setDrawerSwitch,
		setDistance,
		setCarWashMainInfo,
		setCarWashIdList,
		carWashIdList,
		drawerSwitch,
	}) => {
		return (
			<>
				<Flex h="85vh" w="100%" justifyContent="center" alignItems="center">
					{store.carWashes && userPosition.length > 0 ? (
						<YMaps
							enterprise
							query={{
								apikey: '69daa1a6-dc1e-463c-915b-2e6f0ca0cc74',
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
								{store.carWashes.map((carWash: any, index: number) => {
									console.log(carWash);
									if (carWash.lat && carWash.lon) {
										return (
											<CustomPlacemark
												key={index}
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
					) : store.carWashes === null ? (
						<CustomAlert />
					) : (
						<Spinner h="30px" w="30px" />
					)}
				</Flex>
			</>
		);
	}
);
