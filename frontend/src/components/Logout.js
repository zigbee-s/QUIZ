import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../App';


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
            dispatch({ type: "USER", payload: false });
            history.push('/Signin', { replace: true });
            window.alert("Signed out");
            if (res.status != 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <h1>Siign out page</h1>
        </>
    )
}

export default Logout;