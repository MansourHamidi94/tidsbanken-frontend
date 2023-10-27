import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ControlPanel from "../components/controlPanel/ControlPanel.jsx"
import Calendar from "../components/calendar/Calendar"
import Profile from '../components/Profile/Profile.jsx';
import Admin from "../components/admin/Admin";
import VacationRequest from '../components/vacationRequest/VacationRequest';
//import ProtectedRoute from '../routes/protectedRoute';
//         <ProtectedRoute path="/admin" component={Admin} roles={['admin', 'manager']} />


const AppRoutes = () => {
  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<ControlPanel />} />
          <Route path="/" element={<ControlPanel />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path='/vacation-request' element={<VacationRequest/>}/>
          <Route path="/Admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
  );
};

export default AppRoutes;