import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ListPage } from './pages/list';
import { OrderPage } from './pages/order';
import { OrderProvider } from './context/order-context';
import { CarWashProvider } from './context/carwash-context';
import { InstructionPage } from './pages/instruction';
import { UserProvider } from './context/user-context';

function App() {
	return (
		<>
			<UserProvider>
				<OrderProvider>
					<CarWashProvider>
						<Routes>
							<Route path="/home" element={<HomePage />} />
							<Route path="/order" element={<OrderPage />} />
							<Route path="/" element={<InstructionPage />} />
						</Routes>
					</CarWashProvider>
				</OrderProvider>
			</UserProvider>
		</>
	);
}

export default App;
