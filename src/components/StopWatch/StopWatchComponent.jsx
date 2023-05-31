import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StopWatchComponent.css';

const StopWatchComponent = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimePassed(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  const handleStartPause = () => {
    if (!isRunning) setStartTime(Date.now() - timePassed);
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimePassed(0);
    setLaps([]);
  };

  const handleReset = () => {
    setStartTime(Date.now());
    setTimePassed(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) setLaps([...laps, Date.now() - startTime]);
  };

  const addLength = (time) => {
    const addZero = (value) => value.toString().padStart(2, '0');
    const ms = addZero(Math.floor((time % 1000) / 10));
    const seconds = addZero(Math.floor((time / 1000) % 60));
    const minutes = addZero(Math.floor((time / (1000 * 60)) % 60));
    const hours = addZero(Math.floor(time / (1000 * 60 * 60)));
    return `${hours}:${minutes}:${seconds}.${ms}`;
  };

  return (
    <div className="container text-center my-5">
      <h2>Stopwatch</h2>
      <div className="circle">
        <div className="timer">{addLength(timePassed)}</div>
      </div>
      <div className="btn-group mt-5" role="group">
        <button className="btn btn-primary" onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-danger" onClick={handleStop}>
          Stop
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-info" onClick={handleLap}>
          Lap
        </button>
      </div>
      {laps.length > 0 && (
        <div>
          <h3 className="mt-4">Laps:</h3>
          <ul className="list-group mt-2 bg-dark">
            {laps.map((lap, index) => (
              <li className="list-group-item bg-dark text-white" key={index}>
                {addLength(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatchComponent;
