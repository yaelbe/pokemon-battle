import React, { useContext } from "react";
import Title from "./Title";
import BattleArea from "./BattleArea";
import { BattleContext } from "../Context/BattleContext";

import "./Game.css";

const Game = () => {
  const { attack, reset, play, fightAgain, initialized } =
    useContext(BattleContext);

  return (
    <div className="game-wrapper">
      <Title />
      {initialized && <BattleArea />}
      {play ? (
        <button type="button" onClick={attack} className="btn attack">
          Attack!
        </button>
      ) : (
        <button type="button" onClick={fightAgain} className="btn again">
          Fight Again
        </button>
      )}
      <button type="button" onClick={reset} className="btn reset">
        {play ? "Reset" : "New Battle"}
      </button>
    </div>
  );
};

export default Game;
