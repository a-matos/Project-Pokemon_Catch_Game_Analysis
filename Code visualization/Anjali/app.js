const base = "https://pokeapi.co/api/v2/pokemon/";
const card = document.querySelector('.card');
const card__inner = document.querySelector('.card__inner');
const searchPoke = document.getElementById('search-poke');
const pokeImg = document.querySelector('.poke-img');
const searchButton = document.getElementById('search-button');
const randomButton = document.getElementById('random-button');
const form = document.getElementById('form');
const body = document.querySelector('body');
const cardFaceFront = document.querySelector(".card__face--front");


// get data from api

const getPokemon = async (pokemon) => {
    const response = await fetch(base + pokemon);
    const data = await response.json();
    return {
        name: data.species.name,
        id: data.id,
        img: data.sprites.other['official-artwork'].front_default,
        weight: data.weight,
        height: data.height,
        type: data.types[0].type.name
    };
}

// get random pokemon from api

const getRandomPokemon = async (id) => {
    const response = await fetch(base + id);
    const data = await response.json();
    return {
        name: data.species.name,
        id: data.id,
        img: data.sprites.other['official-artwork'].front_default,
        weight: data.weight,
        height: data.height,
        type: data.types[0].type.name
    };
}


// event listeners

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchPoke.value == '') {
        showAlert('Please enter a pokemon', 'error');
    } else {
        const pokemon = searchPoke.value.trim().toLowerCase();
        form.reset();
        card__inner.classList.remove('is-flipped');
        getPokemon(pokemon)
            .then(data => cardFaceFront.innerHTML =
                `                
                        <div class="poke-img">
                            <img src="${ data.img }">
                        </div>
                        <div class="poke-name">
                            <h1>${ data.name }</h1>
                            <div class="poke-id">
                                <h2>#${ data.id }</h2>
                            </div>
                            <div class="poke-icon">
                                <img src="images/pokeball-icon-small.png"
                            </div>
                        </div>
                        <div class="poke-type ${ data.type }">
                            <h2>Type: ${ data.type }</h2>
                        </div>
                        <ul class="poke-body-stats">
                            <li class="poke-weight">Weight: ${ data.weight }</li>
                            <li class="poke-height">Height: ${ data.height }</li>
                        </ul>
                        </div>
                    </div>
                </div>
            `
            )
            .then(cardFaceFront.style.border = "25px solid #192653")
            .catch(err => console.log(err));
    }
})

card__inner.addEventListener("click", function () {
    card__inner.classList.toggle('is-flipped');
})

// random-button event listener

randomButton.addEventListener('click', () => {
    let randomNumber = Math.ceil(Math.random() * 898);
    card__inner.classList.remove('is-flipped');
    getRandomPokemon(randomNumber)
        .then(data => cardFaceFront.innerHTML =
            `                
                <div class="poke-img">
                    <img src="${ data.img }">
                </div>
                <div class="poke-name">
                    <h1>${ data.name }</h1>
                    <div class="poke-id">
                        <h2>#${ data.id }</h2>
                    </div>
                    <div class="poke-icon">
                        <img src="images/pokeball-icon-small.png"
                    </div>
                </div>
                <div class="poke-type ${ data.type }">
                    <h2>Type: ${ data.type }</h2>
                </div>
                <ul class="poke-body-stats">
                    <li class="poke-weight">Weight: ${ data.weight }</li>
                    <li class="poke-height">Height: ${ data.height }</li>
                </ul>
                </div>
            </div>
        </div>
    `
        )
        .then(cardFaceFront.style.border = "25px solid #192653")
        .catch(err => console.log(err));
})

// show alert

function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `${ className }`;
    div.style.position = 'absolute';
    div.style.top = '65px';
    div.appendChild(document.createTextNode(message));
    body.insertBefore(div, form);
    setTimeout(function () {
        div.remove()
    }, 2000)
}

// bug when at the start you enter a word that is not a pokemon, card flips anyway


