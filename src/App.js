// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import './components/Login/Login.css';
import SignUp from './components/SignUp/Register';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
