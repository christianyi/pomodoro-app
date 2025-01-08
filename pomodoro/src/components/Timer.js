'use client';
import { useState, useEffect } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            setIsWorkSession(!isWorkSession);
            setMinutes(isWorkSession ? 5 : 25); // Switch between work and break
            // Optional: Add notification sound here
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isWorkSession]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setIsWorkSession(true);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl text-black text-center font-bold mb-4">
          {isWorkSession ? 'Pomo a Doro' : 'Break Time'}
        </h1>
        <div className="text-6xl text-black text-center font-bold mb-8">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <button
              onClick={startTimer}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;