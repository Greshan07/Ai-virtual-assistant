import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios"
//import { set } from "mongoose";



function SignUp() {
    const [showPassword,setshowPassword]=useState(false);
    const {serverUrl} = useContext(UserDataContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleSignUp =async(e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                name,email,password
            },{withCredentials: true});
            console.log(result.data);
            setLoading(false);
        } catch (error) {
          setLoading(false);

            console.log(error);
            setErr(error.response.data.message);
        }
    }
  return (
    <div 
      className='w-full h-[100vh] bg-cover flex justify-center items-center' 
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur-xl shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] rounded-2xl border border-white/20 p-6' onSubmit={handleSignUp}>
        
        <h1 className='text-white text-[30px] font-semibold'>
          Register to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input 
          type="text" 
          placeholder='Enter your Name'
          className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setName(e.target.value)} value={name}
        />

        <input 
          type="email" 
          placeholder='Email'
          className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email}
        />
   <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative" >
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder='Password'
          className='w-full h-full outline-none  bg-transparent placeholder-gray-300 px-[20px] py-[10px] rounded-full ' required onChange={(e) => setPassword(e.target.value)} value={password}
        />
        {!showPassword && 
          <IoEye className="absolute top-[20px] right-[20px] w-[25px] h-[25px] text-[white]" onClick={() => setshowPassword(true)}  />
        }
        {showPassword && 
          <IoEyeOff className="absolute top-[20px] right-[20px] w-[25px] h-[25px] text-[white]" onClick={() => setshowPassword(false)}  />
        }
      </div>
      { err.length >0 && <p className='text-red-500 text-sm'>*{err}</p> }
        <button 
          type="button"
          className='min w-[150px] h-[60px] bg-blue-500 mt-[30px] text-white rounded-full text-[18px]'
          onClick={handleSignUp} disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p className='text-white cursor-pointer' onClick={() => navigate('/signin')}>Already have an account? <span className='text-blue-400 underline'>Sign In</span></p>
        
      </form>
    </div>
  )
}

export default SignUp;
