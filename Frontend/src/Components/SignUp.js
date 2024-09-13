import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
const SignUp = () =>{
    const [name,setName]= useState("");
    const [password,setPassword]= useState("");
    const [email,setEmail]= useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    const collectData = async ()=>{
        console.log(name,email,password);
        let result = await fetch('http://localhost:5000/register',{
            method: 'POST',
            body: JSON.stringify({name,email,password}),
            headers: {
                'Content-Type':'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result= await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result){
            navigate('/');
        }
    }
    return(
        <div className="divBox">
            <h1>Register</h1>
            <input className= "inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
            <input className= "inputBox" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
            <input className= "inputBox" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            <button onClick={collectData} className="appButton" type="button">SignUp</button>
            <h3>Have an account? <Link to="/login">Login</Link></h3>
        </div>
    )
}
export default SignUp;