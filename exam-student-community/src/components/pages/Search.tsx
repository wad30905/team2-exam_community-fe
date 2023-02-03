import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import { searchPosts } from "../../api";
import SearchBar from "../molecules/SearchBar";
import { useRecoilState } from "recoil";
import { searchModeState } from "../../store/atoms";
import { BoardName } from "../molecules/atoms/styled";

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
    <>
      <TopBar needWrite={true} needSearch={true} />
      <BoardName>{`${keyword} 검색결과`}</BoardName>
      <PostsList id={1} name={`${keyword} 검색결과`} postsData={postsData} />
    </>
  );
}

export default Search;
