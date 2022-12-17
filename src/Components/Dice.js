import React from "react";

import dice0 from "../Images/dice0.svg";
import dice1 from "../Images/dice1.svg";
import dice2 from "../Images/dice2.svg";
import dice3 from "../Images/dice3.svg";
import dice4 from "../Images/dice4.svg";
import dice5 from "../Images/dice5.svg";
import dice6 from "../Images/dice6.svg";

const DICES = [dice0,dice1, dice2, dice3, dice4, dice5, dice6];

const Dice = ({ value }) => {
  return (
    <div>
      <img src={DICES[value]} alt="Dice" height="80" width="80" />
    </div>
  );
};

export default Dice;
