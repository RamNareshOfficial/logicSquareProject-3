import './App.css';

import React from "react";
import Header from './content/Header';
import TextForm from './content/TextForm';
import About from './content/About';
import AlrtBtn from './content/AlrtBtn';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      showAlert("Dark mode is enabled", "success");
      document.body.style.backgroundColor = "#193364";
      document.body.style.color = "white";
    }
    else {
      setMode("light");
      showAlert("light mode is enabled", "success");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "#193364";

    }
  }
  return (
  
    <> 
    <Router>
        <Header title="TechRambo" mode={mode} toggleMode={toggleMode} />
        <AlrtBtn alert={alert} />
        <div className="container my-3">
        <Routes>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze" mode={mode} />}/>
        </Routes>

      </div>
    </Router>
    </>
  )
}




export default App;
