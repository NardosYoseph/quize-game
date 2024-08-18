"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const questions = [
  {
    id: 1,
    question: 'Solve the fruit puzzle?',
    image: '/sample.jpg', // Add the path to your image
    options: ['A. 500', 'B. 1000', 'C. 750', 'D. 500'],
    correctAnswer: 'C. 750',
  },
  {
    id: 2,
    question: 'What is the capital of France?',
    image: '/1paris.jpg', // Add the path to your image
    options: ['A. Berlin', 'B. Madrid', 'C. Paris', 'D. Rome'],
    correctAnswer: 'C. Paris',
  },
  {
    id: 3,
    question: "Which artist painted the Mona Lisa?",
    image: '/monalisa.jpg', // Add the path to your image
    options: [ "A. Pablo Picasso","B. Vincent van Gogh","C. Leonardo da Vinci","D. Claude Monet"],
    correctAnswer: 'C. Leonardo da Vinci',
  },  {
    id: 4,
    question: "Which gas is most abundant in Earth's atmosphere?",
    image: '/nitrogen.jpg', // Add the path to your image
    options: [ "A. Oxygen","B. Carbon Dioxide","C. Nitrogen","D. Hydrogen"],
    correctAnswer: 'C. Nitrogen',
  },  {
    id: 5,
    question: "What is the chemical symbol for water?",
    image: '/water.jpg', // Add the path to your image
    options: [ "A. CO2","B. H2O","C. O2","D. NaCl"],
    correctAnswer: 'B. H2O',
  },  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    image: '/mars.jpg', // Add the path to your image
    options: [ "A. Jupiter","B. Mars","C. Venus","D. Saturn"],
    correctAnswer: 'B. Mars',
  },
];

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    let timer;
    if (quizStarted && !quizFinished) {
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
  }, [quizStarted, quizFinished]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    // Update score if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer('');
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
    setQuizStarted(true);
  };

  return (
    <div className="flex flex-col items-start p-20 overflow-hidden min-w-screen bg-white rounded-lg shadow-lg w-full h-full min-h-screen mx-0 mt-0">
      {!quizStarted ? (
        <button
          onClick={handleStartQuiz}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold mt-60 mx-auto py-3 px-6 rounded transition-colors duration-300 text-xl md:text-2xl"
        >
          Start Quiz
        </button>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center mb-6 w-full">
          <div className="relative w-full max-w-screen-md mx-auto h-60 md:h-80 overflow-hidden flex items-center justify-center mb-4 md:mb-0">
  <Image
    src={questions[currentQuestionIndex].image}
    alt="Question Image"
    layout="fill"
    objectFit="contain"
    className="object-cover"
     priority={true}
  />
</div>

            <div className="flex flex-col w-full md:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">{questions[currentQuestionIndex].question}</h2>
              {questions[currentQuestionIndex].options.map((option, index) => (
               <label
               key={index}
               className={`block cursor-pointer flex items-center mb-2 ${selectedAnswer === option ? 'bg-green-100' : ''}`}
             >
               <input
                 type="radio"
                 name="answer"
                 value={option}
                 checked={selectedAnswer === option}
                 onChange={() => handleAnswerChange(option)}
                 disabled={quizFinished}
                 className="mr-2"
               />
               <div className='w-80 text-white font-semibold py-2 px-4 rounded mb-2 transition-colors duration-300 bg-purple-500'>
               {option}
               </div>
             </label>
              ))}
            </div>
          </div>

          <div className="mt-4 mx-auto">
            {showNextButton && !quizFinished && (
              <button
                onClick={handleNextQuestion}
                className="w-80 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300 mt-2"
              >
                {currentQuestionIndex==(questions.length-1)&&(
               <p> Finish</p>)}
               {currentQuestionIndex!==(questions.length-1)&&(
               <p> Next Question</p>)}
              </button>
            )}
            {quizFinished && (
              <>
                <div className="text-lg text-gray-700 font-bold">
                  Quiz finished! Your score: {score}/{questions.length}
                </div>
                <div className="mt-2 text-gray-700 font-bold">
                  Time: {time.minutes}:{time.seconds}:{time.milliseconds}
                </div>
                <button
                  onClick={handleRetry}
                  className="w-80 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300 mt-4"
                >
                  Retry
                </button>
              </>
            )}
            {!quizFinished && (
              <div className="text-gray-700 font-bold mt-2">
                {/* <div>Score: {score}/{questions.length}</div> */}
                <div>Time: {time.minutes}:{time.seconds}:{time.milliseconds}</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
