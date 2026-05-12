import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Scanner from "./Scanner";
import Login from "./Login";
import './App.css'
import Dashboard from "./Dashboard";
import Register from "./Register";
import Library from "./CardLibrary";
import Navbar from "./Navbar";

function AppFormat() {
  const user = localStorage.getItem('MeowthGuardUser');

  return (
    <div className="appContainer">
            <Navbar/>
      <div className="header">
        <h1 className="mainTitle">Meowth <span className="highlightText">Guard</span></h1>
        <p className="subtitle">Your AI Powered Card Authenticator</p>
      </div>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/library" element={<Library />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppFormat />
    </BrowserRouter>
  )
}

export default App