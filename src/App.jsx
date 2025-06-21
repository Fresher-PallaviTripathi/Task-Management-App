import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null); // 'admin' or 'employee'
  const [loggedInUserData, setLoggedInUserData] = useState(null); // employee data
  const [userData, SetUserData] = useContext(AuthContext); // context for registered employees

  // Load user from localStorage on page load
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        setUser(userData.role);
        if (userData.role === 'employee') {
          setLoggedInUserData(userData.data);
        }
      }
    } catch (error) {
      console.error('Failed to parse loggedInUser from localStorage', error);
    }
  }, []);

  // Handle login logic
  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
    } else if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        );
      } else {
        alert('Invalid Credentials');
      }
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}

      {user === 'admin' && (
        <AdminDashboard
          changeUser={(value) => {
            setUser(value);
            localStorage.removeItem('loggedInUser');
          }}
        />
      )}

      {user === 'employee' && (
        <EmployeeDashboard
          data={loggedInUserData}
          changeUser={(value) => {
            setUser(value);
            localStorage.removeItem('loggedInUser');
          }}
        />
      )}
    </>
  );
};

export default App;
