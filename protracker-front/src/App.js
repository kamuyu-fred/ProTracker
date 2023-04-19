import { Route, RouterProvider, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Projectdetails from "./components/Projectdetails";


function App() {
  return (
  <>

    <Navbar />
    <Sidebar />
    <Projectdetails />
    <Login />
  
    <div className="App">


      
    </div>

</>
  );
}

export default App;
