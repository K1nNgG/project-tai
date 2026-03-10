// Zmienia sekcję Matematyka
function zmien1() {
    document.getElementById("mFunkcja").style.display = "flex";
}

// Zmienia sekcję Ekonomia
function zmien2() {
    document.getElementById("eFunkcja").style.display = "flex";
}

// Ukrywa zmienioną sekcję Matematyka
function zPowrotem1() {
    document.getElementById("mFunkcja").style.display = "none";
    document.getElementById("mFunkcja").style.boxSizing = "border-box";
}

// Ukrywa zmienioną sekcję Ekonomia
function zPowrotem2() {
    document.getElementById("eFunkcja").style.display = "none";
    document.getElementById("eFunkcja").style.boxSizing = "border-box";
}