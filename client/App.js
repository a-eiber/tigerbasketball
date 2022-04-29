import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AllStories from './components/AllStories';
import Footer from './components/Footer';
import Schedule from './components/Schedule';
import Standings from './components/Standings';
import Results from './components/Results';
import Register from './components/Register';
import NewTeam from './components/Dashboard/NewTeam';
import NewGame from './components/Dashboard/NewGame';
import AdminStories from './components/Dashboard/AdminStories';
import RegisterNewAdmin from './components/Dashboard/RegisterNewAdmin';

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/news" element={<AllStories />} />
            <Route exact path="/schedule" element={<Schedule />} />
            <Route exact path="/standings" element={<Standings />} />
            <Route exact path="/results" element={<Results />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/dashboard/new-team" element={<NewTeam />} />
            <Route exact path="/dashboard/new-game" element={<NewGame />} />
            <Route
              exact
              path="/dashboard/new-story"
              element={<AdminStories />}
            />
            <Route
              exact
              path="/dashboard/new-admin"
              element={<RegisterNewAdmin />}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
