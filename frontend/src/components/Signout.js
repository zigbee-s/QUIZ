import React, {useEffect} from 'react';
import { useHistory } from 'react-router';

const Signout = () => {

    const history = useHistory();
    //promises
    useEffect(() => {
        fetch('/signout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
                history.push('/Signin', {replace: true});
                window.alert("Signed out");
                if(res.status != 200){
                    const error = new Error(res.error);
                    throw error; 
                }
        }).catch((err)=> {
            console.log(err);
        })
    }, [])

    return (
        <>
            <h1>Siign out page</h1>
        </>
    )
}

export default Signout;