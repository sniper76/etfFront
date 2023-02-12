import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Stock from "./Stock";
import StockCompare from "./StockCompare";

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/etf" element={<App />} />
      <Route
        path="/"
        element={<Stock title="Stock" description="배당주보기(연결,연간)" />}
      />
      <Route
        path="/compare"
        element={
          <StockCompare title="StockCompare" description="주식 종가 비교" />
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Root;
