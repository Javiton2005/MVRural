import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import login from "./pages/login";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/" element={<login/>} />
    </Routes>
  </BrowserRouter>
);

export default App;

