import React, { useState, useLayoutEffect, memo } from 'react';
import './stopWatch.css';

const Stopwatch = ({ isRunning }) => {
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useLayoutEffect(() => {
    let intervalId;

    if (isRunning) {
      setStartTime(Date.now() - elapsedTime);

      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10); // Update every 10 milliseconds for a smoother display
    } else {
      clearInterval(intervalId);
      setStartTime(0); // Reset start time to 0 when not running
      setElapsedTime(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, startTime, elapsedTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    const milliseconds = (time % 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}.${milliseconds.padStart(3, '0')}`;
  };

  return (
    <div className="StopWatchMain">
      <h4 className="stopwatchHeader">Running Time</h4>
      <div className="StopContHolder">{formatTime(elapsedTime)}</div>
    </div>
  );
};

export default memo(Stopwatch);
