import notFound from '../src/images/404.svg'
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, RouterProvider } from 'react-router';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Brands from './Components/Brands/Brands';
import ProDetails from './Components/ProDetails/ProDetails';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import CartContext from './Context/CartContext';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/allOrders/allOrders';
import { Offline, Online } from 'react-detect-offline';
import Wishlist from './Components/Wishlist/Wishlist';
import Verify from './Components/Login/Verify';
import UpdatePassword from './Components/Login/updatePassword';

function App() {

  const [userdata, setuserData] = useState(null);
  function saveUser() {
    let encodetoken = localStorage.getItem('tkn')
    let decodedtoken = jwtDecode(encodetoken)
    setuserData(decodedtoken)

  }
  function removeUser() {
    let token = localStorage.removeItem('tkn')

   
    const confirm = window.confirm('Are you sure to logout?');
if (confirm) {
  setuserData(token)
}


  }
  useEffect(() => {
    if (localStorage.getItem('tkn') !== null && userdata == null) {
      saveUser()
    }

    ;
  }, []);



  const router = createHashRouter(
    [
      {
        path: '', element: <CartContext><Layout userdata={userdata} removeUser={removeUser} /></CartContext>, children: [
          { path: '', element: <Login saveUser={saveUser}   userdata={userdata}/> },
          { path: 'Home', element: <CartContext><Home /> </CartContext> },
          { path: 'ProDetails/:id', element: <CartContext><ProDetails userdata={userdata} /></CartContext> },
          { path: 'BrandProducts/:id', element: <CartContext><BrandProducts /></CartContext> },
          { path: 'Login', element: <Login saveUser={saveUser} /> },
          { path: 'Verify', element: <Verify /> },
          { path: 'Register', element: <Register /> },
          { path: 'Payment', element:<CartContext> <Payment/> </CartContext>},
          { path: 'Brands', element: <Brands /> },
          { path: 'UpdatePassword', element: <UpdatePassword/> },
          { path: 'allOrders', element: <ProtectedRoute><AllOrders userdata={userdata} /></ProtectedRoute>  },
          { path: 'Categories', element: <Categories /> },
          { path: 'CategoryProducts/:id', element: <CartContext> <CategoryProducts /></CartContext> },
          { path: 'wishlist', element: <ProtectedRoute><CartContext> <Wishlist /></CartContext></ProtectedRoute> },
          { path: 'Cart', element: <ProtectedRoute><CartContext> <Cart /></CartContext></ProtectedRoute> },
          {
            path: '*', element: <div className='text-center py-5'>
              <img className='mt-5' src={notFound} alt="404" />


            </div>
          }

        ]
      }
    ]
  )
  return (
    <>
   
    <Offline><div className="network"> Sorry, you are offline </div> </Offline>
      <Toaster />
      <RouterProvider router={router} />

    </>
  );
}

export default App;
