import KAARTEN_INFO from "../assets/KaartInformatie.json" with { type: "json" };

//Deze wordt gebruikt om tekst in alfabetische volgorde te zetten.
const COLLATOR = Intl.Collator("nl");

let container = document.querySelector(".visitekaartjes")

let kaartenGesorteerd = KAARTEN_INFO.toSorted(
    (a, b) => COLLATOR.compare(a.naam, b.naam))

for (let info of kaartenGesorteerd) {
    let kaartje = maakVisitekaartje(info)
    container.appendChild(kaartje)
}

document.querySelector("form").addEventListener("submit", gebruikZoektekst);

function gebruikZoektekst(event) {
    event.preventDefault();

    let zoektekst = document.querySelector("input[name=\"zoektekst\"]").value;

    if(zoektekst) {
        toonKaartenMetOvereenkomendeZoektekst(zoektekst);
    }
    else {
        toonAlleKaarten();
    }
}

function toonKaartenMetOvereenkomendeZoektekst(zoektekst) {
    let kaarten = document.querySelectorAll(".visitekaartjes > article");
    for (let kaart of kaarten) {
        let naam = kaart.children[0].textContent;
        if (naam.includes(zoektekst)) {
            kaart.classList.remove("verdwenen");
        }
        else {
            kaart.classList.add("verdwenen");
        }
    }
}

function toonAlleKaarten() {
    let kaarten = document.querySelectorAll(".visitekaartjes > article");
    for (let kaart of kaarten) {
        kaart.classList.remove("verdwenen");
    }
}

//Maak een <article> met daarin een <h2>, een <div> en een <a>.
//Hierin zitten respectievelijk: De naam van de persoon, een <img>
//met daarin de afbeelding en de link naar het visitekaartje.
function maakVisitekaartje(info) {
    let resultaat = document.createElement("article")
    let naam = document.createElement("h2")
    naam.append(info.naam)

    let afbeeldingContainer = document.createElement("div")

    let afbeelding = document.createElement("img")
    afbeelding.setAttribute("src", info.bestand)
    afbeeldingContainer.appendChild(afbeelding)

    let link = document.createElement("a")
    link.setAttribute("href", info.link)
    link.append("=>");

    resultaat.appendChild(naam)
    resultaat.appendChild(afbeeldingContainer)
    resultaat.appendChild(link)

    return resultaat;
}
