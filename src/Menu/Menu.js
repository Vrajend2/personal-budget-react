import React from 'react';


import {
  Link
} from "react-router-dom"

function Menu() {
  
  return (
    <div class="menu">   
      <nav> 
      
        <ul>
            
             <li><Link  to="/">Homepage</Link></li>
             <li><Link  to="/about">About</Link></li>  
             <li><Link  to="/login">Login</Link></li> 
             <li><Link to="https://google.com" tabIndex="5" target="blank">Google</Link></li>
           
                
          </ul>  
       
           
      </nav>
  </div>
    
  
  );
}

export default Menu;