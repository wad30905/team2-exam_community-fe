import Router from "./Router";
import GlobalStyle from "./lib/StyledComponents/GlobalStyle";
import RouteChangeTracker from "./components/molecules/RouteChangeTracker";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
