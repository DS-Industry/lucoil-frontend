import { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
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
import { YandexMaps } from '../map';

export const CustomYMap = () => {
	const navigate = useNavigate();

	const { store, getCarWashList } = useCarWash();

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
		async function getCarWashListWithCoords() {
			await getCarWashList();
			console.log(store.carWashes);
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setUserPosition([latitude, longitude]);
			});
		}

		if (!store.isLoading) {
			getCarWashListWithCoords();
		}
	}, []);

	return (
		<>
			<YandexMaps
				userPosition={userPosition}
				store={store}
				carWashCoords={carWashCoords ? carWashCoords : null}
				carWashIdList={carWashIdList}
				setCarWash={setCarWash}
				setCarWashCoords={setCarWashCoords}
				setCarWashIdList={setCarWashIdList}
				setCarWashMainInfo={setCarWashMainInfo}
				setDistance={setDistance}
				setDrawerSwitch={setDrawerSwitch}
				drawerSwitch={drawerSwitch}
			/>

			{store.carWashes && <Navbar openList={setDrawerSwitch} />}

			<CustomDrawer
				key={100}
				isOpen={drawerSwitch === 'list'}
				onClose={handleCloseDrawer}
				size="full"
				topBR="0"
				pl="0"
				pr="0"
			>
				<ListPage
					key={1001}
					openFullInfo={setDrawerSwitch}
					setCarWashCoords={setCarWashCoords}
					setCarWash={setCarWash}
					setCarWashIdList={setCarWashIdList}
				/>
			</CustomDrawer>

			<CustomDrawer
				key={1011}
				isOpen={drawerSwitch === 'main' ? true : false}
				onClose={handleCloseDrawer}
			>
				{carWashMainInfo &&
					carWashMainInfo.carWashes.map((carWash: any, index: number) => {
						return (
							<Flex mb="30px" flexDirection="column" key={index}>
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
									<Flex
										w="100%"
										justifyContent="center"
										mt="20px"
										key={index + 1212}
									>
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
						);
					})}
			</CustomDrawer>

			<CustomDrawer
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
