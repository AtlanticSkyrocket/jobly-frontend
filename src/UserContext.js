import React, { createContext, useContext, useEffect, useState } from 'react';
import JoblyApi from './api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('joblyToken') || null);

  // Set User in state
  const setUserValue = (user) => setUser(user);

  const applyToJob = async (jobId) => {
    try {
      const applicationRes = await JoblyApi.applyToJob(user.username, jobId);
      if (applicationRes === jobId) {
        setApplications([...applications, jobId]);
        return true;
      }
    } catch (error) {
      console.error('Application error:', error);
    }
    return false;
  };

  const login = async (formData) => {
    try {
      const tokenRes = await JoblyApi.loginUser(formData);
      if (tokenRes !== 'error') {
        JoblyApi.token = tokenRes;
        setToken(tokenRes);
        localStorage.setItem('joblyToken', tokenRes);
        localStorage.setItem('joblyUsername', formData.username);
  
        const userRes = await JoblyApi.getCurrentUser(formData.username);
        setUser({ username: formData.username, applications: userRes.applications });
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = () => {
    JoblyApi.token = null;
    setToken(null);
    setUser(null);
    setApplications([]);
    localStorage.removeItem('joblyToken');
    localStorage.removeItem('joblyUsername');
  };

  const singUpUser = async (formData) => {
    try {
      const tokenRes = await JoblyApi.registerUser(formData);
      if (tokenRes !== 'error') {
        JoblyApi.token = tokenRes;
        setToken(tokenRes);
        localStorage.setItem('joblyToken', tokenRes);
        localStorage.setItem('joblyUsername', formData.username);
  
        const userRes = await JoblyApi.getCurrentUser(formData.username);
        setUser({ username: formData.username, applications: userRes.applications });
        return true;
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
    return false;
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('joblyToken', token);
    } else {
      localStorage.removeItem('joblyToken');
    }
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const userRes = await JoblyApi.getCurrentUser(storedUsername);
          setUser({ username: storedUsername, applications: userRes.applications });
        } catch (error) {
          console.error("Error fetching user data with token:", error);
          logout();
        }
      }

      const storedToken = localStorage.getItem('joblyToken');
      const storedUsername = localStorage.getItem('joblyUsername');
      if (storedToken && storedUsername) {
        JoblyApi.token = storedToken;
        setToken(storedToken);
        fetchUserData();
      }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const userRes = await JoblyApi.getCurrentUser(user.username);
        setApplications(userRes.applications);
      }
    };
    getUserData();
  }, [token, user]);

  return (
    <UserContext.Provider value={{ user, setUser: setUserValue, applications, applyToJob, login, logout, singUpUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
