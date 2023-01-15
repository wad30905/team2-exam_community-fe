import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .dropdown-menu {
    height: 0;
    overflow: hidden;
    transition: height 0.5s ease;
  }

  .dropdown:visited .dropdown-menu {
    height: 150px; /* or any desired height */
  }
`;

function DropdownMenu() {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    setOpen(!open);
    console.log("in");
  }

  return (
    <Wrapper>
      <button className="dropdown" onMouseEnter={handleToggle}>
        Toggle Menu
      </button>
      <ul className="dropdown-menu">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </Wrapper>
  );
}

export default DropdownMenu;
