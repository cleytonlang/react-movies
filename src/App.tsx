import { useState } from "react";
import { Container } from "@nextui-org/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import "../src/assets/css/App.css";

import Header from "./components/Header";
import HeaderBanner from "./components/HeaderBanner";
import Trending from "./components/Trending";
const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "-webkit-linear-gradient(180deg, #000000, #060c1f 70%)",
    },
  },
});

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
      <Container md>
        <Header />
        <HeaderBanner />
        <Trending />
      </Container>
    </NextUIProvider>
  );
}

export default App;
