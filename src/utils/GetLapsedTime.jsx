import React from "react";

const GetLapsedTime = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeElapsed = end - start;

  const minutes = Math.floor(timeElapsed / 1000 / 60) % 60;

  return (
    <p
      className={
        minutes <= 5
          ? "text-sm text-green-500 font-semibold"
          : minutes > 5 && minutes <= 10
          ? "text-sm text-orange-500 font-semibold"
          : "text-sm text-red-500 font-semibold"
      }
    >
      {minutes} min
    </p>
  );
};

export default GetLapsedTime;
