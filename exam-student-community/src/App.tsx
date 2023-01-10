import React from "react";
import styles from "./App.module.css";
import Sample from "./Sample";
import RegisterPage from "./RegisterPage";
// import SignUp from "./SignUp";

const App = () => {
  return (
    <div className={styles.Container}>
      <RegisterPage />
    </div>
  );
};

export default App;
