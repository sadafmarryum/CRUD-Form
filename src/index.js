import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Testformdetails from './Component/Testformdetails';
import Testform from './Component/Testform.js';
import { StateProvider } from './Context/Datacontext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

let allroute = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: 'testform',
      element: < Testform />
    },
    {
      path: 'formdetails',
      element: < Testformdetails />
    }
  ]
)
root.render(
  <React.StrictMode>
    <StateProvider>
      <RouterProvider router={allroute} />
    </StateProvider>
  </React.StrictMode>
);
reportWebVitals();
