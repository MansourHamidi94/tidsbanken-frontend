// import logo from './logo.svg';
import './App.css';
import ControlPanel from "./components/controlPanel/ControlPanel.jsx"
import Login from './components/Login/Login.jsx';
import Calendar from "./components/calendar/Calendar.jsx"



function App() {
  return (
    <div className="App">
    <Calendar/>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ControlPanel />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
