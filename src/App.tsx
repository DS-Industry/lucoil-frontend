import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ListPage } from './pages/list';
import { OrderPage } from './pages/order';
import { OrderProvider } from './context/order-context';
import { CarWashProvider } from './context/carwash-context';
import { InstructionPage } from './pages/instruction';

function App() {
	return (
		<>
			<OrderProvider>
				<CarWashProvider>
					<Routes>
						<Route path="/home" element={<HomePage />} />
						<Route path="/list" element={<ListPage />} />
						<Route path="/order" element={<OrderPage />} />
						<Route path="/" element={<InstructionPage />} />
					</Routes>
				</CarWashProvider>
			</OrderProvider>
		</>
	);
}

export default App;
