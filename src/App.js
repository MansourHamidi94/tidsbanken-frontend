// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Calendar from "./components/calendar/Calendar.jsx"
import SignUp from './components/SignUp/Register';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
