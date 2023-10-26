import React, { useState, useEffect, useRef} from "react";
import timerImage from './images/ornament_1.png'; // Import your image
import leafImage from './images/leaf_1.png'; // Import your image

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

  const [isTextVisible, setIsTextVisible] = useState(false);
  const textRef = useRef(null);

  const handleImageClick = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <div className="countdown-timer">
      <a href="#" onClick={handleImageClick}>
        <img src={timerImage} alt="Timer" className="timer-image" />
      </a>
      <img src={timerImage} alt="Timer2" className="timer-image2" />
      <img src={leafImage} alt="Leaf" className="leaf-image" />
      <p>Noch:</p>
        <div className="countdown-time">
          <div>{countdown.days} Tage</div>
          <div>{countdown.hours} Stunden</div>
          <div>{countdown.minutes} Minuten</div>
          <div>{countdown.seconds} Sekunden</div>
        </div>
      <p>bis zum ersten Dezember</p>
      {isTextVisible && (
        <div ref={textRef} style={{ color: "blue", fontSize: "80%"}}>
          Day by day, the puzzle unfolds more,
          <br></br>
          Piece by piece, the solution's in store.
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;
