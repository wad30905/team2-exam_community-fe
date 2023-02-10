import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import { searchPosts } from "../../api";
import SearchBar from "../molecules/SearchBar";
import { useRecoilState } from "recoil";
import { searchModeState } from "../../store/atoms";
import {
  BoardName,
  BoardOption,
  BoardOptions,
  Wrapper,
} from "../molecules/atoms/styled";
import { BoardsObject } from "../molecules/atoms/sampleData";

function Search() {
  const [postsData, setPostsData] = useState<any | null>();
  const keyword = useParams().keyword;
  const [mode, setMode] = useRecoilState(searchModeState);

  useEffect(() => {
    console.log("-------search page------------");
    console.log("mode :", mode);
    const getSearchResult = async () => {
      const searchResult = await searchPosts(keyword, mode);
      console.log("searchResult :", searchResult);
      console.log("r--------------------------");
      setPostsData(searchResult);
      setMode("1");
    };
    getSearchResult();
  }, []);

  return (
    <Wrapper>
      <TopBar needWrite={true} needSearch={true} />
      <BoardOptions>
        {Object.keys(BoardsObject).map((key, index) => (
          <Link
            key={key}
            to="/posts"
            state={{
              boardId: parseInt(key),
              boardName: BoardsObject[key],
            }}
          >
            <BoardOption>{BoardsObject[key]}</BoardOption>
          </Link>
        ))}
      </BoardOptions>
      <BoardName>{`${keyword} 검색결과`}</BoardName>
      <PostsList id={1} name={`${keyword} 검색결과`} postsData={postsData} />
    </Wrapper>
  );
}

export default Search;
