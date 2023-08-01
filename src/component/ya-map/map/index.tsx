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
import { useNavigate } from 'react-router-dom';
import { PortalProgramList } from '../../portal/portal-program-list';
import { TagInfo } from '../../tag-info';
import { useCarWash } from '../../../context/carwash-context';
import { Navbar } from '../../nav-bar';
import { ListPage } from '../../../pages/list';

export const CustomYMap = () => {
	const navigate = useNavigate();

	const { store, getCarWashList } = useCarWash();

	useEffect(() => {
		console.log(store);
	}, [store]);

	const [userPosition, setUserPosition] = useState<number[]>([]);
	const [drawerSwitch, setDrawerSwitch] = useState<string>('');
	const [carWashIdList, setCarWashIdList] = useState<number>(-1);
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
								carWash.lat && carWash.lon && (
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
										placemarkId={carWashIdList ? carWashIdList : -1}
										setDrawerSwitch={setDrawerSwitch}
										placeMarkSwitch={drawerSwitch}
									/>
								);
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

			<Navbar openList={setDrawerSwitch} />

			<CustomDrawer
				key={'aa11133'}
				isOpen={drawerSwitch === 'list'}
				onClose={handleCloseDrawer}
				size="full"
				topBR="0"
				pl="0"
				pr="0"
			>
				<ListPage
					openFullInfo={setDrawerSwitch}
					setCarWashCoords={setCarWashCoords}
					setCarWash={setCarWash}
					setCarWashIdList={setCarWashIdList}
				/>
			</CustomDrawer>

			<CustomDrawer
				key={0}
				isOpen={drawerSwitch === 'main' ? true : false}
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
									{distance && distance > 500 && (
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
												switchCarWashType="bay"
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
				isOpen={drawerSwitch === 'full-info' ? true : false}
				onClose={handleCloseDrawer}
			>
				<CarWashFullInfo
					distance={distance}
					carWash={carWash && carWash}
					setDrawerSwitch={setDrawerSwitch}
				/>
			</CustomDrawer>

			{carWash && (
				<CustomDrawer
					key={11}
					isOpen={drawerSwitch === 'bay' ? true : false}
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
							switchCarWashType={
								carWash && carWash.type === 'SelfService' ? 'bay' : 'portal'
							}
						/>
					</Flex>
				</CustomDrawer>
			)}

			{carWash && carWash.type === 'SelfService' ? (
				<CustomDrawer
					key={12}
					isOpen={drawerSwitch === 'sum' ? true : false}
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
			) : (
				<>
					<CustomDrawer
						key={2}
						isOpen={drawerSwitch === 'portal' ? true : false}
						onClose={handleCloseDrawer}
					>
						<PortalProgramList programList={carWash && carWash.price} />
					</CustomDrawer>
				</>
			)}
		</>
	);
};
