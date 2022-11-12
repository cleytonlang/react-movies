import { useState } from "react";
import { Container } from "@nextui-org/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";

import Header from "./components/Header";
import HeaderBanner from "./components/HeaderBanner";
import Trending from "./modules/Trending";

const light = {
  type: "light",
  theme: {
    colors: {
      background: "#e3eaf8",
    },
  },
};
const lightTheme = createTheme(light);

const dark = {
  type: "dark",
  theme: {
    colors: {
      background: "#020d18",
    },
  },
};
const darkTheme = createTheme(dark);

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
      <Container md>
        <Header setIsDark={setIsDark} isDark={isDark} />
        <HeaderBanner />
        <Trending theme={isDark ? dark.type : light.type} />
      </Container>
    </NextUIProvider>
  );
}

export default App;
