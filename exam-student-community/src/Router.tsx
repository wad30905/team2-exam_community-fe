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
import MyLikePosts from "./components/pages/MyLikePosts";
import Fix from "./components/pages/Fix";
import MyPage from "./components/pages/MyPage";
import OAuth from "./components/pages/OAuth";
import FindPassword from "./components/pages/FindPassword";
import ResetPassword from "./components/pages/ResetPassword";
import RouteChangeTracker from "./components/molecules/RouteChangeTracker";

function Router() {
  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/*" element={<Posts />} />
        <Route path="/myposts" element={<MyPosts />} />
        {/* <Route path="/mylikeposts" element={<MyLikePosts />} />
        <Route path="/myscrapposts" element={<MyscrapPosts />} /> */}
        <Route path="/posts/:id/fix" element={<Fix />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/write" element={<Write />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/oauth" element={<OAuth />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/users/reset/:token" element={<ResetPassword />} />
        <Route path="/fail_login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
