import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
font-family: 'Source Sans Pro', sans-serif;

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video, textarea {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
 box-sizing: border-box; 
}
body{
  font-family: 'Stylish', sans-serif;
    /* background-image: radial-gradient(circle at 10% 10%, rgb(255, 156, 156) 0%, rgb(179, 201, 241) 80%); */
  background-color:${(props) => props.theme.whiteColor};
  color:black;
  min-width:375px;
  margin: 0 auto;
  left: 0;
  right: 0;
  // 사파리에서 body가 스크롤돼서 검정화면이 올라오는 경우 있어서 추가해봄. 이 중에 하나는 되겠지.
  /* overflow: hidden;  */
  /* pointer-events:none;  */
  /* position: fixed; */
  
  // vh 때문에, 아이폰 사파리에서 제일 아래쪽이 안보이는 이슈
  // body에 추가하는게 맞는건지, 각 컴포넌트마다 박아야하는지는 의문.
  // 일단 body에 박아놓음.
  /* height: -webkit-fill-available;
  height: fill-available; */
}
a{
  display:block;
  text-decoration:none;
  color:inherit;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
  display: flex;
  align-items: start;
  justify-content: start;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}



`;

export default GlobalStyle;
