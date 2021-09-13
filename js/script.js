let pokemonRepository = (function(){

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=48';

    function add(pokemon){
        
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){

        let myList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');

        listItem.classList.add('.listItem');

        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-panel', 'btn', 'btn-dark');

        
        listItem.appendChild(button);

        myList.appendChild(listItem);

        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }

    


    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json(); 
        }).then(function(json) {
            json.results.forEach(function(item){
                let pokemon = {
                    name : item.name,
                    detailsUrl : item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {

            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.type = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }


    function showDetails(pokemon){
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
    
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');

        let pokeHeight = pokemon.height / 10; 
        let pokeTypes = [];
        
        
        Object.keys(pokemon.type).forEach(key => {
            pokeTypes.push(pokemon.type[key].type.name); 
        });

        

        contentElement.innerText = 'Height: ' + pokeHeight + ' m '+ '\r\n' 
                                     
                                    + 'Types: ' + pokeTypes;
                                    

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        imageElement.setAttribute('alt','Front view of' + pokemon.name);

        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;

    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList. contains('is-visible')) {
            hideModal();
        } 
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal:hideModal
    };

})();



pokemonRepository.loadList().then(function(){

    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});