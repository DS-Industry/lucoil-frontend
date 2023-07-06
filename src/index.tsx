import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './context/user-context';
import { CarWashContext } from './context/carwash-context';
import { OrderContext } from './context/order-context';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext.Provider value=''>
        <CarWashContext.Provider value=''>
          <OrderContext.Provider value=''>
            <App />
          </OrderContext.Provider>
        </CarWashContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
