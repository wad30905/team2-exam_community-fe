import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import Blog from "./components/pages/Blog";
import Register from "./components/pages/Register";
import Write from "./components/pages/Write";
 
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:blogs" element={<Blogs />} />
        <Route path="/:blogs/:blogid" element={<Blog />} />
        <Route path="/:blogs/write" element={<Write />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
