/* =====================================================
   POBRANIE ELEMENTÓW HTML
===================================================== */

// Główne kontenery do zarządzania widocznością i obsługą zdarzeń
const formularz = document.getElementById("loanForm");
const sekcjaWynikow = document.getElementById("wyniki");
const tabelaBody = document.querySelector("#results tbody");

/* Pola formularza - zebrane w obiekt dla łatwiejszego dostępu w pętlach */
const pola = {
    kwota: document.getElementById("kwota"),
    raty: document.getElementById("raty"),
    oprocentowanie: document.getElementById("oprocentowanie")
};

/* Chmurki z błędami - obiekty powiązane z polami wyżej */
const podpowiedzi = {
    kwota: document.getElementById("kwotaTooltip"),
    raty: document.getElementById("ratyTooltip"),
    oprocentowanie: document.getElementById("oprocentowanieTooltip")
};
/* =====================================================
   FUNKCJE POMOCNICZE
===================================================== */

/* Funkcja usuwa z tekstu:
   - spacje
   - zł
   - %
   - zamienia przecinek na kropkę
   Następnie zamienia tekst na liczbę (właściwą dla JS)
*/
function pobierzLiczbe(wartosc) {

    wartosc = wartosc
        .replace(/\s/g, "") // regex: usuwa wszystkie białe znaki
        .replace("zł", "")
        .replace("%", "")
        .replace(",", "."); // JS wymaga kropki dla liczb zmiennoprzecinkowych

    return parseFloat(wartosc); // Zwraca typ liczbowy
}
/* Funkcja formatuje liczby np.
   10000 -> 10 000
*/
function formatujLiczbe(liczba) {

    // Użycie wyrażenia regularnego do wstawienia spacji co 3 cyfry
    return liczba
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
/*
   Sprawdza czy pole zawiera poprawną liczbę
*/
function sprawdzPole(input, tooltip) {

    const liczba = pobierzLiczbe(input.value);

    // Sprawdzenie, czy wpisana wartość nie jest tekstem (isNaN) i czy nie jest ujemna
    if (isNaN(liczba) || liczba < 0) {

        input.classList.add("error"); // Dodanie czerwonej ramki (z CSS)
        tooltip.style.display = "block"; // Pokazanie chmurki z błędem

        return false;
    }

    // Jeśli dane są poprawne, usuwamy błędy
    input.classList.remove("error");
    tooltip.style.display = "none";

    return true;
}
/* =====================================================
   WALIDACJA PODCZAS WPISYWANIA
===================================================== */

// Iteracja po obiekcie 'pola' i dodanie nasłuchiwania na wpisywanie z klawiatury
for (let nazwa in pola) {

    pola[nazwa].addEventListener("input", () => {
        // Na bieżąco sprawdza poprawność danych, gdy użytkownik coś wpisuje
        sprawdzPole(pola[nazwa], podpowiedzi[nazwa]);
    });
}
/* =====================================================
   FORMATOWANIE PÓL
===================================================== */

/* Kwota -> np. 10 000 zł */
// Zdarzenie 'blur' odpala się, gdy użytkownik wyjdzie (odklika) z pola tekstowego
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

    let liczba = parseInt(pobierzLiczbe(this.value)); // Użycie parseInt wymusza liczbę całkowitą

    if (!isNaN(liczba)) {
        this.value = liczba;
    }
});
/* =====================================================
   OBLICZENIE RAT MALEJĄCYCH
===================================================== */
formularz.addEventListener("submit", function (e) {

    e.preventDefault(); // Zapobiega domyślnemu przeładowaniu strony po kliknięciu "Oblicz"

    /* Sprawdzenie czy wszystkie dane są poprawne przed rozpoczęciem matematyki */
    if (
        !sprawdzPole(pola.kwota, podpowiedzi.kwota) ||
        !sprawdzPole(pola.raty, podpowiedzi.raty) ||
        !sprawdzPole(pola.oprocentowanie, podpowiedzi.oprocentowanie)
    ) {
        alert("Popraw dane");
        return; // Zatrzymuje dalsze wykonywanie kodu, jeśli jest błąd
    }
    const kwota = pobierzLiczbe(pola.kwota.value);
    const liczbaRat = parseInt(pobierzLiczbe(pola.raty.value));
    const oprocentowanie = pobierzLiczbe(pola.oprocentowanie.value);

    // Część kapitałowa przy ratach malejących jest stała
    const czescKapitalowa = kwota / liczbaRat; 
    // Przeliczenie oprocentowania rocznego na miesięczne (w ułamku dziesiętnym)
    const stopaMiesieczna = oprocentowanie / 12 / 100;

    let pozostalyKapital = kwota; // Zmienna śledząca, ile jeszcze zostało do spłaty
    let sumaDoZaplaty = 0;        // Sumuje całkowity koszt kredytu

    tabelaBody.innerHTML = ""; // Czyszczenie tabeli z poprzednich obliczeń

    /* Pętla generująca kolejne raty dla każdego miesiąca */
    for (let i = 1; i <= liczbaRat; i++) {

        // Odsetki liczone są od aktualnego, malejącego kapitału
        const odsetki = pozostalyKapital * stopaMiesieczna;
        // Rata = stały kapitał + malejące odsetki
        const rata = czescKapitalowa + odsetki;

        // Tworzenie nowego wiersza tabeli
        const wiersz = document.createElement("tr");

        // .toFixed(2) zaokrągla wyniki do dwóch miejsc po przecinku (do groszy)
        wiersz.innerHTML = `
            <td>${i}</td>
            <td>${czescKapitalowa.toFixed(2)} zł</td>
            <td>${odsetki.toFixed(2)} zł</td>
            <td>${rata.toFixed(2)} zł</td>
        `;

        tabelaBody.appendChild(wiersz); // Dodanie wiersza do widoku

        sumaDoZaplaty += rata; // Aktualizacja całkowitego kosztu
        pozostalyKapital -= czescKapitalowa; // Pomniejszenie długu
    }

    /* Wyświetlenie pierwszej i ostatniej raty na podstawie skrajnych elementów w tabeli */
    document.getElementById("pierwszaRata").value =
        tabelaBody.rows[0].cells[3].textContent;

    document.getElementById("ostatniaRata").value =
        tabelaBody.rows[liczbaRat - 1].cells[3].textContent;

    /* Suma całkowita wpisana na sam dół (tfoot) */
    document.getElementById("sumaCalkowita").textContent =
        sumaDoZaplaty.toFixed(2) + " zł";

    sekcjaWynikow.style.display = "block"; // Odkrycie gotowej sekcji z wynikami
});
/* =====================================================
   RESET FORMULARZA
===================================================== */
document.getElementById("resetBtn").onclick = function () {

    formularz.reset(); // Przywraca pola formularza do stanu początkowego
    tabelaBody.innerHTML = ""; // Czyści wygenerowane tr
    sekcjaWynikow.style.display = "none"; // Ponownie ukrywa wyniki

    // Usunięcie ewentualnych klas błędów, jeśli formularz był zresetowany w trakcie wpisywania
    for (let nazwa in pola) {

        pola[nazwa].classList.remove("error");
        podpowiedzi[nazwa].style.display = "none";
    }
};