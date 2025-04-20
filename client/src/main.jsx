import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/app',
    element: <App />
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
