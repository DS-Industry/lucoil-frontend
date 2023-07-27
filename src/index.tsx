import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './context/user-context';
import { CarWashContext } from './context/carwash-context';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const colors = {
  colors: {
      'PRIMARY_RED' : '#D2233C',
      'SECONDARY_RED': '#F7EAEC',
      'WHITE' : '#FFFFFF',
      'BLACK' : '#000000',
      'DARK_GRAY' : '#A0A0A4',
      'WHITE_GRAY' : '#EFEFF3',
  }
}

const theme = extendTheme({ colors });

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider value=''>
          <CarWashContext.Provider value=''>
              <App />
          </CarWashContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
