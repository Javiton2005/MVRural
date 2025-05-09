import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Register from "./pages/Register";
import Villages from "./pages/Villages";
import WorkingOnIt from "./pages/constructingPage";


const App = () => (
  <BrowserRouter>
        <ToastContainer />

    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/notfound" element={<NotFound/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Villages" element={<Villages/>} />
      <Route path="*" element={<WorkingOnIt/>} />
    </Routes>
  </BrowserRouter>
);

export default App;

