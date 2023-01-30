import { DefaultTheme } from "styled-components";

const deviceSizes = {
  mobile: "800px",
  desktop: "801px",
};

export const theme: DefaultTheme = {
  bgColor: "white",
  accentColor: "#5928E5",
  grayColor: "#A4A4A4",
  whiteColor: "white",
  blackColor: "black",
  device: {
    mobile: `screen and (max-width: ${deviceSizes.mobile})`,
    desktop: `screen and (min-width: ${deviceSizes.desktop})`,
  },
};
