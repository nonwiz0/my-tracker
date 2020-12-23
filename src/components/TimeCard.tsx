import React from "react";
import { useEffect, useState } from "react";

const ClockTime: React.FC = (props) => {
  const [date, setDate] = useState(new Date());
  const RefreshClock = () => {
    setDate(new Date());
  };
  const interval = setInterval(RefreshClock, 1000);
  useEffect(() => {
    return () => clearInterval(interval);
  }, [interval]);
  return (
    <div>
      <h2>{date.toLocaleTimeString()}</h2>
    </div>
  );
};

export default ClockTime;
