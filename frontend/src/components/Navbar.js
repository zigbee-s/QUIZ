import Reac, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from '../App';


const Navbar = () => {
    const {state, dispatch} = useContext(UserContext); 

    const getState = async()=> {
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
          
          if(!response.status === 200){     
              const error = new Error(response.error); 
              throw error;  
          }
          
          if(data.userState){
            console.log("here");
            dispatch({type: "USER", payload: true});
          }
      } catch (error) {
        console.log(error);
      }
    }

    getState();

    const RenderMenu = () =>{
    
        if(state){
            return (
                    <div className='nav' style={{alignItems: "right"}}>
                        <NavLink to="/" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px", margin: "10px", borderRadius:"4px"}}>Home</NavLink>
                        <NavLink to="/quiz" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px",  margin: "10px", borderRadius:"4px" }}>Quiz</NavLink>
                        <NavLink to="/signout" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px",  margin: "10px", borderRadius:"4px" }}>Signout</NavLink>
                    </div>
                    )
        }else {
            return (
                    <div className='nav' style={{alignItems: "right"}}>
                        <NavLink to="/" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px", margin: "10px", borderRadius:"4px"}}>Home</NavLink>
                        <NavLink to="/signin" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px", margin: "10px", borderRadius:"4px" }}>Sign in</NavLink>
                        <NavLink to="/register" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px",  margin: "10px", borderRadius:"4px" }}>Sign up</NavLink>
                        <NavLink to="/quiz" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px",  margin: "10px", borderRadius:"4px" }}>Quiz</NavLink>
                        <NavLink to="/signout" style={{fontSize: "15px", fontWeight: "600", textTransform: "uppercase", display:"inline-block", textAlign:"center", backgroundColor:"#04AA6D", color:"white",padding: "5px 12px",  margin: "10px", borderRadius:"4px" }}>Signout</NavLink>
                    </div>
                    )
            }
        }

        return (
            <RenderMenu />
        )
}

export default Navbar;
