import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header"; 
import Deservinginfo from "./components/Deservinginfo"; 
import Ngotable from "./components/Ngotable"; 
import Status from "./components/Status"; 
import Login from "./components/login";
// import Landing from "./components/Landing"; 
import User from "./components/User";
import DonateMore from "./components/DonateMore";
import BrandsPage from "./components/BrandsPage";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #ecf0f1;/
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/header" element={<Header />} />
          <Route path="/deserving" element={<Deservinginfo />} />
          <Route path="/ngotable" element={<Ngotable />} />
          <Route path="/status" element={<Status/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Header />} />
          <Route path="/User" element={<User/>} />
          <Route path="/donate-more" element={<DonateMore/>} />
          <Route path="/Brands" element={<BrandsPage/>} />
          {/* Add more routes here */}
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;