import React, {useState} from 'react'
import {useHistory } from 'react-router-dom';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name:"", email:"", password:"", cpassword:""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();
        const { name, email, password, cpassword} = user;
        
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, cpassword
            })            
        })


        const data = await res.json();

        console.log(data);

        if(data.message === "user registered succesfully"){
            window.alert("valid Registeration");
            console.log("valid Registeration");
            history.push("/Signin");
        }else{
            window.alert("Invalid Registeration");
            console.log("Invalid Registeration");
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <div className = "signup">
                <form method="POST">
                    <div> 
                        <label htmlFor ="name"></label>
                        <input type = "text" name="name" placeholder="Your Name " autoComplete= "off" 
                            value = {user.name}
                            onChange = {handleInputs} 
                        />
                    </div>

                    <div> 
                        <label htmlFor ="email"></label>
                        <input type = "text" name="email" placeholder="Your Email " autocpmlete= "off" 
                            value = {user.email}
                            onChange = {handleInputs} 
                        />
                    </div>

                    <div> 
                        <label htmlFor ="password"></label>
                        <input type = "password" name="password" placeholder="Your Password " autocpmlete= "off" 
                            value = {user.password}
                            onChange = {handleInputs} 
                        />
                    </div>

                    <div> 
                        <label htmlFor ="cpassword"></label>
                        <input type = "password" name="cpassword" placeholder="Confirm Password " autocpmlete= "off" 
                            value = {user.cpassword}
                            onChange = {handleInputs} 
                        />
                    </div>
                    <div className='register'>
                    <button type="submit" name="signup" onClick = {PostData}>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;
