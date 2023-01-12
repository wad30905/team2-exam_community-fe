import { Search, SearchContainer } from "./atoms/styled";

function SearchBar(placeholder:string) {
  return (
    <SearchContainer>
      <Search placeholder={placeholder}/>
    </SearchContainer>
  )
};

export default SearchBar