let pokemonRepository = (function () {
    const pokemonList = [
        {name: 'Bulbasaur', height: 7, type: ['grass', 'poison']},
        {name: 'Pikachu', height: 8, type: ['Electic', 'speed']},
        {name: 'Charizard', height: 15, type: ['fire', 'flying']}
    ];


    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " is " + pokemon.height + " meter tall <br>" ); 
});
  