import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './components/UserProvider';
import TypeProvider from './components/TypeProvider';




ReactDOM.render(
<React.StrictMode>
<BrowserRouter>
<TypeProvider>
 <UserProvider>
  <App/>
  </UserProvider>
</TypeProvider>
  </BrowserRouter>
</React.StrictMode>,
document.getElementById('root')

);

reportWebVitals();
