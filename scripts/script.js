import kaartenInfo from "../assets/KaartInformatie.json" with { type: "json" };

let container = document.querySelector(".visitekaartjes")

for (let info of kaartenInfo) {
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

//Maak een <article> met daarin een <h2> een <img> en een <a>.
//Hierin zitten respectievelijk: De naam van de persoon, de afbeelding
//Van het visitekaartje en de link naar het visitekaartje.
function maakVisitekaartje(info) {
    let resultaat = document.createElement("article")
    let naam = document.createElement("h2")
    naam.append(info.naam);

    let afbeelding = document.createElement("img")
    afbeelding.setAttribute("src", info.bestand)
    
    let link = document.createElement("a")
    link.setAttribute("href", info.link)
    link.append("=>");

    resultaat.appendChild(naam)
    resultaat.appendChild(afbeelding)
    resultaat.appendChild(link)

    return resultaat;
}
