import React, { useEffect, useState, useRef } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setTimeRemaining(10);

    function tick() {
      timeoutRef.current = setTimeout(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 1) {
            onAnswered(false);
            return 10;
          } else {
            tick(); // schedule the next tick only if not done
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    tick(); // start the first countdown

    return () => {
      clearTimeout(timeoutRef.current); // cleanup!
    };
  }, [question, onAnswered]);

  function handleAnswer(isCorrect) {
    clearTimeout(timeoutRef.current); // stop the countdown
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
