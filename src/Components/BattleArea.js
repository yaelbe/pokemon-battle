import React, { useContext, useEffect, useState } from "react";
import Player from "./Player";
import { BattleContext } from "../Context/BattleContext";

import "./BattleArea.css";

const BattleArea = () => {
  const {
    playerLife,
    opponentLife,
    playerWins,
    opponentWins,
    playerDice,
    opponentDice,
    winStatus,
    playerPokemon,
    opponentPokemon,
  } = useContext(BattleContext);

  const [statusText, setStatusText] = useState();
  const [statusCss, setStatusCss] = useState("");

  useEffect(() => {
    if (winStatus == null) {
      setStatusText("");
      setStatusCss("");
    } else if (winStatus == "tie") {
      setStatusText("Tie");
      setStatusCss("status tie");
    } else if (winStatus == "player") {
      setStatusText("You Won");
      setStatusCss("status win");
    } else if (winStatus == "opponent") {
      setStatusText("Game Over");
      setStatusCss("status lose");
    }
  }, [winStatus]);

  return (
    <div className="battle-area">
      <div className="players">
        <Player
          playerName={"Player"}
          wins={playerWins}
          dice={playerDice}
          life={playerLife}
          image={playerPokemon.sprites.front_default}
        />
        <div className="vertical-line" />
        <Player
          playerName={"Opponent"}
          wins={opponentWins}
          dice={opponentDice}
          life={opponentLife}
          image={opponentPokemon.sprites.front_default}
        />
      </div>
      {winStatus != null && <div className={statusCss}>{statusText}</div>}
    </div>
  );
};

export default BattleArea;
