import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Sprout, Mail, Lock, User, ArrowRight, Wheat, ShoppingCart } from "lucide-react";

const Register = () => {

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("farmer");
const [loading,setLoading] = useState(false);

const navigate = useNavigate();

const handleSubmit = async (e) => {

e.preventDefault();
setLoading(true);

try{

await axios.post(
"http://localhost:5000/api/auth/register",
{ name,email,password,role }
);

alert("OTP sent to your email");

// go to OTP verification page
navigate("/verify-otp", { state: { email } });

}catch(err){

alert(err.response?.data?.message || "Registration failed");

}

setLoading(false);

};

return (

<div className="min-h-screen flex">

{/* LEFT HERO */}

<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 items-center justify-center p-12 relative overflow-hidden">

<div className="absolute inset-0 opacity-10">

{[...Array(20)].map((_,i)=>(
<div
key={i}
className="absolute rounded-full bg-white/20"
style={{
width:Math.random()*100+50,
height:Math.random()*100+50,
top:`${Math.random()*100}%`,
left:`${Math.random()*100}%`
}}
/>
))}

</div>

<motion.div
initial={{opacity:0,x:-30}}
animate={{opacity:1,x:0}}
className="relative z-10 text-center text-white"
>

<div className="bg-white/20 p-4 rounded-2xl inline-block mb-6">
<Sprout className="h-12 w-12"/>
</div>

<h1 className="text-4xl font-bold mb-4">
Join the Revolution
</h1>

<p className="text-lg opacity-80 max-w-md">
Start trading crops and growing your agri business today
</p>

</motion.div>

</div>

{/* RIGHT FORM */}

<div className="flex-1 flex items-center justify-center p-6 md:p-12">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="w-full max-w-md"
>

<h2 className="text-3xl font-bold mb-2">
Create Account
</h2>

<p className="text-gray-500 mb-8">
Join Smart Agri Market today
</p>

<form onSubmit={handleSubmit} className="flex flex-col gap-4">

{/* NAME */}

<div className="relative">

<User className="absolute left-3 top-3 text-gray-400"/>

<input
type="text"
placeholder="Full name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
required
/>

</div>

{/* EMAIL */}

<div className="relative">

<Mail className="absolute left-3 top-3 text-gray-400"/>

<input
type="email"
placeholder="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
required
/>

</div>

{/* PASSWORD */}

<div className="relative">

<Lock className="absolute left-3 top-3 text-gray-400"/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-green-500 outline-none"
required
/>

</div>

{/* ROLE */}

<div>

<p className="text-sm font-medium mb-2">
I am a
</p>

<div className="grid grid-cols-2 gap-3">

{[
{value:"farmer",label:"Farmer",icon:Wheat},
{value:"buyer",label:"Buyer",icon:ShoppingCart}
].map((r)=>{

const Icon = r.icon

return(

<button
key={r.value}
type="button"
onClick={()=>setRole(r.value)}
className={`flex items-center gap-2 p-3 rounded-lg border-2 transition ${
role===r.value
? "border-green-600 bg-green-50 text-green-600"
: "border-gray-300 text-gray-500 hover:border-green-400"
}`}
>

<Icon className="h-5 w-5"/>

<span className="text-sm font-medium">
{r.label}
</span>

</button>

)

})}

</div>

</div>

{/* SUBMIT */}

<button
type="submit"
disabled={loading}
className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 mt-2"
>

{loading ? "Creating..." : (
<>
Create Account
<ArrowRight className="h-4 w-4"/>
</>
)}

</button>

</form>

<p className="text-center text-sm text-gray-500 mt-6">

Already have an account?

<Link to="/login" className="text-green-600 font-semibold ml-1 hover:underline">
Sign in
</Link>

</p>

</motion.div>

</div>

</div>

)

};

export default Register;