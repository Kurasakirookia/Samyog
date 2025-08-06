
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nvabar'; // Double-check the spelling: "Nvabar"
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage'
import EventIdPage from './pages/EventIdPage';
import AboutUsPage from './pages/AboutUsPage';
import AdminDashboard from "./admin/AdminDashboard"
import AddEvent from "./admin/AddEvent"
import ManageEvents from './admin/ManageEvent';
import UpdateEvent from './admin/UpdateEvent';
import AddTeacher from './admin/AddTeacher';
import UpdateTeacher from './admin/UpdateTeacher';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageTeachers from './admin/ManageTeachers'
import AdminLogin from './components/AdminLogin';
import AdminRoute from './components/AdminRoute';
import UserRegister from './components/UserRegister';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Routes will go here later */}
        <Route path='/' element={<HomePage/>}/>
        <Route path='/events' element={<EventPage/>}/>
        <Route path='/events/:id' element={<EventIdPage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
       
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/events/add" element={<AddEvent />} />
          <Route path="/admin/events/:id" element={<UpdateEvent />} />
          <Route path="/admin/teachers" element={<ManageTeachers />} />
          <Route path="/admin/teachers/add" element={<AddTeacher />} />
          <Route path="/admin/teachers/:id" element={<UpdateTeacher />} />
        </Route>
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/signUp" element={<UserRegister/>} />


        
      </Routes>

      {/* Toast container to show toasts anywhere in the app */}
      <ToastContainer
        position="top-right"       // where the toast shows (top-left, bottom-right, etc.)
        autoClose={3000}           // closes automatically after 3 seconds
        hideProgressBar={false}    // shows progress bar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"              // or "light"
      />
    </Router>
  );
}

export default App;
