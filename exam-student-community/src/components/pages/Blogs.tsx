import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Write from "./Write";
import { sampleBlogs } from "../molecules/atoms/sampleData";
import Dropdown from "../molecules/Dropdown";
import TopBar from "../molecules/TopBar";

const Container = styled.div`
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
  background: white;
`;

const BlogsList = styled.ul``;

const Blog = styled.li`
  a {
    background-color: white;
    color: black;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-around;
    padding: 5px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const BlogTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
`;
const BlogInfo = styled.span`
  font-size: 10px;
  font-weight: lighter;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ILocation {
  state : {
    blogsId: number;
  }
}

function Blogs() {
  const asdf = useParams();
  console.log(asdf);
  const {state: {blogsId}} = useLocation() as ILocation;
  console.log(blogsId);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Container>
      <TopBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        toggle={toggle}
      />
      {isOpen && <Dropdown isLoggedIn={isLoggedIn} />}
      <BlogsList>
        {sampleBlogs.map((blog) => (
          <Blog key={blog.id}>
            <Link to={`./${blog.id}`}>
              <BlogTitle>{blog.name}</BlogTitle>
              <BlogInfo>{blog.info}</BlogInfo>
            </Link>
          </Blog>
        ))}
      </BlogsList>
    </Container>
  );
}
export default Blogs;
