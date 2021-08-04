import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const Quiz = () => {
    const [user, setUser] = useState({});

    const history = useHistory();
    const callQuizPage = async ()=>{
        try {
            const response = await fetch('/quiz',{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            setUser(data);
            console.log(data.email);
            console.log(user);

            if(!response.status === 200){     
                const error = new Error(response.error); 
                throw error;  
            }
        } catch (error) {
            history.push('/signin');    
            console.log(error);
        }
    }   

    useEffect(() => {
        callQuizPage();
    }, []); 

    const PostAnswer = async (e) =>{
        e.preventDefault();
        let answer = "hi";
        const {email} = user;
        console.log(email, answer)
        const res = await fetch("/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, answer
            })            
        })

        const data = await res.json();

        console.log(data);
    }
    return (
        <div>
           <h1>sdkn</h1> 
           <button onClick = {PostAnswer}></button>
        </div>
    )
}

export default Quiz;