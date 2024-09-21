import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };
  const handletest = () => {
    navigate('/home');
  };
  const handleadmintest = () => {
    navigate('/Adminhome');
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Our App</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleSignIn}>Sign In</button>
        <button style={styles.button} onClick={handleSignUp}>Sign Up</button>
        <button style={styles.button} onClick={handletest}>test</button>
        <button style={styles.button} onClick={handleadmintest}>tAdmintestest</button>


      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'left',
    marginTop: '2rem',
  },
  buttonContainer: {
    marginTop: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    margin: '0 1rem',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default Main;
