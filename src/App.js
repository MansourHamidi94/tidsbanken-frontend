// import logo from './logo.svg';
import './App.css';
import ControlPanel from "./components/controlPanel/ControlPanel.jsx"
import Login from './components/Login/Login.jsx';
import Calendar from "./components/calendar/Calendar"
import SignUp from './components/SignUp/Register';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ControlPanel />} />
          <Route path="/ControlPanel" element={<ControlPanel />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
