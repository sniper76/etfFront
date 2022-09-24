import { useState, useEffect } from "react";
import moment from "moment";

function CountDownTimer(props) {
  //   console.log("CountDownTimer", props);
  //   console.log(moment.duration(600000, "milliseconds"));
  const [time, setTime] = useState(moment.duration(props?.seconds, "seconds")); //milliseconds 단위 변환됨
  const [timeTick, setTimeTick] = useState(null);

  const startTimer = () => {
    const tick = () => {
      setTime((t) => {
        // console.log("t", t);
        return t - 1000;
      });
    };
    const timeTick = setInterval(() => {
      tick();
    }, 1000);
    setTimeTick(timeTick);
  };

  const pauseTimer = () => {
    if (timeTick) {
      clearInterval(timeTick);
    }
  };

  const stopTimer = () => {
    pauseTimer();
    setTime(0);
  };

  useEffect(() => {
    if (props?.seconds) {
      startTimer();
      // console.log("useEffect", "startTimer");
    }
  }, [props]);

  useEffect(() => {
    if (time < 1) {
      stopTimer();
    }
    // console.log("time", time);
  }, [time]);

  return <p>{moment.utc(time).format("mm:ss")}</p>;
}

export default CountDownTimer;
