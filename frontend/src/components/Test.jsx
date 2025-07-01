import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Test.css';
import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';
import './responsive.css'

const Test = ({ token, handleLogout }) => {
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [profile, setProfile] = useState({ username: '', email: '', profile_image: '' });
  const [showDropdown, setShowDropdown] = useState(false);

  const [resultData, setResultData] = useState(null);  // <-- Added for result data
  const [showModal, setShowModal] = useState(false);    // <-- Modal visibility

  // const navigate = useNavigate();
  const backendBaseURL = "http://localhost:8000";

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  // Fetch questions
  useEffect(() => {
    axios.get('http://localhost:8000/api/aptitude-questions/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setQuestions(res.data.questions);
      setUserAnswers(new Array(res.data.questions.length).fill(null));
    });
  }, [token]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOptionClick = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    const answersPayload = {};
    questions.forEach((q, index) => {
      answersPayload[q.id] = userAnswers[index];
    });

    try {
      const res = await axios.post('http://localhost:8000/api/submit-answers/',
        { answers: answersPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Result:', res.data);
      setResultData(res.data);  // Save result
      setShowModal(true);        // Show popup

    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {/* Navbar */}
      
      {<Navbar/>}

      {/* Timer and Question */}
      <div className="test-container">
        <h2>Test - Time Left: {formatTime(timeLeft)}</h2>

        {currentQuestion && (
          <div className="question-card">
            <p><strong>Q{currentQuestionIndex + 1}:</strong> {currentQuestion.question}</p>

            <div className="options-container">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${userAnswers[currentQuestionIndex] === opt ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="navigation-buttons">
              {currentQuestionIndex > 0 && (
                <button onClick={handlePrev} className="nav-btn prev-btn">Previous</button>
              )}

              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNext} className="nav-btn next-btn">Next</button>
              ) : (
                <button onClick={handleSubmit} className="nav-btn submit-btn">Submit</button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Result Modal */}
      {showModal && resultData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Your Result</h2>
            <p>Score: {resultData.score*10} / {50}</p>
            <p>Percentage: {resultData.percentage}%</p>
            <p>Status: <strong>{resultData.status}</strong></p>

            <h3>Correct Answers : {resultData.score}</h3>
            {resultData.correct_questions.map((q, idx) => (
              <div key={idx} className="result-question correct">
                <p><strong>Q:</strong> {q.question}</p>
                <p>Your Answer: {q.your_answer}</p>
                <p>Correct Answer: {q.correct_answer}</p>
              </div>
            ))}

            <h3>Wrong Answers : {5-resultData.score}</h3>
            {resultData.wrong_questions.map((q, idx) => (
              <div key={idx} className="result-question wrong">
                <p><strong>Q:</strong> {q.question}</p>
                <p>Your Answer: {q.your_answer}</p>
                <p>Correct Answer: {q.correct_answer}</p>
              </div>
            ))}

            <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; 2025 MyTestApp. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Test;
