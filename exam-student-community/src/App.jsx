import React from "react";
import styles from "./App.module.css";
import Sample from "./Sample";
import RegisterPage from "./RegisterPage";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
// import SignUp from "./SignUp";

const router = createBrowserRouter([
  
]);

const App = () => {
  return (
    <div className={styles.Container}>
      <RegisterPage />
    </div>
  );
};

export default App;
