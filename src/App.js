import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./firebase/AuthContext"
import NavBar from './components/NavBar'
import Home from "./components/Home"
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import PostFlat from './components/PostFlat'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <div>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/postflat" element={<PostFlat />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
