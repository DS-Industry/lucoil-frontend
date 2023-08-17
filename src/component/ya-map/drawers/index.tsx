import { useEffect, useState } from 'react';
import { CustomDrawer } from '../../drawer';
import { CarWashFullInfo } from '../../car-wash/car-wash-full-info';
import { NumInput } from '../../inputs/num-input';
import { useNavigate } from 'react-router-dom';
import { PortalProgramList } from '../../portal/portal-program-list';
import { useCarWash } from '../../../context/carwash-context';
import { Navbar } from '../../nav-bar';
import { ListPage } from '../../../pages/list';
import { YandexMaps } from '../map';
import { CarWashMainInfo } from '../../car-wash/car-wash-main-info';
import { SelectBay } from '../../select-bay';

export const CustomYMap = () => {
	const navigate = useNavigate();

	const { store, getCarWashList } = useCarWash();
	const [carWashWithDistance, setCarWashWithDistance] = useState<Array<any>>(
		[]
	);

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
			//console.log(store.carWashes);
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setUserPosition([latitude, longitude]);
			});
		}

		if (!store.isLoading) {
			getCarWashListWithCoords();
		}
	}, []);

	useEffect(() => {
		console.log('distance array length', carWashWithDistance.length);
		if (carWashWithDistance.length) {
			console.log('this is store carwashes');
			console.log(store.carWashes);
			console.log('this is store carwashes upper');
			console.log('----------- START --------------');
			console.log(carWashWithDistance);
			console.log('----------- END ------------------');
		}
	}, [carWashWithDistance]);

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
				setCarWashWithDistance={setCarWashWithDistance}
				carWashWithDistance={carWashWithDistance}
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
					userPosition={userPosition}
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
							<CarWashMainInfo
								key={index}
								distance={distance}
								carWash={carWash}
								setCarWash={setCarWash}
								setDrawerSwitch={setDrawerSwitch}
								carWashMainInfo={carWashMainInfo}
							/>
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
					isOpen={drawerSwitch === 'bay'}
					onClose={handleCloseDrawer}
				>
					<SelectBay carWash={carWash} onClick={setDrawerSwitch} />
				</CustomDrawer>
			)}

			{carWash && carWash.type === 'SelfService' ? (
				<CustomDrawer
					isOpen={drawerSwitch === 'sum' ? true : false}
					onClose={handleCloseDrawer}
				>
					<NumInput
						nameMessage="Сумма"
						minValue={carWash.limitMinCost}
						maxValue={carWash.limitMaxCost}
						onClick={navigateToOrder}
						label="Введите сумму"
						isSum={true}
					/>
				</CustomDrawer>
			) : (
				<>
					<CustomDrawer
						isOpen={drawerSwitch === 'portal'}
						onClose={handleCloseDrawer}
					>
						<PortalProgramList programList={carWash && carWash.price} />
					</CustomDrawer>
				</>
			)}
		</>
	);
};
