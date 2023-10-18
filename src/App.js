// import logo from './logo.svg';
import './App.css';
import Calendar from "./components/calendar/Calendar.jsx"
import ControlPanel from "./components/controlPanel/ControlPanel.jsx"
import Login from './components/login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile.jsx';
import VacationRequest from './components/vacationRequest/VacationRequest.jsx';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'

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
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/vacation-request' element={<VacationRequest/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
