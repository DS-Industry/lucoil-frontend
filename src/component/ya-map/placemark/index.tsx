import { Placemark, useYMaps } from '@pbe/react-yandex-maps/';
import { useEffect, useState } from 'react';
import { useCarWash } from '../../../context/carwash-context';

interface ICustomPlacemark {
	index: number | null;
	placemarkId: number;
	userPosition: Array<number>;
	coords: Array<number>;
	getCoords: any;
	icon: string;
	activeIcon: string;
	size: Array<number>;
	activeSize: Array<number>;
	carWashes: Array<any>;
	getInfo: any;
	setDrawerSwitch: any;
	placeMarkSwitch: string;
	getDistance: any;
	setPlaceMarkStyle: any;
	setCarWash: any;
	setCarWashId: any;
}

interface IRouteDistance {
	text: string;
	value: number;
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
	setCarWashId,
}) => {
	const yMaps = useYMaps();
	const [placeMarkParams, setPlaceMarkParams] = useState({
		icon,
		size,
	});

	const calculateDistance = (
		userPosition: Array<number>,
		coords: Array<number>
	) => {
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
						const routeDistance = activeRoute.properties.get('distance', {
							value: 0,
							text: '0 км',
						}) as IRouteDistance;
						if (routeDistance) {
							getDistance(routeDistance.value);
							console.log('-----------------', index);
							console.log('I AM IN PLACEMARK ');
							console.log('THIS IS VALUE ', routeDistance.value);
							console.log('-----------------');
						}
					}
				});
			});
		}
	};

	useEffect(() => {
		if (placemarkId === index) {
			calculateDistance(userPosition, coords);
		}
	});

	useEffect(() => {
		const updatePlaceMark = async () => {
			if (placemarkId === index) {
				console.log('-----------------', index);
				console.log('index', index);
				console.log('id car wash', placemarkId);
				console.log('placeMarkSwitch', placeMarkSwitch);
				console.log('-----------------');
				if (placeMarkSwitch && placeMarkSwitch !== 'list') {
					setPlaceMarkParams({
						icon: activeIcon,
						size: activeSize,
					});
				} else {
					setPlaceMarkParams({
						icon,
						size,
					});
				}
			}
		};
		updatePlaceMark();
	}, [placeMarkSwitch]);

	return (
		<>
			<Placemark
				key={index}
				geometry={coords}
				options={{
					iconLayout: 'default#image',
					iconImageHref: placeMarkParams.icon,
					iconImageSize: placeMarkParams.size,
				}}
				onClick={() => {
					if (carWashes.length < 2) {
						setCarWash(carWashes[0]);
					}
					getCoords(coords);
					setCarWashId(index);
					getInfo({
						id: index,
						carWashes,
					});
					setDrawerSwitch('main');
					setPlaceMarkStyle('main');
				}}
			/>
		</>
	);
};
