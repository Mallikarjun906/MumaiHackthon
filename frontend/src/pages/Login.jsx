import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const navigate = useNavigate()

const handleSubmit = async (e) => {

e.preventDefault()
setLoading(true)

try{

const res = await axios.post(
"http://localhost:5001/api/auth/login",
{
email,
password
}
)

// backend response
const data = res.data

// store token
localStorage.setItem("token", data.token)

// get role
const role = data.user.role

// role based routes
const roleRoutes = {
farmer:"/farmer",
buyer:"/buyer",
dealer:"/dealer",
admin:"/admin"
}

// redirect
navigate(roleRoutes[role] || "/")

}catch(err){

alert(err.response?.data?.message || "Login failed")

}

setLoading(false)

}

return (

<div className="min-h-screen flex">

{/* LEFT HERO SECTION */}

<div className="hidden lg:flex lg:w-1/2 bg-green-600 text-white items-center justify-center p-12">

<div>

<div className="bg-green-500 rounded-xl px-6 py-3 mb-6 flex items-center gap-2">
🌱
</div>

<h1 className="text-4xl font-bold mb-3">
Smart Agri Market
</h1>

<p className="text-lg opacity-80">
Connecting farmers, buyers and dealers
</p>

</div>

</div>

{/* LOGIN FORM */}

<div className="flex-1 flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

<h2 className="text-3xl font-bold mb-2">
Welcome Back
</h2>

<p className="text-gray-500 mb-6">
Login to continue
</p>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
required
/>

<button
type="submit"
disabled={loading}
className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
>

{loading ? "Signing In..." : "Sign In →"}

</button>

</form>

<p className="text-center text-sm text-gray-500 mt-6">

Don't have an account?

<Link
to="/register"
className="text-green-600 font-semibold ml-1 hover:underline"
>
Create account
</Link>

</p>

</div>

</div>

</div>

)

}

export default Login