import React, { useEffect } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';



function App() {

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
          <Route path="/create-profile" element={<PrivateRoute component={ProfileForm} />} />
          <Route path="/edit-profile" element={<PrivateRoute component={ProfileForm} />} />
          <Route path="/add-experience" element={<PrivateRoute component={AddExperience} />} />
          <Route path="/add-education" element={<PrivateRoute component={AddEducation} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
