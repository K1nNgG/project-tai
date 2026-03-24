<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <title>Macierze</title>
    <link rel="stylesheet" href="../main/style.css">
    <link rel="stylesheet" href="macierze.css">
</head>
<body>
<a href="../main/index.html" class="link">
<img src="../main/left_pillar.png" id="left-pillar" alt="pillar">
<img src="../main/right_pillar.png" id="right-pillar" alt="pillar">
    <header>
        <section id="logo">
            <h1>CALCULI</h1>
            <img src="../main/logo_vector.svg" alt="Logo Strony">
            <h1>PERITUS</h1>
        </section> 
        <h4>CREATI AD NUMERANDUM</h4>
    </header>
</a> 
<br>
<h3 id="wymiary">1. Podaj wymiary macierzy</h3>
<form method="get">
    Wiersze: <input type="number" name="w"  id ="ww" value="<?php echo $_GET['w'] ?? 2; ?>"> <br> <br>
    Kolumny: <input type="number" name="k" id="kk" value="<?php echo $_GET['k'] ?? 2; ?>">
    <input type="submit" value="Ustaw" id="pierwszyprzycisk">
</form>

<?php
if (isset($_GET['w'], $_GET['k'])) {
    $w = $_GET['w'];
    $k = $_GET['k'];

    echo "<h3 id='operacja'>2. Wpisz dane i wybierz operację</h3>";
    echo '<form method="post" action="?w='.$w.'&k='.$k.'">';
    
    echo "<b>Macierz A</b><br>";
    for ($i = 0; $i < $w; $i++) {
        for ($j = 0; $j < $k; $j++) {
            echo '<input type="number" name="A['.$i.']['.$j.']" required> ';
        }
        echo '<br>';
    }

    echo "<br><b>Macierz B</b><br>";
    for ($i = 0; $i < $w; $i++) {
        for ($j = 0; $j < $k; $j++) {
            echo '<input type="number" name="B['.$i.']['.$j.']" required> ';
        }
        echo '<br>';
    }

    echo '<br>
        <button type="submit" name="op" value="dodaj" id="b1">Dodaj</button>
        <button type="submit" name="op" value="odejmij" id="b2">Odejmij</button>
        <button type="submit" name="op" value="pomnoz" id="b3">Pomnóż</button>
        <button type="submit" name="op" value="dziel" id="b4">Dziel</button>
    </form>';
}

if (isset($_POST['A'], $_POST['B'], $_POST['op'])) {
    $A = $_POST['A'];
    $B = $_POST['B'];
    $op = $_POST['op'];
    $w = $_GET['w'];
    $k = $_GET['k'];

    echo "<h3>Wynik:</h3><table border='6'>";
    for ($i = 0; $i < $w; $i++) {
        echo "<tr>";
        for ($j = 0; $j < $k; $j++) {
            $wynik = 0;
            if ($op == 'dodaj') $wynik = $A[$i][$j] + $B[$i][$j];
            if ($op == 'odejmij') $wynik = $A[$i][$j] - $B[$i][$j];
            if ($op == 'pomnoz') $wynik = $A[$i][$j] * $B[$i][$j];
            if ($op == 'dziel') $wynik = ($B[$i][$j] != 0) ? $A[$i][$j] / $B[$i][$j] : 'błąd';

            echo "<td>".$wynik."</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}
?>

<footer>
    <h4 id="user-help"><a target="_blank" href="Macierze.pdf"><span>OPIS MERYTORYCZNY</span></a> <a target="_blank" href="Przewodnik.pdf"><span>POMOC DLA UŻYTKOWNIKA</span></a></h4>
</footer>

</body>
</html>