import "./App.css";
import Dashboard from "./components/pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Home from "./components/pages/home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
