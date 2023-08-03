import { CarWashMap } from '../../component/car-wash/car-wash-map-item';
import { useOrder } from '../../context/order-context';
import { Box, Flex, HStack, Text, useToast } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { useCarWash } from '../../context/carwash-context';
import { TagInfo } from '../../component/tag-info';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';

interface IStorageData {
	phone: string | null;
	partnerCard: string | null;
	sum: string | null;
	bayNumber: string | null;
	carWash: any | null;
}

export const OrderPage: React.FC = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { store, sendPayment, updateStore } = useOrder();
	const {
		store: carWashStore,
		pingCarWash,
		updateStore: updateCWStore,
	} = useCarWash();
	const { user } = useUser();
	const [storageData, setStorageData] = useState<IStorageData | null>(null);

	const handleClick = () => {
		if (store.carWashId) {
			pingCarWash(Number(store.carWashId), Number(store.bayNumber));
		} else {
			pingCarWash(
				Number(storageData?.carWash.id),
				Number(storageData?.bayNumber)
			);
		}
	};

	useEffect(() => {
		if (carWashStore.pingStatus === 200) {
			updateCWStore({
				pingStatus: null,
			});
			const data = {
				amount: store.sum
					? String(store.sum)
					: storageData?.sum
					? storageData.sum
					: 'null',
				phone: user.phNumber
					? String(user.phNumber)
					: storageData?.phone
					? storageData.phone
					: 'string',
			};
			sendPayment(data);
			console.log('ping status free');
		}

		if (carWashStore.pingStatus === 400) {
			console.log('is busy');
			updateCWStore({
				pingStatus: null,
			});
			toast({
				title: 'Кажется с постом что-то не так',
				description: 'Возможно он занят',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top',
			});
			navigate('/home');
		}
	}, [carWashStore.pingStatus]);

	useEffect(() => {
		if (store.paymentTocken) {
			navigate('/pay');
		}
	}, [store.paymentTocken]);

	useEffect(() => {
		const phNumber = sessionStorage.getItem('phone');
		const partnerCard = sessionStorage.getItem('partnerCard');
		const sum = sessionStorage.getItem('sum');
		const bayNumber = sessionStorage.getItem('bayNumber');
		const carWash = sessionStorage.getItem('carWash');
		if (carWash) {
			setStorageData({
				phone: phNumber,
				partnerCard: partnerCard,
				sum: sum,
				bayNumber: bayNumber,
				carWash: JSON.parse(carWash),
			});
		}
	}, []);

	useEffect(() => {
		if (storageData) {
			console.log(storageData);
		}
	}, [storageData]);

	return (
		<Flex
			boxSizing="border-box"
			flexDirection="column"
			justifyContent="space-between"
			h="100vh"
			w="100vw"
			p="28px"
		>
			<Flex flexDirection="column">
				<CarWashMap
					id={String(store.sum)}
					title={
						carWashStore.carWash
							? carWashStore.carWash.name
							: storageData?.carWash
							? storageData.carWash['name']
							: 'cwnamve'
					}
					openTime="24часа"
					address={
						carWashStore.carWash
							? carWashStore.carWash.address
							: storageData?.carWash
							? storageData?.carWash.address
							: 'address'
					}
					distance={
						carWashStore.carWash
							? carWashStore.carWash.distance
							: storageData?.carWash
							? storageData?.carWash.distance
							: 'distance'
					}
					isDisabled={true}
				/>
				<Text pt="30px" fontSize="15px" fontWeight="700">
					Пост
				</Text>
				<Box w="30%">
					<TagInfo
						label={
							store.bayNumber
								? String(store.bayNumber)
								: storageData?.bayNumber
								? storageData.bayNumber
								: 'bayNumber'
						}
						bgColor="colors.PRIMARY_RED"
						color="colors.WHITE"
						fontSize="14px"
						height="20px"
					/>
				</Box>
				<Text pt="30px" fontSize="15px" fontWeight="700">
					Кэшбек на карту Лукойл
				</Text>
				<Box w="30%">
					<TagInfo
						label="10 %"
						bgColor="colors.PRIMARY_RED"
						color="colors.WHITE"
						fontSize="14px"
						height="20px"
					/>
				</Box>
				<HStack w="80vw">
					<Text pt="36px" fontSize="15px" fontWeight="400">
						Карта программы лояльности
						<Text
							as="span"
							color="colors.PRIMARY_RED"
							ml="5px"
							fontSize="15px"
							fontWeight="700"
							letterSpacing="2px"
						>
							ЛУКОЙЛ
						</Text>
						:
					</Text>
				</HStack>
				<Box mt="11px" fontWeight="500">
					<TagInfo
						label={
							store.partnerCard
								? store.partnerCard
								: storageData?.partnerCard
								? storageData.partnerCard
								: 'partner card'
						}
						bgColor="colors.WHITE_GRAY"
						color="colors.BLACK"
						fontSize="14px"
						height="20px"
						fontWeight="500"
					/>
				</Box>
				<Box mt="11px" fontWeight="500">
					<TagInfo
						label={
							user.phNumber
								? user.phNumber
								: storageData?.phone
								? storageData.phone
								: 'phone number'
						}
						bgColor="colors.WHITE_GRAY"
						color="colors.BLACK"
						fontSize="14px"
						height="20px"
						fontWeight="500"
					/>
				</Box>
			</Flex>
			<Flex flexDirection="inherit" justifyContent="center">
				<Text w="100%" textAlign="center" fontSize="48px" fontWeight="700">
					{store.sum ? store.sum : storageData?.sum ? storageData.sum : 'sum'} ₽
				</Text>
				<OperButton
					title="Оплатить"
					onClick={handleClick}
					disabled={false}
					isOper={false}
				/>
			</Flex>
		</Flex>
	);
};
