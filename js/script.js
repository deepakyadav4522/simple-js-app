const pokemonList = [
    {name: 'Bulbasaur', height: 7, type: ['grass', 'poison']},
    {name: 'Pikachu', height: 8, type: ['Electic', 'speed']},
    {name: 'Charizard', height: 15, type: ['fire', 'flying']}
];

for (let i = 0; i < pokemonList.length; i++) {
    

    if(pokemonList[i].height < 10)
    {document.write(pokemonList[i].name + " is " + pokemonList[i].height + " meter tall." + '<br>')
}   else
    {document.write(pokemonList[i].name + " is " + pokemonList[i].height + " meter tall. " + " - Wow, that's big!"+ '<br>')};

}    