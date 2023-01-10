import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Posts from "./Posts";
import Register from "./Register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:boardIndex" element={<Posts />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Router;
