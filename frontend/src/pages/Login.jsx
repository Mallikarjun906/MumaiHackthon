import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const login = async () => {

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{email,password}
)

localStorage.setItem("token",res.data.token)

const role = res.data.role

if(role==="farmer"){
navigate("/farmer")
}

if(role==="buyer"){
navigate("/buyer")
}

if(role==="dealer"){
navigate("/dealer")
}

if(role==="admin"){
navigate("/admin")
}

}catch(err){

alert("Login Failed")

}

}

return(

<div style={{textAlign:"center"}}>

<h2>Agri Market Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={login}>Login</button>

<br/><br/>

<Link to="/register">
Create Account
</Link>

</div>

)

}

export default Login