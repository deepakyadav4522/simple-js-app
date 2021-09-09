let pokemonRepository = (function () {
    let pokemonList = [
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

    function addListItem(pokemon) {
        let pokemonUl = document.querySelector('.pokemon-list');
        let listItem  = document.createElement('li');
        listItem.classList.add('listItem');
        let button = document.createElement('button');
        button.classList.add('btn-class');
        button.innerText = pokemon.name;
        listItem.appendChild(button);
        pokemonUl.appendChild(listItem);
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails

    };
})();
  
pokemonRepository.add({name: "Onix", height: 20, type: ["rock", "earth"]});  
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});