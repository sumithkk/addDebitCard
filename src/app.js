import React from "react";
import { GlobalStyles } from "./helpers/global";
import MainSection from "./pages/MainSection";

const App = () => {
  return (
    <React.Fragment>
      <MainSection />
      <GlobalStyles />
    </React.Fragment>
  );
};

export default App;
