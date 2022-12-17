import React from "react";
import Dice from "./Dice";
import HealthBar from "./HealthBar";

import "./Player.css";

const Player = function ({ playerName, wins, image, dice, life }) {
  return (
    <div className="player">
      <div className="player-body">
        <div className="player-title">
          <img
            alt="POKEMON NAME"
            className="player-image"
            src={image}
            width="100"
            height="100"
          />
          <h4>{playerName}</h4>
          <h6>(Total: {wins})</h6>
        </div>
        <HealthBar value={life} />
        <Dice value={dice} />
      </div>
    </div>
  );
};

export default Player;
