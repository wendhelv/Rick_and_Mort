fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        const characters = data.results;

        const charactersElement = document.getElementById('characters');

        characters.forEach(character => {
            const charElement = document.createElement('li');
            charElement.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />
        <p>${character.name}</p>
      `;
            charactersElement.appendChild(charElement);

            charElement.addEventListener('click', () => {
                view(character.id)
            })
        })
    })

const characterViewElement = document.getElementById('characterView')

const view = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.json())
        .then(character => {
            const nameElement = document.getElementById('name')
            const statusElement = document.getElementById('status')
            const originElement = document.getElementById('origin')

            nameElement.innerText = character.name;
            statusElement.innerText = character.status;
            originElement.innerText = character.origin.name;

            characterViewElement.style.display = 'block';
        })
}

const closeElement = document.getElementById('close')
closeElement.addEventListener('click', () => {
    characterViewElement.style.display = 'none';
})