
import Navbar from './../Navbar/Navbar';
import {Outlet} from 'react-router-dom';
import Footer from './../Footer/Footer';

const Layout = ({userdata,removeUser}) => {
   
    return (
        <>
            <Navbar userdata={userdata} removeUser={removeUser} />
            <Outlet/>
          <Footer/>
        </>
    );
}

export default Layout;
