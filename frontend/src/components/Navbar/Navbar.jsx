import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Cookies from 'js-cookie';



function Navbar({isLoggedIn , setIsLoggedIn}) {

    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const view_768 = useMediaQuery('(min-width:768px)');
    const [role , setRole] = useState(sessionStorage.getItem('role') || 'guest');
    const [isGuest , setIsGuest] = useState(role==='guest');


    useEffect( ()=>{
        if(!sessionStorage.getItem('role'))
            sessionStorage.setItem('role' , 'guest');
        else
            setIsGuest(sessionStorage.getItem('role')==='guest')
    },[]);

    useEffect(()=>{
        if(isLoggedIn){
            setRole(sessionStorage.getItem('role'));
            setIsGuest(sessionStorage.getItem('role')==='guest');
        }
    } , [isLoggedIn])

    

    const handleLogoutClick = ()=>{
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('username');
        Cookies.remove('token');
        setRole('guest');
        setIsGuest(true);
        setIsLoggedIn(false);
    }


    return (
        <div >
            <div className='top-head-nav'>
                <div className='logo'>
                    <Link to='/'>
                        <img src='https://newerp.kluniversity.in/images/logo9.png' alt='KL-LOGO' style={{width:'auto' , height:'45px'}}/>
                    </Link>
                </div>
                {view_768 &&
                    <div>
                        <span style={{fontSize:'2.1rem',fontWeight:'700'}}>
                            <span style={{color:'#a90000'}}>Student Immersive Learning</span><span style={{color:'#337ab7',fontStyle:'italic'}}> -SIL</span>
                        </span>
                    </div>
                }
                
                <div className='user-account'>
                    <span>{sessionStorage.getItem('username')|| 'Guest'}</span>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AccountCircleIcon fontSize='large' style={{cursor:'pointer'}}/>
                        </IconButton>
                        
                        <Menu
                            sx={{ mt: '40px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isGuest ?
                                <div>
                                    <Link to='/login' style={{textDecoration:'none' , color:'black'}}><MenuItem><Typography textAlign="center" fontWeight={'500'} padding={'0 0.5rem'}><LoginIcon /> Login</Typography></MenuItem></Link>
                                </div>:
                                <div>
                                    <Link to='/' style={{textDecoration:'none' , color:'black'}}><MenuItem><Typography textAlign="center" fontWeight={'500'}  padding={'0 0.5rem'}><SupervisorAccountIcon /> Account</Typography></MenuItem></Link>
                                    <Link to='/' style={{textDecoration:'none' , color:'black'}} onClick={handleLogoutClick}><MenuItem><Typography textAlign="center" fontWeight={'500'} padding={'0 0.5rem'}><LogoutIcon /> Logout</Typography></MenuItem></Link>
                                </div>}
                        </Menu>
                    </Box>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Navbar