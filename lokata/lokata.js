function obliczLokate(){
    let kapital=document.getElementById("kapital").value;
    let oprocentowanie=document.getElementById("oprocentowanie").value;
    let czas=document.getElementById("czas").value;
    let odnowienia=document.getElementById("odnowienia").value;
    if(kapital===""||oprocentowanie===""||czas===""||odnowienia===""){
        document.getElementById("wynik").innerHTML="Podaj wszystkie dane.";
        return;
    }
    if(kapital<0||oprocentowanie<0||czas<0||odnowienia<0){
    document.getElementById("wynik").innerHTML="Wartości muszą być dodatnie.";
    return;
    }
    let p=oprocentowanie/100;
    let S=kapital*Math.pow((1+p*czas),odnowienia);
    document.getElementById("wynik").innerHTML=
    "Końcowa wartość lokaty: "+S.toFixed(2)+" zł";
}