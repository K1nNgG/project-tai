<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Projekt: Całkowanie Numeryczne</title>
	<link rel="stylesheet" href="../main/style.css">
	<link rel="stylesheet" href="calki.css">
	<link rel="icon" type="image/png" href="../main/favicon.png">
   
</head>
<body>
<a href="../main/index.html" class="link">  
    <header>
        <section id="logo">
            <h1>CALCULI</h1>
            <img src="../main/logo_vector.svg" alt="Logo Strony">
            <h1>PERITUS</h1>
        </section> 
        <h4>CREATI AD NUMERANDUM</h4> 
    </header>
    </a> 

<img src="../main/left_pillar.png" id="left-pillar" alt="pillar">
<img src="../main/right_pillar.png" id="right-pillar" alt="pillar">

<div class="container">
   
    
    <p style="text-align: center; font-style: italic;">Całkowana funkcja: <b>f(x) = x² + 2x</b></p>

    <form method="get">
        <label>Początek przedziału (a):</label>
        <input type="number" step="any" name="a" value="<?php echo $_GET['a'] ?? '0'; ?>" required>
        
        <label>Koniec przedziału (b):</label>
        <input type="number" step="any" name="b" value="<?php echo $_GET['b'] ?? '3'; ?>" required>
        
        <label>Liczba trapezów (n):</label>
        <input type="number" name="n" value="<?php echo $_GET['n'] ?? '1000'; ?>" required>
        
        <button type="submit">Oblicz pole pod wykresem</button>
    </form>

    <?php
    if (isset($_GET['a']) && isset($_GET['b']) && isset($_GET['n'])) {
        
      
        function mojaFunkcja($x) {
            return pow($x, 2) + (2 * $x); 
        }

       
        $a = floatval($_GET['a']);
        $b = floatval($_GET['b']);
        $n = intval($_GET['n']);

        if ($n > 0) {
            
            $h = ($b - $a) / $n; 
            $suma = 0;

            for ($i = 0; $i < $n; $i++) {
                $x_i = $a + $i * $h;
                $x_next = $a + ($i + 1) * $h;

                
                $pole_trapezu = ((mojaFunkcja($x_i) + mojaFunkcja($x_next)) / 2) * $h;
                $suma += $pole_trapezu;
            }

            
            echo "<div class='result'>";
            echo "<b>Wynik przybliżony:</b> " . number_format($suma, 4, ',', ' ') . "<br>";
            echo "<small>Metoda trapezów, n = $n</small>";
            echo "</div>";
        }
    }
    ?>
</div>
<footer>
 <h4 id="user-help"><a target="_blank" href="calki.pdf"><span>OPIS MERYTORYCZNY</span></a> <a target="_blank" href="calki2.pdf"><span>POMOC DLA UŻYTKOWNIKA</span></a></h4>
</footer>
</body>
</html>