const GET_ALL_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154";

let allPokemons = null;

const cachePokemons = {};

const getAll = async () => {
  if (!allPokemons) {
    var response = await fetch(GET_ALL_URL);
    var data = await response.json();
    allPokemons = data.results;
  }

  return allPokemons;
};

const getPokemonData = async (pokemon) => {
  if (!cachePokemons[pokemon.name]) {
    var response = await fetch(pokemon.url);
    var data = await response.json();
    cachePokemons[pokemon.name] = data;
  }

  console.log({ p: cachePokemons[pokemon.name] });

  return cachePokemons[pokemon.name];
};

export default { getAll, getPokemonData };
