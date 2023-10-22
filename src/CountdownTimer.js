import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const targetDate = new Date(currentYear, 11, 1);
    let timeRemaining = targetDate - currentDate;

    const timer = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(timer);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        setCountdown({ days, hours, minutes, seconds });
      }

      timeRemaining -= 1000;
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer">
      <p>Noch:</p>
      <div>{countdown.days} Tage</div>
      <div>{countdown.hours} Stunden</div>
      <div>{countdown.minutes} Minuten</div>
      <div>{countdown.seconds} Sekunden</div>
      <p>bis zum ersten Dezember</p>
    </div>
  );
}

export default CountdownTimer;
