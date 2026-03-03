<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <title>Operacje na macierzach 3x4</title>
</head>
<body>

<h2>Operacje na macierzach 3×4</h2>

<form method="post">
    <h3>Macierz A</h3>
    <?php
    for ($i = 0; $i < 3; $i++) {
        for ($j = 0; $j < 4; $j++) {
            echo '<input type="number" name="A['.$i.']['.$j.']" required> ';
        }
        echo '<br>';
    }
    ?>

    <h3>Macierz B</h3>
    <?php
    for ($i = 0; $i < 3; $i++) {
        for ($j = 0; $j < 4; $j++) {
            echo '<input type="number" name="B['.$i.']['.$j.']" required> ';
        }
        echo '<br>';
    }
    ?>

    <br>
        <button type="submit" name="op" value="dodaj">Dodaj</button>
        <button type="submit" name="op" value="odejmij">Odejmij</button>
        <button type="submit" name="op" value="pomnoz">Pomnóż</button>
        <button type="submit" name="op" value="dziel">Dziel</button>
</form>

<?php
if (isset($_POST['A'], $_POST['B'], $_POST['op'])) {

    $A = $_POST['A'] ?? [];
    $B = $_POST['B'] ?? [];
    $op = $_POST['op'];
    $C = [];

    echo "<h3>Wynik operacji</h3>";
    echo "<table border='1' cellpadding='5'>";

    for ($i = 0; $i < 3; $i++) {
        echo "<tr>";
        for ($j = 0; $j < 4; $j++) {

        if ($op == 'dodaj') {
            $C[$i][$j] = $A[$i][$j] + $B[$i][$j];
        }

        if ($op == 'odejmij') {
            $C[$i][$j] = $A[$i][$j] - $B[$i][$j];
        }

        if ($op == 'pomnoz') {
            $C[$i][$j] = $A[$i][$j] * $B[$i][$j];
        }
        
        if ($op == 'dziel') {
            if ($B[$i][$j] != 0) {
                $C[$i][$j] = $A[$i][$j] / $B[$i][$j];
            } else {
                $C[$i][$j] = 'brak';
                }
        }


            echo "<td>".$C[$i][$j]."</td>";
        }
        echo "</tr>";
    }

    echo "</table>";
}
?>

</body>
</html>
