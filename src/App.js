// import logo from './logo.svg';
import './App.css';
import ControlPanel from "./components/controlPanel/ControlPanel.jsx"
import Login from './components/Login/Login.jsx';
import Calendar from "./components/calendar/Calendar"
import SignUp from './components/SignUp/Signup';
import Profile from './components/profile/Profile';
import Admin from "./components/admin/Admin";
import VacationRequest from './components/vacationRequest/VacationRequest.jsx';

import { Provider } from 'react-redux';
import store from './redux/store'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
            <Route path="/Profile" element={<Profile />} />
            <Route path='/vacation-request' element={<VacationRequest/>}/>
            <Route path="/Admin" element={<Admin/>} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
export default App;
