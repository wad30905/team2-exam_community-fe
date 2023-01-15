import { Search, SearchContainer } from "./atoms/styled";

interface SearchBarProps {
  placeholder: string;
}

function SearchBar({placeholder}: SearchBarProps) {
  return (
    <SearchContainer>
      <Search placeholder={placeholder} />
    </SearchContainer>
  );
}

export default SearchBar;
