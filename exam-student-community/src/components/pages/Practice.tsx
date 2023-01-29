import styled from "styled-components";

const Box1 = styled.div`
  @media ${({ theme }) => theme.device.desktop} {
    background-color: red;
  }
  @media ${({ theme }) => theme.device.mobile} {
    background-color: blue;
  }
`;

const Box2 = styled.div``;

function Practice() {
  return (
    <Box1>
      <Box2>hi</Box2>
    </Box1>
  );
}

export default Practice;
