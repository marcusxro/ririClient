import logo from './logo.svg';
import './App.css';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ForgotPw from './pages/ForgotPw';
import System from './pages/System';
import Profile from './pages/Profile';
import Inbox from './pages/Inbox';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/Register' element={<SignUp />} />
        <Route path='/ForgotPassword' element={<ForgotPw />} />
        <Route path='/System' element={<System />} />
        <Route path='/System/Inbox' element={<Inbox />} />
        <Route path='/System/Profile' element={<Profile />} />
{/* 
        <Route path='*'
          element={<NotFound />} /> */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
