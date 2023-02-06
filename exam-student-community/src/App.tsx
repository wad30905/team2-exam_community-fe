import Router from "./Router";
import GlobalStyle from "./lib/StyledComponents/GlobalStyle";
import RouteChangeTracker from "./components/molecules/RouteChangeTracker";

function App() {
  // RouteChangeTracker();

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
