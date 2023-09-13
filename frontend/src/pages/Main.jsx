import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Home from './Home';
import Login from '../components/Login/Login';
import Register from './Register'
import SidebarMenu from '../components/Navbar/Sidebar';
import './style_sheets/Main.css';
import Cookies from 'js-cookie';
import { verify_token } from '../services/Verify_Token/verifyToken';
import AllowCookies from './AllowCookies';

function Main() {
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    const [userToken , setUserToken] = useState(Cookies.get('token') || '');

    const [isCookiesAllowed , setIsCookiesAllowed] = useState(sessionStorage.getItem('isCookiesAllowed') || "false");

    const verifyUserToken = async() =>{
        await verify_token({userToken})
            .then((response)=>{
                if(response.code === 1){
                    sessionStorage.setItem('role' , response.role);
                    sessionStorage.setItem('username' , response.id);
                    setIsLoggedIn(true);
                }
            })
            .catch( err=> console.log(err));
    }

    useEffect(()=>{
        if(isCookiesAllowed==="false"){
            sessionStorage.setItem('isCookiesAllowed',false);
        }

        if(userToken!==''){
            verifyUserToken();
        }
        else{
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('username');
            Cookies.remove('token');
            setIsLoggedIn(false);
        }
    } ,[])

    return (
        <div className='main-body'>
            <Router>
                <nav className='navbar-section'>
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </nav>
                <div className='content-wrapper'>
                    <aside className='left-aside-section'>
                        <SidebarMenu />
                    </aside>
                
                    <main className='main-section'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
                            <Route path='/register' element={<Register isLoggedIn={isLoggedIn}/>} />
                        </Routes>
                        <div className='cookies-popup'>
                            {<AllowCookies />}
                        </div>
                    </main>
                </div>

            </Router>
            
        </div>
    )
}

export default Main