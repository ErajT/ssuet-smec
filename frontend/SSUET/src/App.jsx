import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

import Header from "./components/Header"; 
import Deservinginfo from "./components/Deservinginfo"; 
import Ngotable from "./components/Ngotable"; 
import Status from "./components/Status"; 
import Landing from "./components/Landing"; 

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow: hidden;
  }
`;


const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #ecf0f1;/
`;

const App = () => {
  return (
    <>
    <GlobalStyle />
    <Router>
      
      <AppContainer>
        <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/header" element={<Header />} />
          <Route path="/deserving" element={<Deservinginfo />} />
          <Route path="/ngotable" element={<Ngotable />} />
          <Route path="/status" element={<Status/>} />
          {/* Add more routes here */}
        </Routes>
      </AppContainer>
    </Router>
     </>

  );
};

export default App;
