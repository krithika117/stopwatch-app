import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faRedo, faClock } from '@fortawesome/free-solid-svg-icons';

import './StopWatchComponent.css';

const StopWatchComponent = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let currentInterval;
    if (isRunning) {
      currentInterval = setInterval(() => {
        setTimePassed(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(currentInterval);
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

  const addZeroes = (time) => {
    const zeroAdder = (value) => value.toString().padStart(2, '0');
    const ms = zeroAdder(Math.floor((time % 1000) / 10));
    const seconds = zeroAdder(Math.floor((time / 1000) % 60));
    const minutes = zeroAdder(Math.floor((time / (1000 * 60)) % 60));
    const hours = zeroAdder(Math.floor(time / (1000 * 60 * 60)));
    return `${hours}:${minutes}:${seconds}.${ms}`;
  };

  return (
    <div className="container text-center my-5">
      <h2>Stopwatch Modified</h2>
      <div className="circle">
        <div className="timer">{addZeroes(timePassed)}</div>
      </div>
      <div className="btn-group mt-5" role="group">
        <button
          className={`btn ${isRunning ? 'btn-warning' : 'btn-success'}`}
          onClick={handleStartPause}
        >
          <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
        </button>

        <button className="btn btn-danger" onClick={handleStop}>
          <FontAwesomeIcon icon={faStop} />
        </button>

        <button className="btn btn-secondary" onClick={handleReset}>
          <FontAwesomeIcon icon={faRedo} />
        </button>

        <button className="btn btn-info" onClick={handleLap}>
          <FontAwesomeIcon icon={faClock} />
        </button>
      </div>

      {laps.length > 0 && (
        <div>
          <h3 className="mt-4">Laps:</h3>
          <ul className="list-group mt-2 bg-dark">
            {laps.map((lap, index) => (
              <li className="list-group-item bg-dark text-white" key={index}>
                {addZeroes(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatchComponent;
