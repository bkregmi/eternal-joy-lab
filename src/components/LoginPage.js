import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Please check your username and password.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
          <div className="panel panel-default" style={{ marginTop: '50px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: 'none' }}>
            <div className="panel-heading" style={{ backgroundColor: '#fff', borderBottom: '2px solid #ff9933', borderRadius: '15px 15px 0 0', padding: '20px' }}>
              <h3 className="panel-title text-center" style={{ color: '#c92200', fontWeight: 'bold', fontSize: '1.8em', fontFamily: "'Georgia', serif" }}>Login</h3>
            </div>
            <div className="panel-body" style={{ padding: '30px' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={{ color: '#555' }}>Username</label>
                  <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus style={{ borderRadius: '8px' }} />
                </div>
                <div className="form-group">
                  <label style={{ color: '#555' }}>Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ borderRadius: '8px' }} />
                </div>
                {error && <div className="alert alert-danger" style={{ borderRadius: '8px', padding: '10px', marginTop: '15px' }}>{error}</div>}
                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '20px', backgroundColor: '#ff9933', borderColor: '#ff9933', borderRadius: '25px', padding: '10px', fontWeight: 'bold', fontSize: '1.1em' }}>
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <p className="text-center" style={{ color: '#888', marginTop: '20px' }}>
            Authorized access only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;