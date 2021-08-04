import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Signin = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async(e) =>{
        e.preventDefault();

        const res = await fetch('/signin', {
            method : "POST",
            headers : {
                "Content-type": "application/json", 
            },
            body: JSON.stringify({
                email,password
            })
        })


        const data = await res.json();
        if(data.message === "Succesfull Login"){
            window.alert("Login Succesfull");
            history.push("/");
        }
        else{
            window.alert("Invalid Creddentials");
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form method = "POST">
                    <div> 
                        <label htmlFor ="email"></label>
                        <input type = "text" name="email" placeholder="Your Email ?" autoComplete= "off" 
                            value = {email}
                            onChange = {(e)=> setEmail(e.target.value)}
                        />
                    </div>

                    <div> 
                        <label htmlFor ="password"></label>
                        <input type = "password" name="password" placeholder="Your Password ?" autoComplete= "off" 
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" name="signup" onClick={loginUser}>Login</button>
                    <NavLink to="/register">Create an Account</NavLink>
                </form>
        </>
    )
}

export default Signin;
