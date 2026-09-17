const searchInput = document.querySelector('input[type="search"]');
const searchButton = document.querySelector("header button");

searchInput.addEventListener("input", function () {
    const zoekterm = searchInput.value.toLowerCase();

    cards.forEach(function (card) {
        const naam = card.querySelector("h2").textContent.toLowerCase();

        if (naam.includes(zoekterm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

const cards = document.querySelectorAll(".card-preview div");
const arrows = document.querySelectorAll(".arrow");

let currentCard = 0;

function showCards() {
    cards.forEach(function (card) {
        card.style.display = "none";
    });

    cards[currentCard].style.display = "block";
    cards[currentCard + 1].style.display = "block";
    cards[currentCard + 2].style.display = "block";
}

showCards();

arrows[0].addEventListener("click", function () {
    currentCard -= 3;

    if (currentCard < 0) {
        currentCard = cards.length - 3;
    }

    showCards();
});

arrows[1].addEventListener("click", function () {
    currentCard += 3;

    if (currentCard >= cards.length) {
        currentCard = 0;
    }

    showCards();
});

cards.forEach(function (card) {
    card.addEventListener("click", function () {
        const image = card.querySelector("img");

        window.open(image.src, "_blank");
    });
});


const sections = document.querySelectorAll("header, main > section");
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        sections.forEach(function(section) {
            section.style.display = "none";
        });

        const target = document.querySelector(link.getAttribute("href"));
        target.style.display = "block";
    });
});

sections.forEach(function(section) {
    section.style.display = "none";
});

document.querySelector("#home").style.display = "block";