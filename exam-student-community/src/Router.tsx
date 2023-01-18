import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Posts from "./components/pages/Posts";
import Post from "./components/pages/Post";
import Register1 from "./components/pages/Register1";
import Register2 from "./components/pages/Register2";
import Write from "./components/pages/Write";
import Practice from "./components/pages/Practice";
import MyscrapPosts from "./components/pages/MyscrapPosts";
import Search from "./components/pages/Search";
import MyPosts from "./components/pages/MyPosts";
import MycommentPosts from "./components/pages/MycommentPosts";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/*" element={<Posts />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/mycommentposts" element={<MycommentPosts />} />
        <Route path="/myscrapposts" element={<MyscrapPosts />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/write" element={<Write />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
