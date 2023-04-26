
import React from 'react';
import { Navigate } from 'react-router';
const ProtectedRoute = ({children}) => {
  if (localStorage.getItem('tkn')==null) {
   return <Navigate to={'/Login'}/>
  }
  else{

    return children
  }
}

export default ProtectedRoute;


