import KAARTEN_INFO from "../assets/KaartInformatie.json" with { type: "json" };

//Deze wordt gebruikt om tekst in alfabetische volgorde te zetten.
const COLLATOR = Intl.Collator("nl");

const KAART_SCROLL_BREEDTE = 18*16 + 16; //Kaartbreedte: 18rem. gap: 1rem.

plaatsVisitekaartjes();
plaatsKnopActies();

function plaatsKnopActies() {
    document.querySelector("form").addEventListener("submit", gebruikZoektekst);

    let kaartContainer = document.querySelector(".visitekaartjes");

    document.querySelector(".kaartBrowser > button:nth-of-type(1)")
        .addEventListener(
            "click",
            //Scroll naar links: 18rem: breedte, 1rem: gap.
            () => kaartContainer.scrollBy({left: -KAART_SCROLL_BREEDTE, behavior: "smooth"}));

    document.querySelector(".kaartBrowser > button:nth-of-type(2)")
        .addEventListener(
            "click",
            //Scroll naar rechts: 18rem: breedte, 1rem: gap.
            () => kaartContainer.scrollBy({left: KAART_SCROLL_BREEDTE, behavior: "smooth"}));
}



function plaatsVisitekaartjes() {
    let container = document.querySelector(".visitekaartjes")

    let kaartenGesorteerd = KAARTEN_INFO.toSorted(
        (a, b) => COLLATOR.compare(a.naam, b.naam))

    for (let info of kaartenGesorteerd) {
        let kaartje = maakVisitekaartje(info)
        container.appendChild(kaartje)
    }
}

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
    link.setAttribute("target", "_blank")

    let linkAfbeelding = maakLinkAfbeelding()
    link.appendChild(linkAfbeelding)

    resultaat.appendChild(naam)
    resultaat.appendChild(afbeeldingContainer)
    resultaat.appendChild(link)

    return resultaat;
}

function maakLinkAfbeelding() {
    let resultaat = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    resultaat.setAttribute("viewBox", "0 0 64 64")

    let useElement = document.createElementNS("http://www.w3.org/2000/svg", "use")
    useElement.setAttribute("href", "assets/joost/LinkExtern.svg#icoon")
    resultaat.appendChild(useElement)

    return resultaat;
}
