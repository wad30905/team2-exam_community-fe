import Router from "./Router";
import GlobalStyle from "./lib/StyledComponents/GlobalStyle";
import RouteChangeTracker from "./components/molecules/RouteChangeTracker";

function App() {
  // RouteChangeTracker();
  var worker = new Worker("Timer.tsx");
  worker.postMessage("start");

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

// count state 세팅

// start 버튼 누르면 start_date 기록
//   setInterval(now_date - start_date diff 계산하고 / count를 diff로 세팅,1초)

// stop 버튼 누르면 end_
