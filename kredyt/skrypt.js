/* =====================================================
   POBRANIE ELEMENTÓW HTML
===================================================== */

const formularz = document.getElementById("loanForm");
const sekcjaWynikow = document.getElementById("wyniki");
const tabelaBody = document.querySelector("#results tbody");

/* Pola formularza */
const pola = {
    kwota: document.getElementById("kwota"),
    raty: document.getElementById("raty"),
    oprocentowanie: document.getElementById("oprocentowanie")
};

/* Chmurki z błędami */
const podpowiedzi = {
    kwota: document.getElementById("kwotaTooltip"),
    raty: document.getElementById("ratyTooltip"),
    oprocentowanie: document.getElementById("oprocentowanieTooltip")
};
/* =====================================================
   FUNKCJE POMOCNICZE
===================================================== */

/* 
   Funkcja usuwa z tekstu:
   - spacje
   - zł
   - %
   - zamienia przecinek na kropkę
   Następnie zamienia tekst na liczbę
*/
function pobierzLiczbe(wartosc) {

    wartosc = wartosc
        .replace(/\s/g, "")
        .replace("zł", "")
        .replace("%", "")
        .replace(",", ".");

    return parseFloat(wartosc);
}
/* 
   Funkcja formatuje liczby np.
   10000 -> 10 000
*/
function formatujLiczbe(liczba) {

    return liczba
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
/*
   Sprawdza czy pole zawiera poprawną liczbę
*/
function sprawdzPole(input, tooltip) {

    const liczba = pobierzLiczbe(input.value);

    if (isNaN(liczba) || liczba < 0) {

        input.classList.add("error");
        tooltip.style.display = "block";

        return false;
    }

    input.classList.remove("error");
    tooltip.style.display = "none";

    return true;
}
/* =====================================================
   WALIDACJA PODCZAS WPISYWANIA
===================================================== */

for (let nazwa in pola) {

    pola[nazwa].addEventListener("input", () => {

        sprawdzPole(pola[nazwa], podpowiedzi[nazwa]);
    });
}
/* =====================================================
   FORMATOWANIE PÓL
===================================================== */

/* Kwota -> np. 10 000 zł */
pola.kwota.addEventListener("blur", function () {

    let liczba = pobierzLiczbe(this.value);

    if (!isNaN(liczba)) {
        this.value = formatujLiczbe(liczba) + " zł";
    }
});
/* Oprocentowanie -> np. 5 % */
pola.oprocentowanie.addEventListener("blur", function () {

    let liczba = pobierzLiczbe(this.value);

    if (!isNaN(liczba)) {
        this.value = liczba + " %";
    }
});
/* Liczba rat -> liczba całkowita */
pola.raty.addEventListener("blur", function () {

    let liczba = parseInt(pobierzLiczbe(this.value));

    if (!isNaN(liczba)) {
        this.value = liczba;
    }
});
/* =====================================================
   OBLICZENIE RAT MALEJĄCYCH
===================================================== */
formularz.addEventListener("submit", function (e) {

    e.preventDefault();

    /* Sprawdzenie czy wszystkie dane są poprawne */
    if (
        !sprawdzPole(pola.kwota, podpowiedzi.kwota) ||
        !sprawdzPole(pola.raty, podpowiedzi.raty) ||
        !sprawdzPole(pola.oprocentowanie, podpowiedzi.oprocentowanie)
    ) {
        alert("Popraw dane");
        return;
    }
    const kwota = pobierzLiczbe(pola.kwota.value);
    const liczbaRat = parseInt(pobierzLiczbe(pola.raty.value));
    const oprocentowanie = pobierzLiczbe(pola.oprocentowanie.value);

    const czescKapitalowa = kwota / liczbaRat;
    const stopaMiesieczna = oprocentowanie / 12 / 100;

    let pozostalyKapital = kwota;
    let sumaDoZaplaty = 0;

    tabelaBody.innerHTML = "";

    /* Pętla generująca kolejne raty */
    for (let i = 1; i <= liczbaRat; i++) {

        const odsetki = pozostalyKapital * stopaMiesieczna;
        const rata = czescKapitalowa + odsetki;

        const wiersz = document.createElement("tr");

        wiersz.innerHTML = `
            <td>${i}</td>
            <td>${czescKapitalowa.toFixed(2)} zł</td>
            <td>${odsetki.toFixed(2)} zł</td>
            <td>${rata.toFixed(2)} zł</td>
        `;

        tabelaBody.appendChild(wiersz);

        sumaDoZaplaty += rata;
        pozostalyKapital -= czescKapitalowa;
    }

    /* Wyświetlenie pierwszej i ostatniej raty */
    document.getElementById("pierwszaRata").value =
        tabelaBody.rows[0].cells[3].textContent;

    document.getElementById("ostatniaRata").value =
        tabelaBody.rows[liczbaRat - 1].cells[3].textContent;

    /* Suma całkowita */
    document.getElementById("sumaCalkowita").textContent =
        sumaDoZaplaty.toFixed(2) + " zł";

    sekcjaWynikow.style.display = "block";
});
/* =====================================================
   RESET FORMULARZA
===================================================== */
document.getElementById("resetBtn").onclick = function () {

    formularz.reset();
    tabelaBody.innerHTML = "";
    sekcjaWynikow.style.display = "none";

    for (let nazwa in pola) {

        pola[nazwa].classList.remove("error");
        podpowiedzi[nazwa].style.display = "none";
    }
};
