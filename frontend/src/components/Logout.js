import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../App';
import './CSS Files/logout.css';

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();

    //promises 
    useEffect(() => {
        fetch('/signout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            
            //Changing USER to false, to switch navbar accordingly
            dispatch({ type: "USER", payload: false });
            
            window.alert("Signed out");
            history.push('/login', { replace: true });
            
            if (res.status != 200) {
                const error = new Error(res.error);
                throw error;
            }
            
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
            <h1 className = 'signOut'>You've signed out!</h1>
        </>
    )
}

export default Logout;