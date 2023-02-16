import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../../store/atoms";
import {
  Timer_button,
  Timer_buttons,
  Timer_container,
  Timer_guide,
  Timer_label,
  Timer_time,
  Timer_time_container,
  Timer_user,
} from "../molecules/atoms/styled";

import TopBar from "../molecules/TopBar";

interface IMyTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function Timer() {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [ongoing, setOngoing] = useState(false as boolean);

  const [myTime, setMyTime] = useState<IMyTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [count, setCount] = useState(0 as number);
  const [optionCount, setOptionCount] = useState(0 as number);
  const navigate = useNavigate();

  let totalCount = count + optionCount;

  let startDate: object;
  var diff: number;
  const intervalRef = useRef(null as any);

  const start = () => {
    // totalCount가 있고, 정지상태였을때,
    // optionCount에 tatalCount 넣고.
    // count는 1로 세팅
    if (
      JSON.parse(localStorage.getItem("totalCount") as any) > 0 &&
      JSON.parse(localStorage.getItem("ongoing") as any) === false
    ) {
      setOptionCount(parseInt(localStorage.getItem("totalCount") as any));
      setCount(0);
    }

    // totalCount가 null일때 (첫 시작일때)
    if (JSON.parse(localStorage.getItem("totalCount") as any) === null) {
    }

    // 공통
    // startDate 찍어서 로컬스토리지 저장.

    startDate = new Date();

    localStorage.setItem("startDate", JSON.stringify(startDate));
    localStorage.setItem("ongoing", JSON.stringify(true));

    startInterval();
    setOngoing(true);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setOngoing(false);
    setCount(0);
    localStorage.setItem("ongoing", JSON.stringify(false));
    localStorage.setItem("totalCount", JSON.stringify(totalCount));

    setOptionCount(totalCount);
  };

  const done = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    alert(
      `공부시간 : ${currentHours}시간 ${currentMinutes}분 ${currentSeconds}초`
    );
    setMyTime((myTime) => {
      const copyCurrentTime = {
        hours: currentHours,
        minutes: currentMinutes,
        seconds: currentSeconds,
      };
      return copyCurrentTime;
    });
    localStorage.setItem("ongoing", JSON.stringify(false));
    localStorage.setItem("totalCount", JSON.stringify(0));
    setCount(0);
    setOptionCount(0);
    setOngoing(false);
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      const nowDate = new Date();
      diff = Math.floor(((nowDate as any) - (startDate as any)) / 1000);
      setCount((count) => {
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
    if (JSON.parse(localStorage.getItem("totalCount") as any) === null) {
      localStorage.setItem("totalCount", JSON.stringify(0));
    }
    if (
      localStorage.getItem("totalCount") &&
      JSON.parse(localStorage.getItem("ongoing") as any) === false
    ) {
      console.log("ongoing false // totalCount >0");
      console.log(typeof localStorage.getItem("totalCount"));
      setOptionCount(parseInt(localStorage.getItem("totalCount") as any));
      setCount(0);
    }

    console.log(
      "setInterval count / optionCount / totalCount :",
      count,
      optionCount,
      totalCount
    );

    timeConverter();
    if (myTime.seconds > 0) {
      navigate("/writetimer", { state: myTime });
    }
  }, [count, myTime]);

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
            시작
          </Timer_button>
          <Timer_button isActive={ongoing} onClick={stop}>
            정지
          </Timer_button>
          <Timer_button isActive={true} onClick={done}>
            완료
          </Timer_button>
        </Timer_buttons>
        <Timer_guide>
          <p>시작버튼 : 공부 시작</p>
          <p>정지버튼 : 공부 일시 정지</p>
          <p>완료버튼 : 공부시간 기록</p>
          <p>***주의사항***</p>
          <p>정지하고 새로고침하면 시간 그대로 유지됨</p>
          <p>시간이 계속 측정되는 상태에서 새로고침하면 초기화됨</p>
        </Timer_guide>
      </Timer_container>
    </>
  );
}

export default Timer;
