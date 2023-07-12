import React, { useState,useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Alert } from '../components/Alert';
import {useNavigate} from 'react-router-dom'
const initialValues = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

export const Register = () => {
  const [credentials, setCredentials] = useState(initialValues);
  const { isLoading, showAlert, displayAlert, registerUser, loginUser,user} = useAppContext();

  const toggleMember = () => {
    setCredentials({ ...credentials, isMember: !credentials.isMember });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, location, isMember } = credentials;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    
    const currentUser = { name, email, password, location };
    
    if (isMember) {
      await loginUser(currentUser);
    } else {
      await registerUser(currentUser);
    }
    
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate();
    useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        navigate('/home');
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);


  return (
    <div className="container ">
      <div className="row  vh-100 justify-content-center align-items-center">
        <div className="col-lg-4 col-md-8">
          <form onSubmit={handleSubmit} className="shadow p-4 mb-5 bg-body rounded">
            {showAlert && <Alert />}
            <h3>{credentials.isMember ? 'Login' : 'Sign Up'}</h3>

            {!credentials.isMember && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                pattern=".{8,}"
                required
                title="Password must be at least 8 characters long"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>

            {!credentials.isMember && (
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={credentials.location}
                  onChange={onChange}
                />
              </div>
            )}

            <div className="mb-3">
              <button type="submit" className="btn btn-primary me-3" disabled={isLoading}>
                {isLoading ? 'Please wait...' : 'Submit'}
              </button>
              <button type="button" onClick={toggleMember} className="btn btn-secondary">
                {!credentials.isMember ? 'Already a Member?' : 'Become a Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
