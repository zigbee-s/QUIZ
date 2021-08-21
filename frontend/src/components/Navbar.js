import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';


const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);

    const getState = async () => {
        try {
            const response = await fetch('/user', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();

            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }

            if (data.userState) {
                console.log("here");
                dispatch({ type: "USER", payload: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    getState();

    const RenderMenu = () => {

        if (state) {
            return (
                <div className='nav' style={{ alignItems: "right" }}>
                    <NavLink to="/" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Home</NavLink>
                    <NavLink to="/quiz" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Quiz</NavLink>
                    <NavLink to="/logout" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Logout</NavLink>
                </div>
            )
        } else {
            return (
                <div className='nav' style={{ alignItems: "right" }}>
                    <NavLink to="/" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Home</NavLink>
                    <NavLink to="/login" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Log in</NavLink>
                    <NavLink to="/signup" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Sign up</NavLink>
                    <NavLink to="/quiz" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Quiz</NavLink>
                    <NavLink to="/logout" style={{ fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display: "inline-block", textAlign: "center", backgroundColor: "#04AA6D", color: "white", padding: "5px 12px", margin: "10px", borderRadius: "4px" }}>Logout</NavLink>
                </div>
            )
        }
    }

    return (
        <RenderMenu />
    )
}

export default Navbar;
