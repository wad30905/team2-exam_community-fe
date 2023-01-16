import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import Blog from "./components/pages/Blog";
import Register1 from "./components/pages/Register1";
import Register2 from "./components/pages/Register2";
import Write from "./components/pages/Write";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs/write" element={<Write />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/register2" element={<Register2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
