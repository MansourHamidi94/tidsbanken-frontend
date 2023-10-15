// import logo from './logo.svg';
import './App.css';
import Calendar from "./components/calendar/Calendar.jsx"
import ControlPanel from "./components/controlPanel/ControlPanel.jsx"
import Login from './components/login/Login.jsx';
import SignUp from './components/SignUp/Register';
import Profile from './components/Profile/Profile.jsx';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import {store} from "./redux/Store"
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>

      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ControlPanel />} />
          <Route path="/ControlPanel" element={<ControlPanel />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
