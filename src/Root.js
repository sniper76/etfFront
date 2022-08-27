import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Stock from "./Stock";

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/etf" element={<App />} />
      <Route
        path="/"
        element={<Stock title="Stock" description="배당주보기(연결,연간)" />}
      />
    </Routes>
  </BrowserRouter>
);

export default Root;
