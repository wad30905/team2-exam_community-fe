import { Blog, BlogTitle, BlogInfo, BlogsContainer } from "./atoms/styled";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { SERVER_URL } from "../../api";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
export interface IBlog {
  c_date: string;
  click_num: number;
  comment_num: number;
  content: string;
  d_date: null;
  id: number;
  like: number;
  m_date: string;
  num: number;
  title: string;
  user_name: string;
}

interface IBlogsListProp {
  id?: number;
}

function BlogsList({ id }: IBlogsListProp) {
  const blogsId = id;
  const [blogsData, setBlogsData] = useState<IBlog[] | null>();

  useEffect(() => {
    const url = `${SERVER_URL}/blogs/${blogsId}`;
    axios({ method: "get", url, data: { blogsId } }).then((response) =>
      setBlogsData(response.data[0])
    );
  }, []);
  if (blogsData) {
    return (
      <BlogsContainer>
        {blogsData.map((blog: IBlog, index: number) => (
          <Blog key={index}>
            <Link to={`./${blog.id}`} state={{ postId: blog.id }}>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogInfo>
                <span>{`1분전|`}</span>
                <span>{`조회100|`}</span>
                <span>{`좋아요100`}</span>
              </BlogInfo>
            </Link>
          </Blog>
        ))}
      </BlogsContainer>
    );
  }
  return <Loading />;
}

export default BlogsList;
