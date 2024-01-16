const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const shinyImage = document.querySelector(".shiny__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const shiny = document.querySelector(".buttonshiny");
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status == 200) {
    const dados = await APIResponse.json();
    return dados;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  const dados = await fetchPokemon(pokemon);
  if (dados) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = dados.name;
    pokemonNumber.innerHTML = dados.id;
    pokemonImage.src =
      dados["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    shinyImage.src =
      dados["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_shiny"
      ];
    input.value = "";
    searchPokemon = dados.id;
    shinyImage.style.display = "none";
  } else {
    pokemonName.innerHTML = "Not Found :c";
    pokemonNumber.innerHTML = "";
    pokemonImage.style.display = "none";
  }
};

// entender essa passagem!!!
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

shiny.addEventListener("click", () => {
  if (pokemonImage.style.display === "block") {
    pokemonImage.style.display = "none";
    shinyImage.style.display = "block";
  } else {
    pokemonImage.style.display = "block";
    shinyImage.style.display = "none";
  }
});

renderPokemon(searchPokemon);
