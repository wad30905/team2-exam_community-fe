import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bar, Search, Post } from "../molecules/small/styled";
import TopBar from "../molecules/TopBar";
import PostList from "../molecules/PostList";
import Dropdown from "../molecules/Dropdown";

function Posts() {
  const { boardIndex } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const isTrueSet = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn((isLoggedIn) => isTrueSet);
  }, []);

  return (
    <>
      <TopBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        toggle={toggle}
      />
      {isOpen && <Dropdown isLoggedIn={isLoggedIn} />}
      <PostList boardIndex={boardIndex} />
    </>
  );
}

export default Posts;
