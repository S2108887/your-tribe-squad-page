import KAARTEN_INFO from "../assets/KaartInformatie.json" with { type: "json" };

//Deze wordt gebruikt om tekst in alfabetische volgorde te zetten.
const COLLATOR = Intl.Collator("nl")

const KAART_SCROLL_BREEDTE = 18*16 + 16 //Kaartbreedte: 18rem. gap: 1rem.

plaatsVisitekaartjes()
plaatsKnopActies()

function plaatsKnopActies() {
    document.querySelector("form").addEventListener("submit", gebruikZoektekst)

    let kaartContainer = document.querySelector(".visitekaartjes")

    document.querySelector(".kaartBrowser > button:nth-of-type(1)")
        .addEventListener(
            "click",
            //Scroll naar links: 18rem: breedte, 1rem: gap.
            () => kaartContainer.scrollBy({left: -KAART_SCROLL_BREEDTE, behavior: "smooth"}))

    document.querySelector(".kaartBrowser > button:nth-of-type(2)")
        .addEventListener(
            "click",
            //Scroll naar rechts: 18rem: breedte, 1rem: gap.
            () => kaartContainer.scrollBy({left: KAART_SCROLL_BREEDTE, behavior: "smooth"}))
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
    event.preventDefault()

    let zoektekst = document.querySelector("input[name=\"zoektekst\"]").value

    if (zoektekst) {
        toonKaartenMetOvereenkomendeZoektekst(zoektekst)
    }
    else {
        toonAlleKaarten()
    }

    //Scroll de kaartcontainer terug naar het begin.
    document.querySelector(".visitekaartjes").scroll({left: 0, behavior: "smooth"})
}

function toonKaartenMetOvereenkomendeZoektekst(zoektekst) {
    let kaarten = document.querySelectorAll(".visitekaartjes > article")
    for (let kaart of kaarten) {
        let naam = kaart.children[0].textContent
        if (naam.includes(zoektekst)) {
            kaart.classList.remove("verdwenen")
        }
        else {
            kaart.classList.add("verdwenen")
        }
    }
}

function toonAlleKaarten() {
    let kaarten = document.querySelectorAll(".visitekaartjes > article")
    for (let kaart of kaarten) {
        kaart.classList.remove("verdwenen")
    }
}

//Maak een <article> met daarin een <h2>, een <div>, een <a> en een <button>.
//Hierin zitten respectievelijk: De naam van de persoon, een <img>
//met daarin de afbeelding, de link naar het visitekaartje en een knop om de afbeelding
// groot te tonen.
function maakVisitekaartje(info) {
    let resultaat = document.createElement("article")
    let naam = document.createElement("h2")
    naam.append(info.naam)

    let afbeeldingContainer = document.createElement("div")

    let afbeelding = maakImgElement(info.bestand, "Visitekaartje van " + info.naam)
    afbeeldingContainer.appendChild(afbeelding)
    //Klikken op de afbeeldingcontainer maakt het inzoomen op de afbeelding weer ongedaan.
    afbeeldingContainer.addEventListener("click", stopZoomAfbeeldingActie)

    let link = document.createElement("a")
    link.setAttribute("href", info.link)
    link.setAttribute("target", "_blank")

    let linkIcoon = maakLinkIcoon()
    link.appendChild(linkIcoon)

    let zoomknop = document.createElement("button")
    let zoomIcoon = maakZoomIcoon()
    zoomknop.appendChild(zoomIcoon)
    zoomknop.addEventListener("click", zoomAfbeeldingActie)

    resultaat.appendChild(naam)
    resultaat.appendChild(afbeeldingContainer)
    resultaat.appendChild(link)
    resultaat.appendChild(zoomknop)

    return resultaat
}

function maakImgElement(src, alt) {
    let resultaat = document.createElement("img");
    resultaat.setAttribute("src", src);
    resultaat.setAttribute("alt", alt);
    return resultaat;
}

function maakLinkIcoon() {
    return maakSvgIcoonElement("assets/joost/LinkExtern.svg#icoon")
}

function maakZoomIcoon() {
    return maakSvgIcoonElement("assets/joost/ZoomIn.svg#icoon")
}

function maakSvgIcoonElement(href) {
    let resultaat = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    resultaat.setAttribute("viewBox", "0 0 64 64")

    let useElement = document.createElementNS("http://www.w3.org/2000/svg", "use")
    useElement.setAttribute("href", href)
    resultaat.appendChild(useElement)

    return resultaat
}

//Plaats de class "zoomAfbeelding" op het article-element dat de zoomknop bevat.
function zoomAfbeeldingActie(event) {
    //Ik gebruik event.currentTarget in plaats van event.target, want in het tweede geval
    //kan je het button-element of het svg-element verkrijgen afhankelijk van waar je klikt op de knop.
    //currentTarget geeft altijd de knop.
    let knop = event.currentTarget
    let article = knop.parentElement
    article.classList.add("zoomAfbeelding")
}

function stopZoomAfbeeldingActie(event) {
    //Zie de uitleg bij zoomAfbeeldingActie.
    let afbeeldingContainer = event.currentTarget
    let article = afbeeldingContainer.parentElement

    article.classList.remove("zoomAfbeelding")
}
