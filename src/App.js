// import logo from './logo.svg';
import './App.css';
import Login from '/Users/mansourhamidi/Documents/Experis/tidsbanken-frontend/src/components/Login/Login.jsx';
import Calendar from "./components/calendar/Calendar.jsx"
import SignUp from './components/SignUp/Register';
import Profile from '/Users/mansourhamidi/Documents/Experis/tidsbanken-frontend/src/components/Profile/Profile.jsx'
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
