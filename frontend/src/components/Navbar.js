import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signin">Signin</NavLink>
            <NavLink to="/register">Signup</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
        </div>
    )
}

export default Navbar;
