import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { matchPath } from "react-router-dom";

import Deservinginfo from "./components/Deservinginfo"; 
import Ngotable from "./components/Ngotable"; 
import Status from "./components/Status"; 
import Login from "./components/login";
import Landing from "./components/Landing"; 
import User from "./components/User";
import DonateMore from "./components/DonateMore";
import BrandsPage from "./components/BrandsPage";
import SignUp from "./components/Signup";
import AdminSidebar from "./components/AdminSidebar";
import UnauthorizedAccess from "./components/UnauthorizedAccess";
import RoleAuthorizer from "./components/RoleAuthorizer";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow: auto;
  }
`;

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background-color: #ecf0f1;
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const AppLayout = () => {
  const location = useLocation();

  const showAdminSidebar = matchPath("/Brands", location.pathname);

  return (
    <AppContainer>
      {showAdminSidebar && <AdminSidebar />}
      <MainContent>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<UnauthorizedAccess />} />

          <Route element={<RoleAuthorizer allowedRole="ngo" />}>
          <Route path="/deserving" element={<Deservinginfo />} />
          <Route path="/ngotable" element={<Ngotable />} />
          <Route path="/status" element={<Status />} />
          <Route path="/brands" element={<BrandsPage />} />
          </Route>

          <Route element={<RoleAuthorizer allowedRole="user" />}>
          <Route path="/user" element={<User />} />
          <Route path="/donate-more" element={<DonateMore />} />
          </Route>

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppLayout />
      </Router>
    </>
  );
};

export default App;
