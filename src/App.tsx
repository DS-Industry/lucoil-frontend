import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ListPage } from './pages/list';
import { OrderPage } from './pages/order';
import {OrderContext, OrderProvider} from './context/order-context';
import { useState } from 'react';
import {CarWashProvider} from "./context/carwash-context";
import { InstructionPage } from './pages/instruction';

function App() {
  const [ order, setOrder ] = useState(null)


  return (
    <>
    <OrderProvider>
      <CarWashProvider>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/list' element={<ListPage />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/' element={<InstructionPage/>} />
        </Routes>
      </CarWashProvider>
    </OrderProvider>
    </>
     
      
  );
}

export default App;
