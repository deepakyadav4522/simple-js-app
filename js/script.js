let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
    

    

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

    function loadList() {
        return fetch(apiUrl).then(function (response) 
        {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
                
            });

        }).catch(function (e) {
            console.log(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.log(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
        showModal(pokemon);
        });
    }

    let modalContainer = document.querySelector('#modal-container');
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalConatiner.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;


        let contentElement = document.createElement('p');
        let pokemonHeight = pokemon.height;
        let pokemonTypes = [];

        object.keys(pokemon.type).forEach(key => {
            pokemonTypes.push(pokemon.type[key].type.name);
        });

        contentElement.innerText = 'Height: ' + pokemonHeight + ' \n'
                                    +'Types: ' + pokemonTypes;

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
    }

    let dialPromiseReject;

    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if(dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    
 
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal

    };
})();
  


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
})

