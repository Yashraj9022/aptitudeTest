import {useState} from 'react';
import './Home.css';
import Login from './Login';
import Register from './Register';
import './responsive.css'
const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
   const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    // <div className="home-container">
    //   <h1>Aptitude Test App</h1>
    //   <button onClick={() => navigate('/login')} className="btn">Login</button>
    //   <button onClick={() => navigate('/register')} className="btn">Register</button>
    // </div>

   
 <> 

    <nav>
        <div className="logo">MyTestApp</div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Disclaimer</a></li>
        </ul>
        <div className="auth-buttons">
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button  onClick={() => setShowRegister(true)}>Register</button>
        </div>

    </nav>

    <header>
        <div className="hero-text">
            <h1>Welcome to My Online Test Platform</h1>
            <p>Prepare. Practice. Perform!</p>
        </div>
    </header>
            {showLogin && (
        <div className="modal">
          <div className="modal-content1">
            <span onClick={() => setShowLogin(false)} className="close-btn2">
              &times;
            </span>
            <Login setToken={setToken} />
          </div>
        </div>
      )}

        {showRegister && (
        <div className="modal">
          <div className="modal-content1">
            <span onClick={() => setShowRegister(false)} className="close-btn2">
              &times;
            </span>
            <Register/>
          </div>
        </div>
      )}
    <section className="content">
        <h2>Why Choose Us?</h2>
        <p>We provide the best platform to practice aptitude, reasoning, and competitive exam questions with instant results and performance analytics.</p>
    <div className="register-section">
            <button className="big-register-btn" onClick={() => setShowRegister(true)}>Register Now</button>
        </div>
    </section>
    
    <footer>
        <p>&copy; 2025 MyTestApp. All Rights Reserved.</p>
    </footer>

</>

  );
};

export default Home;
