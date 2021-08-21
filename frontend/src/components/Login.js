import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const Login = () => {

    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        // Post request to signin in backend, for verification
        try{
            const res = await fetch('/signin', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email, password
                })
            })
    
            const data = await res.json();
    
            //Confirming the success of 
            if (data.message === "Succesfull Login") {
                
                //Changing USER to true, to switch navbar accordingly
                dispatch({ type: "USER", payload: true });

                window.alert("Login Succesfull");
                history.push("/");
            }
            else {
                window.alert(data.error);
            }
        }catch(error){
            console.log(error);
        }        
    }
    
    return (
        <>
            <h1>Login</h1>
            <form>
                <div className='container'>
                    <label htmlFor="email"></label>
                    <input type="text" name="email" placeholder="Enter Email " autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='container'>
                    <label htmlFor="password"></label>
                    <input type="password" name="password" placeholder="Enter Password " autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='register'>
                    <button type="submit" name="signup" onClick={loginUser}>Login</button>
                    <br />
                    <NavLink to="/register" style={{ marginLeft: "17px" }}>Create an Account</NavLink>
                </div>
            </form>
        </>
    )
}

export default Login;
