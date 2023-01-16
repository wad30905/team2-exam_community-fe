import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import { authCheck, fetchBoards, getComment, SERVER_URL } from "../../api";
import { useQuery } from "react-query";

import { sampleBlogs, sampleBoards } from "../molecules/atoms/sampleData";
import { Loader } from "../molecules/atoms/styled";

export interface IPost {
  id: Number;
  title: String;
  comment_num: Number;
  click_num: Number;
  writer: String;
  m_date: Number;
  d_date: Number;
}

export interface IBoards {
  index: Number;
  name: String;
  total_num: Number;
  posts: IPost[];
}

function Main() {
  const {isLoading, data} = useQuery<IBoards[]>("fetchBoards", fetchBoards);
  return (
    <>
      <TopBar
        mainService={"서비스명"}
        needWrite={true}
        needSearch={true}
      />
      {isLoading ? <Loader>로딩중</Loader> : <Boards data={data} />}
    </>
  );
}

export default Main;
