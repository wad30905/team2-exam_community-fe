import { IconSearch } from "./atoms/icons";
import {
  SearchInput,
  SearchForm,
  Searchbutton,
  SearchSelection,
  SearchBox,
} from "./atoms/styled";
import { useForm } from "react-hook-form";
import { searchPosts } from "../../api";
import { searchModeState } from "../../store/atoms";
import { useRecoilState } from "recoil";

interface SearchBarProps {
  placeholder: string;
}

interface ISearchForm {
  keyword: string;
}

function SearchBar({ placeholder }: SearchBarProps) {
  const { register, handleSubmit } = useForm<ISearchForm>();
  const [mode, setMode] = useRecoilState(searchModeState);

  const handleChangeSelect = (e: any) => {
    setMode(e.target.value);
  };

  function onSubmit(data: ISearchForm) {
    console.log(mode);
    document.location.href = `/search/${data.keyword}`;
  }

  return (
    <SearchForm onSubmit={handleSubmit(onSubmit)}>
      <SearchBox>
        <SearchSelection onChange={handleChangeSelect}>
          <option value="1">제목 검색</option>
          <option value="2">작성자 검색</option>
        </SearchSelection>
        <SearchInput
          {...register("keyword", {
            required: "검색어를 입력해주세요",
          })}
          name="keyword"
          type="text"
          placeholder={placeholder}
        />
        <Searchbutton>
          <IconSearch />
        </Searchbutton>
      </SearchBox>
    </SearchForm>
  );
}

export default SearchBar;
