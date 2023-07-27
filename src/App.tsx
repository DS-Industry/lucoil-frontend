import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ListPage } from './pages/list';
import { OrderPage } from './pages/order';
import { OrderContext } from './context/order-context';
import { useState } from 'react';
import { InstructionPage } from './pages/instruction';

function App() {
  const [ order, setOrder ] = useState(null)


  return (
    <>
    <OrderContext.Provider value={{ order, setOrder }}>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/list' element={<ListPage />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/' element={<InstructionPage/>} />
      </Routes>
    </OrderContext.Provider>
    </>
     
      
  );
}

export default App;
