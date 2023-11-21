import React, { useEffect, useState } from "react";

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const snowflakeInterval = setInterval(() => {
      setSnowflakes((prevSnowflakes) => [
        ...prevSnowflakes,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: 0,
          speed: Math.random() * 2 + 1,
          size: Math.random() * 3 + 1,
        },
      ]);
    }, 500);

    const snowflakeMoveInterval = setInterval(() => {
      setSnowflakes((prevSnowflakes) =>
        prevSnowflakes.map((flake) => ({
          ...flake,
          y: flake.y + flake.speed,
        }))
      );
    }, 50);

    return () => {
      clearInterval(snowflakeInterval);
      clearInterval(snowflakeMoveInterval);
    };
  }, []);

  return (
    <div className="snowfall-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.x,
            top: flake.y,
            width: flake.size,
            height: flake.size,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
