document.querySelector("button").addEventListener("click", plaatsJsonInKlembord)

function plaatsJsonInKlembord() {
    console.log("Hello, World!")
    fetch("Kaartinformatie.csv")
        .then(respons => respons.text())
        .then(tekst => leesTekstEnMaakJson(tekst))
        .then(json => stopInKlembord(json))
}

function leesTekstEnMaakJson(tekst) {
    let kaartenInfo = [];
    
    let regels = tekst.split("\n")
        .slice(1) //Sla de regel met de kolomnamen over.

    for (let regel of regels) {
        plaatsKaartInformatie(regel, kaartenInfo);
    }

    //Maak de json-tekst. Gebruik 2 spaties om de regels in te laten springen.
    return JSON.stringify(kaartenInfo, undefined, 2)
}

function plaatsKaartInformatie(regel, kaartenInfo) {
    //Sla (vrijwel) lege regels over.
    if (regel.length < 5) {
        return
    }

    let kaartInfo = {};

    let delen = regel.split(";")
    kaartInfo.nummer = Number.parseInt(delen[0], 10)
    kaartInfo.naam = delen[1]
    kaartInfo.link = delen[2]
    kaartInfo.bestand = "assets/kaartjes/" + delen[3];

    kaartenInfo.push(kaartInfo);
}

async function stopInKlembord(json) {
    console.log(json);

    await navigator.clipboard.writeText(json);

    document.querySelector("button + p").classList.remove("verborgen")
}