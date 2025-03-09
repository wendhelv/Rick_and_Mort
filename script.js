let currentPage = 1
const charactersElement = document.getElementById("characters")
const characterViewElement = document.getElementById("characterView")
const modal = document.getElementById("characterView")
const closeBtn = document.getElementsByClassName("close")[0]

const fetchCharacters = (page) => {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      charactersElement.innerHTML = ""
      data.results.forEach((character) => {
        const charElement = document.createElement("div")
        charElement.className = "character-card"
        charElement.innerHTML = `
                    <img src="${character.image}" alt="${character.name}" />
                    <p>${character.name}</p>
                `
        charactersElement.appendChild(charElement)
        charElement.addEventListener("click", () => {
          viewCharacterDetails(character.id)
        })
      })
      document.getElementById("prev").disabled = !data.info.prev
      document.getElementById("next").disabled = !data.info.next
    })
}

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--
    fetchCharacters(currentPage)
  }
})

document.getElementById("next").addEventListener("click", () => {
  currentPage++
  fetchCharacters(currentPage)
})

document.getElementById("first").addEventListener("click", () => {
  currentPage = 1
  fetchCharacters(currentPage)
})

fetchCharacters(currentPage)

const viewCharacterDetails = (id) => {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.json())
    .then((character) => {
      document.getElementById("characterName").innerText = character.name
      document.getElementById("characterImage").src = character.image
      document.getElementById("characterStatus").innerText = `Status: ${character.status}`
      document.getElementById("characterSpecies").innerText = `Species: ${character.species}`
      document.getElementById("characterGender").innerText = `Gender: ${character.gender}`
      document.getElementById("characterOrigin").innerText = `Origin: ${character.origin.name}`
      document.getElementById("characterLocation").innerText = `Location: ${character.location.name}`
      modal.style.display = "block"
    })
}

closeBtn.onclick = () => {
  modal.style.display = "none"
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase()
  const cards = document.querySelectorAll(".character-card")
  cards.forEach((card) => {
    const name = card.querySelector("p").innerText.toLowerCase()
    card.style.display = name.includes(searchTerm) ? "block" : "none"
  })
})

