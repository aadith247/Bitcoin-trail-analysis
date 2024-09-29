import { React, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { Footer } from "./footer";


import { useGoogleLogin } from '@react-oauth/google';

export function Signin() {
 
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  

  async function fun(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  email, password }),
      });

      if (response.ok) {
        const data = await response.json();
     
        // Assuming response contains a message indicating registration status
        if (data.success) {
          toast.success("User signed in successfully");
         

          setTimeout(() => {
            navigate("/mainPage");
          }, 1000);
          
         
        } else {
          toast.error( "This user doesn't exist in the data base.");
        }
      } else {
        toast.error("failed to fetch details/User doesn't exist");
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  }

 
  return (
    <div>
     
      <form className="w" onSubmit={fun}>
<section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center p-8 md:p-16 bg-gray-50">
      <div className="md:w-1/2 max-w-lg">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center md:text-left mb-6">

          <label className="text-2xl ml-[28%]   text-gray-700">Sign in with</label>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
          <div class="px-6  sm:px-0 max-w-sm">
    <button type="button" onClick={()=>login()} className="text-white w-full ml-[28%]  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-lg px-5 py-3 text-center inline-flex items-center justify-between mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
</div>
           
              </div>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
           
           
          </div>
        </div>
        <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-semibold text-gray-600">Or</p>
        </div>
        <input onChange={(e) => setEmail(e.target.value)} required className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4" type="text" placeholder="Email Address" />
        <input  onChange={(e) => setPassword(e.target.value)} required className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4" type="password" placeholder="Password" />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-gray-600 hover:text-gray-700 cursor-pointer">
            <input className="mr-2" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a className="text-blue-600 hover:text-blue-700 hover:underline" href="#">Forgot Password?</a>
        </div>
        <div className="text-center md:text-left">
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Login</button>
        </div>
        <div className="mt-6 font-semibold text-sm text-gray-600 text-center md:text-left">
          Don't have an account? <a onClick={() => navigate("/signup")} className="text-red-600 hover:underline" href="#">Register</a>
        </div>
      </div>
    </section>
    </form> 
        <ToastContainer />
        <Footer/>
      </div>
  );
}






