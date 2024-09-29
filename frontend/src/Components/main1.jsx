import Developer from "./Developer"
import graphImg from "../assets/ghg.png"
import VideoPlayer from './VideoPlayer'
import { Footer } from "./footer"
import { useNavigate } from "react-router-dom"

export function Mainpage()
{
  const navigate=useNavigate();
    return(
        <div>
        <div class="main" >
          <div className="mt-12">
            <br/>
            <br/>
      <h1 class="heading">A <span className="text-slate-500">tool</span> to <span className="text-slate-500">trace</span> and unmask</h1>
      <h1 >anonymized <span className="text-slate-500"> crypto</span> transactions</h1>
      </div>
     
      <br/>
      <p id="mainText">
       An ultimate solution to find the end receiver of a cryptocurrency transaction
        <br />
       By following the cryptocurrency transaction trial associated with a wallet ID
      </p>
      <br/>
      
      <div class="btn" >
        <ul>
          <li id="get"><button onClick={()=>navigate("/signin")}>Sign In</button></li>
          <li id="watch"><button onClick={()=>navigate("/signup")}>Register</button> </li>
        </ul>
      </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    
    <div className="mt-40  ">
                <p  className="text-4xl text-center text-black-500 ">
                           Graphical analysis of transactions :
                </p>
                <div className="flex justify-center mt-5 mb-10">
                    <div className="relative max-w-8xl p-4 bg-white rounded-lg shadow-lg border border-gray-300">
                        <VideoPlayer />
                    </div>
                </div>
            </div>
    <br/>
    <br/>
    <p className="text-5xl text-black-500 flex align-center justify-center">Our developers</p>
    <br/>
    <br/>

      <Developer/>
      <br/>
      <br/>
      <br/>
      

      
      <Footer/>

      
        </div>
      

    )
}