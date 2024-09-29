import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Head1 } from './Components/Head1.jsx';
import { Mainpage } from './Components/main1.jsx';
import { Signin } from './Components/Signin.jsx';
import { Footer } from './Components/footer.jsx';
import { Signup } from './Components/Signup.jsx';
import { MainPage } from './Components/mainPage.jsx';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Head1 />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/mainPage" element={<MainPage/>}/>
      </Routes>
      
      
    </BrowserRouter>
  );
}   

export default App;
