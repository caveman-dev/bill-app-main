import React ,{useState,useEffect,useRef}from "react";
import Login from "./components/Login";
import {BrowserRouter} from 'react-router-dom'
import WAVES from 'vanta/dist/vanta.waves.min.js'

function App() {
    const [vantaEffect, setVantaEffect] = useState(false)
    const myRef = useRef(null)
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(WAVES({
          el: '.App',
          shininess: 6.00
          // color: 0x4e62c0
        }))
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy()
      }
    }, [vantaEffect])
  return (<BrowserRouter>  
   <div  className="App">
      <Login/>
  </div>
    </BrowserRouter>
   
  );
}

export default App;
