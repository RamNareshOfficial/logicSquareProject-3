import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Counting from "./components/Counting";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let localStorageData = localStorage.getItem("data");
    if (!localStorageData) {
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      setData(JSON.parse(localStorageData));
    }
  }, []);

  const saveEmployeeData = (newdata,index) => {
    let localStorageData = JSON.parse(localStorage.getItem("data"));
    let data = [];

    data.push(newdata);
    if (!localStorageData) {
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      if(index){
        let newDataArr = JSON.parse(JSON.stringify(localStorageData));
        newDataArr[index] = newdata;
        setData(newDataArr);
        localStorage.setItem("data", JSON.stringify(newDataArr));

      }else{
        localStorageData.push(newdata);
        setData(localStorageData)
        localStorage.setItem("data", JSON.stringify(localStorageData));
      }
    }
  };
  return (
    <>
      <Navbar />
      <Counting data={data} saveEmployeeData={saveEmployeeData} />
    </>
  );
}

export default App;
