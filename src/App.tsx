import { useEffect, useState } from "react";

import "./App.css";

interface HandProps {
  angle: number;
  width: number;
  height: number;
}
const Hand = (props: HandProps) => {
  const { angle, width, height } = props;
  return (
    <div
      className="clock-hand"
      style={{
        transform: `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`,
      }}
    />
  );
};

interface ClockProps {
  hours: number;
  mins: number;
  secs: number;
  size: number;
}

const padTwoDigit = (val: number) => (val >= 10 ? val.toString() : `0${val}`);

const FULL_ROTATION_DEGREES = 360;
const Clock = (props: ClockProps) => {
  const { hours, mins, secs, size } = props;
  const secsPercentage = secs / 60;
  const minsPercentage = (secsPercentage + mins) / 60;
  const hoursPercentage = (minsPercentage + hours) / 12;
  const hoursAngle = hoursPercentage * FULL_ROTATION_DEGREES;
  const minsAngle = minsPercentage * FULL_ROTATION_DEGREES;
  const secsAngle = secsPercentage * FULL_ROTATION_DEGREES;

  const dateTimeDisplay = `${padTwoDigit(hours)}:${padTwoDigit(
    mins
  )}:${padTwoDigit(secs)}`;
  return (
    <time
      dateTime={dateTimeDisplay}
      className="clock"
      style={{ "--size": `${size}px` }}
    >
      <Hand height={0.6} width={1.3} angle={hoursAngle} />
      <Hand height={0.8} width={1.2} angle={minsAngle} />
      <Hand height={0.9} width={1} angle={secsAngle} />
    </time>
  );
};

function App() {
  const [clock, setClock] = useState(new Date());
  const hours = clock.getHours() % 12;
  const mins = clock.getMinutes();
  const secs = clock.getSeconds();
  useEffect(() => {
    const id = setInterval(() => {
      setClock(new Date());
    }, 500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="wrapper">
      <Clock hours={hours} mins={mins} secs={secs} size={300} />
    </div>
  );
}

export default App;
