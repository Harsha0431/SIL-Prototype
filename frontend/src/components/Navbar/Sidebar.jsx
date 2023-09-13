import React , {useEffect, useState} from 'react';
import { MenuItem, Sidebar , Menu, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom'
import './Sidebar.css';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GroupsIcon from '@mui/icons-material/Groups';
import MoreIcon from '@mui/icons-material/More';

function SidebarMenu() {

  const view_968 = useMediaQuery('(max-width:968px)');

  const [menuCollapsed , setMenuCollapsed ] = useState(view_968);

  useEffect(
    ()=>{
      setMenuCollapsed(view_968);
    },[view_968]
  )

  const collapseSidebar = () =>{
    setMenuCollapsed(!menuCollapsed);
  }

    return (
        <div className='nav-side-bar' style={{overflowY:'auto'}}>
                <Sidebar backgroundColor='#3a454b' color='#fff' style={{height:'92.4vh'}} collapsed={menuCollapsed}>

                    <Menu className='side-bar-menu'
                        menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                              if (level === 0) {
                                return {
                                  color: disabled ? "#eee" : "#fff",
                                  backgroundColor: active ? "#337ab7" : undefined,
                                  "&:hover": {
                                      backgroundColor: "#337ab7 !important",
                                      color: "white !important",
                                      borderRadius: "8px !important",
                                  },
                                };
                              }
                            },
                          }}
                    >

                      <MenuItem
                        className="menu1"
                        icon={
                          <MenuRoundedIcon
                            fontSize='large'
                            onClick={() => {
                              collapseSidebar();
                            }}
                          />
                        }
                      >
                        <h1 style={{color:'#ffffff',}} id='sidebar-toogle-text'>SIL</h1>
                      </MenuItem>

                        <Link to='/' style={{textDecoration:'none' , color:'#fff '}}>
                            <MenuItem className='menu-items' icon={<Tooltip title={menuCollapsed?'Home':''} placement='right' arrow><HomeIcon /></Tooltip>}>Home</MenuItem>
                        </Link>

                        <Link to='/register' style={{textDecoration:'none' , color:'#fff '}}>
                            <MenuItem className='menu-items' icon={<Tooltip title={menuCollapsed?'Register':''} placement='right' arrow><AppRegistrationIcon /></Tooltip>}>Register</MenuItem>
                        </Link>

                        <SubMenu label='Clubs' style={{backgroundColor:'#3a454b'}} icon={<Tooltip title={menuCollapsed?'Clubs':''} placement='right' arrow><GroupsIcon /></Tooltip>}>
                            <MenuItem className='menu-items' style={{backgroundColor:'#3a454b'}}>Club 1</MenuItem>
                            <MenuItem className='menu-items' style={{backgroundColor:'#3a454b'}}>Club 2</MenuItem>
                            <MenuItem className='menu-items' style={{backgroundColor:'#3a454b'}}>Club 3</MenuItem>
                        </SubMenu>

                        <MenuItem className='menu-items' icon={<Tooltip title={menuCollapsed?'Other':''} placement='right' arrow><MoreIcon /></Tooltip>}>Other</MenuItem>
                        
                    </Menu>
                </Sidebar>
        </div>
    )
}

export default SidebarMenu