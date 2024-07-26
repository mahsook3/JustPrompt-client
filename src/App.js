import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import Home from './pages/Home.page';
import Login from './pages/Login.page';
import PrivateRoute from './pages/PrivateRoute.page';
import Signup from './pages/Signup.page';
import MovieContainer from './pages/MovieContainer.page';
import PublicPlaylist from './pages/PublicPlaylist.page';
import Error from './pages/Error.page';
import LandingPage from './pages/LandingPage';
import Test from './pages/Test';
import DashBoard from './pages/DashBoard';
import Preview from './pages/Preview';
import PreviewInNewTab from './pages/PreviewInNewTab'; // Import the new component
import Builder from './pages/Builder';
import CompanyHtmlContent from './pages/CompanyHtmlContent';
import './tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/publicplaylist/:mailid" element={<PublicPlaylist />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/test" element={<Test />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/preview-in-new-tab" element={<PreviewInNewTab />} /> {/* Add the new route */}
          <Route path="/d/:workplaceUrl" element={<CompanyHtmlContent />} /> {/* Updated to use `element` */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/movie/:imdbID" element={<MovieContainer />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
