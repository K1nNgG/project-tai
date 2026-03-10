<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <title>Macierze</title>
    <link rel="stylesheet" href="../main/style.css">
    <link rel="stylesheet" href="../macierze/macierze.css">
</head>
<body>
<header>
        <section id="logo">
            <h1>CALCULI</h1>
            <img src="../main/logo_vector.svg" alt="Logo Strony">
            <h1>PERITUS</h1>
        </section>
        <h4>CREATI AD NUMERANDUM</h4> 
</header>
<h1 id="mac"> Macierze </h1>
<h3>1. Podaj wymiary macierzy</h3>
<form method="get">
    Wiersze: <input type="number" name="w" value="<?php echo $_GET['w'] ?? 2; ?>">
    Kolumny: <input type="number" name="k" value="<?php echo $_GET['k'] ?? 2; ?>">
    <input type="submit" value="Ustaw">
</form>

<?php
if (isset($_GET['w'], $_GET['k'])) {
    $w = $_GET['w'];
    $k = $_GET['k'];

    echo "<h3>2. Wpisz dane i wybierz operację</h3>";
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
        <button type="submit" name="op" value="dodaj">Dodaj</button>
        <button type="submit" name="op" value="odejmij">Odejmij</button>
        <button type="submit" name="op" value="pomnoz">Pomnóż</button>
        <button type="submit" name="op" value="dziel">Dziel</button>
    </form>';
}

if (isset($_POST['A'], $_POST['B'], $_POST['op'])) {
    $A = $_POST['A'];
    $B = $_POST['B'];
    $op = $_POST['op'];
    $w = $_GET['w'];
    $k = $_GET['k'];

    echo "<h3>Wynik:</h3><table border='1'>";
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

</body>
</html>