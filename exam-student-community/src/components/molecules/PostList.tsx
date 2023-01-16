// import { Link } from "react-router-dom";
// import { sampleBoards } from "./atoms/sampleData";
// import { Post } from "./atoms/styled";

// interface IPostListProps {
//   boardIndex: string | undefined;
// }

// function PostList({ boardIndex }: IPostListProps) {
//   const posts = sampleBoards[boardIndex as any].posts;
//   return (
//     <ul>
//       {posts.map((post, index) => (
//         <Link to={`./${post.id}`} key={index}>
//           <Post>
//             <span className="comment_num">{post.comment_num}</span>
//             <div className="box__title_meta">
//               <span className="title">{post.title}</span>
//               <div className="meta">
//                 <span>18분전</span>
//                 <span>조회 120</span>
//                 <span>손채환</span>
//                 <span>질문</span>
//               </div>
//             </div>
//           </Post>
//         </Link>
//       ))}
//     </ul>
//   );
// }

// export default PostList;

function PostList() {
  return <></>;
}
export default PostList;
