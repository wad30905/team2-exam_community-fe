import { Blog, BlogTitle, BlogInfo, BlogsContainer } from "./atoms/styled";
import { sampleBlogs } from "./atoms/sampleData";
import { Link } from "react-router-dom";

function BlogsList() {
  return (
    <BlogsContainer>
      {sampleBlogs.map((blog, index) => (
        <Blog key={index}>
          <Link to={`./${1}`}>
            <BlogTitle>{blog.name}</BlogTitle>
            <BlogInfo>{blog.info}</BlogInfo>
          </Link>
        </Blog>
      ))}
    </BlogsContainer>
  );
}

export default BlogsList;
