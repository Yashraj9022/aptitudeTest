import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Result.css';
import './responsive.css'

const Result = ({ token, userAnswers }) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/submit-answers/',
          { answers: userAnswers },                     // ✅ POST body
          {
            headers: {
              Authorization: `Bearer ${token}`,          // ✅ Token in headers
              'Content-Type': 'application/json',
            },
          }
        );

        setQuestions(res.data.correct_questions.concat(res.data.wrong_questions));

        // ✅ Calculate score based on backend result
        setScore(res.data.score);

      } catch (error) {
        console.error('Error fetching result:', error.response?.data || error);
      }
    };

    fetchQuestions();
  }, [token, userAnswers]);

  return (
    <div className="result-container">
      <h2>📝 Your Test Result</h2>
      <h3>Total Score: {score} / {questions.length}</h3>

      {questions.map((q, index) => (
        <div key={index} className={`result-question ${userAnswers[q.id] === q.correct_answer ? 'correct' : 'wrong'}`}>
          <p><strong>Q{index + 1}:</strong> {q.question}</p>
          <p><strong>Your Answer:</strong> {q.your_answer || "No Answer"}</p>
          <p><strong>Correct Answer:</strong> {q.correct_answer}</p>
          {console.log(q.your_answer,"vhvjhvjv")}
          {q.your_answer === q.correct_answer ? (
           
            <p className="status correct">✔ Correct</p>
          ) : (
            <p className="status wrong">✖ Wrong</p>
          )}
          { console.log(q.your_answer)}
          {  console.log(q.correct_questions)}
        </div>
      ))}

      <footer>
        <p>Thank you for taking the test! 🎉</p>
      </footer>
    </div>
  );
};

export default Result;
