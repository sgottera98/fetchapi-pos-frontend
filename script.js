const baseURL = 'https://pokeapi.co/api/v2';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar dados da API: ${error}`);
    return null;
  }
};

const getPokemon = (id) => fetchData(`pokemon/${id}`);

const getTypes = () => fetchData('type');

const getAbility = (id) => fetchData(`ability/${id}`);

const renderPokemonInfo = (pokemon) => {
  const container = document.getElementById('pokemon-info');
  if (pokemon) {
    const pokemonHTML = `
      <div class='pokemon-card'>
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Tipo:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      </div>
    `;
    container.innerHTML = pokemonHTML;
  } else {
    container.innerHTML = '<p>Esse id de Pokémon não existe </p>';
  }
};

const init = async () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', async () => {
    const pokemonId = document.getElementById('pokemon-id').value;
    if (pokemonId) {
      const pokemon = await getPokemon(pokemonId);
      renderPokemonInfo(pokemon);
    }
  });

  const defaultPokemon = await getPokemon(1);
  renderPokemonInfo(defaultPokemon);
};

init();
