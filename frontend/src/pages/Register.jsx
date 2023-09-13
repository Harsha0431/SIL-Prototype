import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Regisister({isLoggedIn}) {
  const navigator = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigator('/login');
    }
  }, []);

  
  return (
    <div>

    </div>
  )
}

export default Regisister