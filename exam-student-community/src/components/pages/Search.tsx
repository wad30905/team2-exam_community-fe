import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import { searchPosts } from "../../api";
import SearchBar from "../molecules/SearchBar";
import { useRecoilState } from "recoil";
import { searchModeState } from "../../store/atoms";

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
      console.log("-------------------");
      setPostsData(searchResult);
      setMode("1");
    };
    getSearchResult();
  }, []);

  return (
    <>
      <TopBar
        id={1}
        mainService={`'${keyword}' 검색결과`}
        needWrite={true}
        needSearch={true}
      />
      <PostsList id={1} name={"검색결과"} postsData={postsData} />
    </>
  );
}

export default Search;
