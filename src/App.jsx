import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Payments from './pages/Payments';
import Attendance from './pages/Attendance';
import Trainers from './pages/Trainers';
import Gallery from './pages/Gallery';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import ToastContainer from './components/Toast';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import UserDashboard from './pages/UserDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import UserCourses from './pages/UserCourses';

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />
          <Route path="payments" element={<Payments />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings darkMode={darkMode} toggleTheme={toggleTheme} />} />
        </Route>

        {/* Student/User Routes */}
        <Route path="/user" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="courses" element={<UserCourses />} />
          <Route path="settings" element={<Settings darkMode={darkMode} toggleTheme={toggleTheme} />} />
        </Route>

        {/* Trainer Routes */}
        <Route path="/trainer" element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        }>
          <Route index element={<TrainerDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="settings" element={<Settings darkMode={darkMode} toggleTheme={toggleTheme} />} />
        </Route>

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
