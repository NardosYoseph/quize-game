"use client"
import React, { useState, useEffect } from 'react';

const questions = [
  {
    id: 1,
    question: 'Where is the Golden Gate Bridge located?',
    image: '/sample.jpg', // Add the path to your image
    options: ['Arizona', 'Florida', 'Texas', 'California', 'Nevada'],
    correctAnswer: 'California',
  },
  {
    id: 2,
    question: 'Solve the fruit puzzle: What is the value of the final expression?',
    image: '/sample.jpg', // Add the path to your image
    options: ['20', '30', '40', '50', '60'],
    correctAnswer: '40',
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    let timer;
    if (!quizFinished) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          let { minutes, seconds, milliseconds } = prevTime;
          milliseconds += 1;
          if (milliseconds === 100) {
            milliseconds = 0;
            seconds += 1;
          }
          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }
          return { minutes, seconds, milliseconds };
        });
      }, 10);
    }

    return () => clearInterval(timer);
  }, [quizFinished]);

  const handleAnswer = (answer) => {
    if (questions[currentQuestionIndex].correctAnswer === answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    setShowNextButton(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setQuizFinished(false);
  };

  return (
    <div className="flex flex-row items-center p-20 bg-white rounded-lg shadow-lg w-full h-screen mx-auto mt-0">
      <div className="flex items-center mb-6">
        <img
          src={questions[currentQuestionIndex].image}
          alt="Question Image"
          className="w-96 h-96 object-cover rounded-lg shadow-md mr-6"
        />
       
      <div className="w-500 flex flex-col">
      <div className="w-500 flex flex-col">
      <div className="w-500 flex flex-col">
        <h2 className="text-2xl font-semibold">{questions[currentQuestionIndex].question}</h2>
      </div>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-2 transition-colors duration-300"
          >
            {option}
          </button>
        ))}
      </div>
      
      {showNextButton && !quizFinished && (
        <button
          onClick={handleNextQuestion}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
        >
          Next Question
        </button>
      )}
      {quizFinished && (
        <div className="mt-4 text-center">
          <div className="text-lg text-gray-700 font-bold">
            Quiz finished! Your score: {score}/{questions.length}
          </div>
          <div className="mt-2 text-gray-700 font-bold">
            Time: {time.minutes}:{time.seconds}:{time.milliseconds}
          </div>
          <button
            onClick={handleRetry}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      )}
      {!quizFinished && (
        <div className="mt-4 text-gray-700 font-bold items-center justify-center">
          <div>Score: {score}/{questions.length}</div>
          <div>Time: {time.minutes}:{time.seconds}:{time.milliseconds}</div>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Quiz;
