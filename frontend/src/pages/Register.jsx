import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){

const navigate = useNavigate()

const [user,setUser] = useState({
name:"",
email:"",
password:"",
role:"farmer"
})

const register = async () => {

try{

await axios.post(
"http://localhost:5000/api/auth/register",
user
)

alert("Registration Successful")

navigate("/")

}catch(err){

alert("Registration Failed")

}

}

return(

<div style={{textAlign:"center"}}>

<h2>User Registration</h2>

<input
placeholder="Name"
onChange={(e)=>setUser({...user,name:e.target.value})}
/>

<br/><br/>

<input
placeholder="Email"
onChange={(e)=>setUser({...user,email:e.target.value})}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setUser({...user,password:e.target.value})}
/>

<br/><br/>

<select
onChange={(e)=>setUser({...user,role:e.target.value})}
>

<option value="farmer">Farmer</option>
<option value="buyer">Buyer</option>

</select>

<br/><br/>

<button onClick={register}>
Register
</button>

</div>

)

}

export default Register