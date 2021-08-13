import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='nav' style={{alignItems: "right"}}>
            <NavLink to="/" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px", margin: "10px", borderRadius:"4px"}}>Home</NavLink>
            <NavLink to="/signin" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px", margin: "10px", borderRadius:"4px" }}>Sign in</NavLink>
            <NavLink to="/register" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px",  margin: "10px", borderRadius:"4px" }}>Sign up</NavLink>
            <NavLink to="/quiz" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px",  margin: "10px", borderRadius:"4px" }}>Quiz</NavLink>
        </div>
    )
}

export default Navbar;
