import React, { createContext, useState, useEffect } from "react";
import pokemonService from "../Services/pokemon-service";

export const BattleContext = createContext();

export const BattleProvider = (props) => {
  // player state
  const [playerLife, setPlayerLife] = useState();
  const [playerWins, setPlayerWins] = useState();
  const [playerDice, setPlayerDice] = useState();
  const [playerPokemon, setPlayerPokemon] = useState();
  const [playerExtraRound, setPlayerExtraRound] = useState(false);

  // opponent state
  const [opponentLife, setOpponentLife] = useState();
  const [opponentWins, setOpponentWins] = useState();
  const [opponentDice, setOpponentDice] = useState();
  const [opponentPokemon, setOpponentPokemon] = useState();
  const [opponentExtraRound, setOpponentExtraRound] = useState(false);

  // battle state
  const [initialized, setInitialized] = useState(false);
  const [play, setPlay] = useState(false);
  const [winStatus, setWinStatus] = useState();
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    pokemonService.getAll().then((data) => {
      setPokemons(data);
    });
  }, []);

  useEffect(() => {
    if (pokemons && pokemons.length > 0) {
      reset().then(() => {
        setPlay(true);
        setInitialized(true);
      });
    }
  }, [pokemons]);

  const reset = async () => {
    setPlayerLife(100);
    setPlayerWins(0);
    setPlayerDice(1);
    setPlayerPokemon(await randomPokemon());

    setOpponentLife(100);
    setOpponentWins(0);
    setOpponentDice(1);
    setOpponentPokemon(await randomPokemon());

    setPlay(true);
    setWinStatus(null);
  };

  const attack = () => {
    if (!play) return;

    const newPlayerDice = opponentExtraRound ? 0 : randomDice();
    const newOpponentDice = playerExtraRound ? 0 : randomDice();

    let newPlayerLife = playerLife - newOpponentDice;
    if (newPlayerLife < 0) newPlayerLife = 0;

    let newOpponentLife = opponentLife - newPlayerDice;
    if (newOpponentLife < 0) newOpponentLife = 0;

    setPlayerDice(newPlayerDice);
    setPlayerLife(newPlayerLife);
    setOpponentDice(newOpponentDice);
    setOpponentLife(newOpponentLife);

    if (newPlayerLife == 0 || newOpponentLife == 0) {
      setPlay(false);

      if (newPlayerLife == 0 && newOpponentLife == 0) {
        setWinStatus("tie");
        setPlayerWins((w) => w + 1);
        setOpponentWins((w) => w + 1);
      } else if (newOpponentLife == 0) {
        setWinStatus("player");
        setPlayerWins((w) => w + 1);
      } else {
        setWinStatus("opponent");
        setOpponentWins((w) => w + 1);
      }
    }
    console.log(`calcLife newPlayerDice ${newPlayerDice} playerLife ${playerLife}, newOpponentDice ${newOpponentDice} oppnentLife ${opponentLife}`);
    if(play) {
      if(newPlayerDice == 6) {
        setPlayerExtraRound(true)
      } else {
        setPlayerExtraRound(false)
      }
  
      if (newOpponentDice == 6) {
       setOpponentExtraRound(true)
      } else {
        setOpponentExtraRound(false)
      }
    }
    
};

  const randomDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const randomPokemon = async () => {
    var pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
    return await pokemonService.getPokemonData(pokemon);
  };

  const fightAgain = () => {
    setPlay(true);
    setPlayerLife(100);
    setOpponentLife(100);
    setWinStatus(null);
  };

  const value = {
    playerLife,
    opponentLife,
    playerWins,
    opponentWins,
    playerDice,
    opponentDice,
    playerPokemon,
    opponentPokemon,
    attack,
    reset,
    fightAgain,
    initialized,
    play,
    winStatus,
  };

  return (
    <BattleContext.Provider value={value}>
      {props.children}
    </BattleContext.Provider>
  );
};
