import { createContext, useContext, useState, useEffect } from 'react';
import { showToast } from '../components/Toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const stored = localStorage.getItem('rhythm_enrolled_courses');
    return stored ? JSON.parse(stored) : [];
  });

  // Check localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('rhythm_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('rhythm_auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const enrollInCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      const updated = [...enrolledCourses, courseId];
      setEnrolledCourses(updated);
      localStorage.setItem('rhythm_enrolled_courses', JSON.stringify(updated));
      showToast('Enrolled successfully!', 'success');
      return true;
    }
    return false;
  };

  const login = async (email, password, role) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Hardcoded mock validation based on requirements
    if (
      (role === 'admin' && email === 'admin@gmail.com') ||
      (role === 'student' && email === 'student@gmail.com') ||
      (role === 'trainer' && email === 'trainer@gmail.com')
    ) {
      // In a real app, password would be checked too. We'll accept any password for mock here if it's not empty.
      if (password.length > 0) {
        let name = '';
        if (role === 'admin') name = 'Admin User';
        if (role === 'student') name = 'Arjun Das';
        if (role === 'trainer') name = 'Neha Kapoor';

        const userData = { email, role, name, token: `mock-jwt-${role}` };
        setUser(userData);
        localStorage.setItem('rhythm_auth_user', JSON.stringify(userData));
        showToast('Login successful! Redirecting...', 'success');
        setIsLoading(false);
        return true; // success
      }
    }
    
    setIsLoading(false);
    showToast('Invalid email, password, or role mismatch.', 'error');
    return false; // failure
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rhythm_auth_user');
    // Only clear session data, usually we keep their course progress for when they log back in
    showToast('You have been logged out.', 'success');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, enrolledCourses, enrollInCourse }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
