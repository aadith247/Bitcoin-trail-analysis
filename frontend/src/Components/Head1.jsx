import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Head1() {
  const navigate = useNavigate();
  
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src="/logo-png.png" alt="Logo" />
        </div>
        <div className="children">
          <ul>
            <li onClick={()=>navigate("/")}>About Us</li>
            <li onClick={()=>{navigate("/")}}>Services</li>
            
          </ul>
        </div>
        <div className="signup">
          <ul>
            <li onClick={()=>navigate("/signin")}>Sign In</li>
            <li>
              <button className="btn bg-blue-500 rounded-lg p-4 text-white hover:bg-blue-600" onClick={() => navigate("/signup")}>Get Started Today</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
