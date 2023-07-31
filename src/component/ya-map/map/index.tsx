import { useEffect, useState } from 'react';
import GeoSVG from '../../../assets/icons/geo.svg';
import ActiveGeoSVG from '../../../assets/icons/geo-2.svg';
import { CustomPlacemark } from '../placemark';
import {
	GeolocationControl,
	Placemark,
	YMaps,
	Map,
	ZoomControl,
} from '@pbe/react-yandex-maps';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { CustomDrawer } from '../../drawer';
import { CarWashMap } from '../../car-wash/car-wash-map-item';
import { TagButton } from '../../buttons/tag-button';
import { CarWashFullInfo } from '../../car-wash/car-wash-full-info';
import { NumInput } from '../../inputs/num-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { PortalProgramList } from '../../portal/portal-program-list';
import { TagInfo } from '../../tag-info';
import { useCarWash } from '../../../context/carwash-context';

export const CustomYMap = () => {
	const navigate = useNavigate();

	const { store, getCarWashList } = useCarWash();

	useEffect(() => {
		console.log(store);
	}, [store]);

	const location = useLocation();
	const [userPosition, setUserPosition] = useState<number[]>([]);
	const [drawerSwitchStr, setDrawerSwitch] = useState<string>('');
	const [carWashIdList, setCarWashIdList] = useState<boolean>(false);
	const [carWashCoords, setCarWashCoords] = useState<Array<number>>();
	const [distance, setDistance] = useState<number>(0);
	const [carWashMainInfo, setCarWashMainInfo] = useState<any>();
	const [carWash, setCarWash] = useState<any>();

	const handleCloseDrawer = () => {
		setDrawerSwitch('');
	};

	const navigateToOrder = () => {
		navigate('/order');
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setUserPosition([latitude, longitude]);
		});
	}, []);

	useEffect(() => {
		async function getCarWashListWithCoords() {
			await getCarWashList();
			console.log(store.carWashes);
		}

		if (!store.isLoading) {
			getCarWashListWithCoords();
		}
	}, []);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const carWashId = queryParams.get('carWashId');
		const resultCarWashList: Array<any> = [];

		if (carWashId) {
			store.carWashes.forEach((carWashWithCoords: any) => {
				return carWashWithCoords.carwashes.map((carWash: any) => {
					return resultCarWashList.push({
						id: carWashWithCoords.id,
						carWash,
						coords: [carWashWithCoords.lat, carWashWithCoords.lon],
					});
				});
			});
			const resultCarWash = resultCarWashList.find(
				(carWash) => carWash.carWash.id === carWashId
			);
			setCarWashIdList(resultCarWash.id);
			setCarWash(resultCarWash.carWash);
			setCarWashCoords(resultCarWash.coords);
			setDrawerSwitch('full-info');
		}
	}, []);

	return (
		<>
			<Flex h="88%" w="100%">
				{store.carWashes && userPosition.length > 0 ? (
					<YMaps
						enterprise
						query={{
							apikey: '69daa1a6-dc1e-463c-915b-2e6f0ca0cc74',
						}}
					>
						<Map
							width="100%"
							height="100%"
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
											placemarkId={
												carWashMainInfo
													? carWashMainInfo.id
													: carWashIdList
													? carWashIdList
													: -1
											}
											setDrawerSwitch={setDrawerSwitch}
											placeMarkSwitch={drawerSwitchStr}
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
				) : (
					<Spinner h="30px" w="30px" />
				)}
			</Flex>

			<CustomDrawer
				key={0}
				isOpen={drawerSwitchStr === 'main' ? true : false}
				onClose={handleCloseDrawer}
			>
				{carWashMainInfo &&
					carWashMainInfo.carWashes.map((carWash: any, index: number) => {
						return (
							<>
								<Flex mb="30px" flexDirection="column">
									<CarWashMap
										isDisabled={false}
										key={index}
										carWash={carWash}
										id={carWash.id}
										title={carWash.name}
										openTime="24 часа"
										address={carWash.address}
										distance={distance}
										getCarWash={setCarWash}
										setCarWashDrawer={setDrawerSwitch}
									/>
									{distance && distance > 1000000 && (
										<Flex w="100%" justifyContent="center" mt="20px">
											<TagInfo
												label="АМС слишком далеко от вас!"
												bgColor="colors.SECONDARY_RED"
												color="colors.PRIMARY_RED"
												fontSize="14px"
												height="28px"
											/>
										</Flex>
									)}

									{carWashMainInfo && carWashMainInfo.carWashes.length < 2 && (
										<Box
											w="100%"
											display="flex"
											justifyContent="space-between"
											mt="15px"
										>
											<TagButton
												disabled={distance > 10000 ? true : false}
												switchCarWashType={
													carWash.type === 'SelfService' ? 'bay' : 'portal'
												}
												onClick={setDrawerSwitch}
												carWash={carWash}
												distance={distance}
												height="50px"
												fontSize="15px"
												bgColor="colors.SECONDARY_RED"
												color="colors.PRIMARY_RED"
												label="Оплатить мойку"
											/>
										</Box>
									)}
								</Flex>
							</>
						);
					})}
			</CustomDrawer>

			<CustomDrawer
				key={1}
				isOpen={drawerSwitchStr === 'full-info' ? true : false}
				onClose={handleCloseDrawer}
			>
				<CarWashFullInfo
					distance={distance}
					carWash={carWash}
					setDrawerSwitch={setDrawerSwitch}
					switchCarWashType={
						carWash && carWash.type === 'SelfService' ? 'bay' : 'portal'
					}
				/>
			</CustomDrawer>

			{carWash && carWash.type === 'SelfService' ? (
				<>
					<CustomDrawer
						key={11}
						isOpen={drawerSwitchStr === 'bay' ? true : false}
						onClose={handleCloseDrawer}
					>
						<Flex
							justifyContent="center"
							alignItems="center"
							flexDir="column"
							w="100%"
						>
							<NumInput
								nameMessage="Номер поста"
								minValue={1}
								maxValue={carWash.boxes.length}
								onClick={setDrawerSwitch}
								label="Введите номер поста"
								isBay={true}
							/>
						</Flex>
					</CustomDrawer>
					<CustomDrawer
						key={12}
						isOpen={drawerSwitchStr === 'sum' ? true : false}
						onClose={handleCloseDrawer}
					>
						<Flex
							justifyContent="center"
							alignItems="center"
							flexDir="column"
							w="100%"
						>
							<NumInput
								nameMessage="Сумма"
								minValue={carWash.limitMinCost}
								maxValue={carWash.limitMaxCost}
								onClick={navigateToOrder}
								label="Введите сумму"
								isSum={true}
							/>
						</Flex>
					</CustomDrawer>
				</>
			) : (
				<>
					<CustomDrawer
						key={2}
						isOpen={drawerSwitchStr === 'portal' ? true : false}
						onClose={handleCloseDrawer}
					>
						<PortalProgramList programList={carWash && carWash.price} />
					</CustomDrawer>
				</>
			)}
		</>
	);
};
