import React from "react";
import Game from "./Components/Game";
import { BattleProvider } from "./Context/BattleContext";

const App = () => {
  return (
    <div className="App">
      <BattleProvider>
        <Game />
      </BattleProvider>
    </div>
  );
};

export default App;
