import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Responsive.css'

const QuestionList = ({ token }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/aptitude-questions/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuestions(res.data.questions);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Aptitude Questions</h2>
      {questions.map((q, index) => (
        <div key={index} className="border p-2 mb-3">
          <p><strong>Q{index + 1}:</strong> {q.question}</p>
          <ul>
            {q.options.map((opt, idx) => (
              <li key={idx} className="ml-4">- {opt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
