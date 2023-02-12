import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { user } from "../../store/atoms";
import {
  Timer_button,
  Timer_buttons,
  Timer_container,
  Timer_label,
  Timer_time,
  Timer_time_container,
  Timer_user,
} from "../molecules/atoms/styled";
import Footer from "../molecules/Footer";
import TopBar from "../molecules/TopBar";

function Timer() {
  const userName = useRecoilValue(user);

  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [ongoing, setOngoing] = useState(false as boolean);
  const [myTime, setMyTime] = useState(0 as number);

  var diff: number;

  const [count, setCount] = useState(0 as number);
  const [optionCount, setOptionCount] = useState(0 as number);
  let totalCount = count + optionCount;

  let startDate: object;
  const intervalRef = useRef(null as any);

  const start = () => {
    if (
      JSON.parse(localStorage.getItem("totalCount") as any) > 0 &&
      JSON.parse(localStorage.getItem("ongoing") as any) === false
    ) {
      setOptionCount(parseInt(localStorage.getItem("totalCount") as any));
      setCount(1);
    }
    startDate = new Date();

    localStorage.setItem("startDate", JSON.stringify(startDate));
    localStorage.setItem("ongoing", JSON.stringify(true));

    startInterval();
    setOngoing(true);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setOngoing(false);

    localStorage.setItem("ongoing", JSON.stringify(false));
    localStorage.setItem("totalCount", JSON.stringify(totalCount));
  };

  const done = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    alert(`공부한 시간은 ${totalCount} 초 입니다.`);
    localStorage.setItem("ongoing", JSON.stringify(false));
    localStorage.setItem("count", JSON.stringify(0));
    localStorage.setItem("totalCount", JSON.stringify(0));
    setMyTime(totalCount);
    setCount(0);
    setOptionCount(0);
    setOngoing(false);
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      const nowDate = new Date();
      diff = Math.floor(((nowDate as any) - (startDate as any)) / 1000);
      setCount((count) => {
        localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem("totalCount", JSON.stringify(totalCount));
        return diff;
      });
    }, 1000);
  };

  const timeConverter = () => {
    const checkMinutes = Math.floor(totalCount / 60);
    const hours = Math.floor(totalCount / 3600);
    const minutes = checkMinutes % 60;
    const seconds = totalCount % 60;
    setCurrentHours(hours);
    setCurrentSeconds(seconds);
    setCurrentMinutes(minutes);
  };

  // count 변화에 따라, timer 함수 렌더링
  useEffect(() => {
    if (
      localStorage.getItem("totalCount") &&
      JSON.parse(localStorage.getItem("ongoing") as any) === false
    ) {
      setOptionCount(parseInt(localStorage.getItem("totalCount") as any));
      setCount(1);
    } else {
      setOptionCount(parseInt(localStorage.getItem("totalCount") as any));
    }
    timeConverter();
  }, [count]);

  return (
    <>
      <Timer_container>
        <TopBar needWrite={true} needSearch={true} />

        {/* <Timer_user>
          <p className="title">{`${userName}님의 공부시간 재기`}</p>
        </Timer_user> */}

        <Timer_time_container>
          <Timer_time>
            {currentHours < 10 ? `0${currentHours}` : currentHours}
          </Timer_time>
          <Timer_label>시간</Timer_label>
          <Timer_time>
            {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}
          </Timer_time>
          <Timer_label>분</Timer_label>
          <Timer_time>
            {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
          </Timer_time>
          <Timer_label>초</Timer_label>
        </Timer_time_container>

        <Timer_buttons>
          <Timer_button isActive={!ongoing} onClick={start}>
            시작버튼
          </Timer_button>
          <Timer_button isActive={ongoing} onClick={stop}>
            정지버튼
          </Timer_button>
          <Timer_button isActive={true} onClick={done}>
            완료버튼
          </Timer_button>
        </Timer_buttons>
        <div>{myTime}초 공부했습니다. ㅊㅊ</div>
      </Timer_container>
      <Footer />
    </>
  );
}

export default Timer;
