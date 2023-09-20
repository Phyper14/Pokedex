const getPokemons = async () => {
    let pokemonResponse = await (await fetch("https://pokeapi.co/api/v2/pokemon", { method: 'GET' })).json()
    console.log(pokemonResponse)
    let pokemons = pokemonResponse.results
    let fixedPokemons = [];
    // if (pokemons.length > 1) {
    for (const key in pokemons) {
        if (Object.hasOwnProperty.call(pokemons, key)) {
            const element = pokemons[key];
            let thisPokemonResponse = await (await fetch(element.url, { method: 'GET' })).json()
            let thisPokemon = {}
            thisPokemon.name = thisPokemonResponse.name
            thisPokemon.order = thisPokemonResponse.order
            thisPokemon.defaultSprite = thisPokemonResponse.sprites.front_default
            fixedPokemons.push(thisPokemon)
        }
    }
    return fixedPokemons
}

getPokemons().then((pokemons) => {
    const main = document.getElementById("pokemonList")
    pokemons.map((pokemon) => {
        const pokemonImage = document.createElement("img")
        pokemonImage.src = pokemon.defaultSprite
        const pokemonName = document.createElement("h4")
        pokemonName.innerHTML = `${pokemon.order} - ${pokemon.name}`
        pokemonName.className = "pokemonName"
        const thisElement = document.createElement("div")
        thisElement.append(pokemonImage, pokemonName)
        thisElement.className= "pokemonCard"
        main.append(thisElement)
    })
})