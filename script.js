
let page = 1;

const statusText = document.getElementById("status"); // loading and error message
const results = document.getElementById("results"); // where the cards go
const pageLabel = document.getElementById("page-label"); // page 1 of 42
const prevButton = document.getElementById("prev-btn"); // the prev button
const nextButton = document.getElementById("next-btn"); // the next button


async function loadPage() {
    try { 
        const url = `https://rickandmortyapi.com/api/character?page=${page}`;
        results.textContent = ""; // clear old cards
        statusText.textContent = ""; // Loading

        const response = await fetch(url);

        // not ok check message and return
        if (!response.ok) {
            statusText.textContent = 'Something went wrong (status ${response.status}). Try again.';
            return;
        }

        const data = await response.json();
        console.log(data);
        const totalPages = Math.ceil(data.info.count / 20);
        pageLabel.textContent = `Pages ${page} of ${totalPages}`;
        prevButton.disabled = page === 1;
        nextButton.disabled = page === totalPages;
        statusText.textContent = ""; // clear statusText

        showCards(data.results); // Call it

     } catch (error) {
       console.log(error);
       statusText.textContent = "Can't reach the Rick and Morty server. Check your internet and try again.";
    }
}

function showCards(characters) {
  characters.forEach(function (character) {
    const column = document.createElement("div");
    column.className = "col-6 col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100 p-2";

    const picture = document.createElement("img");
    picture.src = character.image;
    picture.alt = character.name;
    picture.className = "img-fluid rounded mb-2";
    card.appendChild(picture);

    const name = document.createElement("h3");
    name.className = "h6";
    name.textContent = character.name;
    card.appendChild(name);

    const info = document.createElement("p");
    info.className = "small mb-0";
    info.textContent = `${character.species} · ${character.status}`;
    card.appendChild(info);

    if (character.status === "Dead") {
      card.classList.add("dead");
    }

    column.appendChild(card);
    results.appendChild(column);
  });
}

function nextPage() {
    page = page + 1;
    loadPage();
}
nextButton.addEventListener("click", nextPage);

function prevPage() {
    page = page - 1;
    loadPage();
}

prevButton.addEventListener("click", prevPage);

loadPage();
