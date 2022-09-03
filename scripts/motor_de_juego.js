// /*ELEMENTOS DEL JUEGO*/
let listaPalabras = [`ALURA`, `PYTHON`, `HTML`, `DOM`, `JAVA`];
let palabra = listaPalabras[4];
let adivinadas = [];
let contadorAciertos = 0;
let erradas = [];
let estado = 0;

/*CAPTURA DE ELEMENTOS DE PANTALLA PRINCIPALES*/

const $menuPrincipal = document.querySelector(".menu_principal");
const $areaDeJuego = document.querySelector(".areaDeJuego");
const $menuPalabraNueva = document.querySelector(".menu_palabra_nueva");
const $ahorcado = document.querySelector("#ahorcado");
const $adivinadas = document.querySelector(".adivinadas");
const $erradas = document.querySelector(".erradas");

/*CAPTURA DE LOS BOTONES NECESARIOS*/

const $btnNuevoJuego = document.querySelector("#btnNuevoJuego");
const $btnNuevaPalabra = document.querySelector("#btnAgregarNuevaPalabra");
const $btnDesistir = document.querySelector("#btnDesistir");
const $btnCancelar = document.querySelector("#btnCancelar");

/*DEFINICION DE FUNCIONES*/

function IrAreaJuego() {
    $menuPrincipal.style.display = "none";
    $areaDeJuego.style.display = "block";
    $menuPalabraNueva.style.display = "none";
}

function IrNuevaPalabra() {
    $menuPrincipal.style.display = "none";
    $areaDeJuego.style.display = "none";
    $menuPalabraNueva.style.display = "block";
}

function IrMenuPrincipal() {
    $menuPrincipal.style.display = "block";
    $areaDeJuego.style.display = "none";
    $menuPalabraNueva.style.display = "none";
}

function Graficar() {
    /*funcion que limpia pantalla*/
    if ($adivinadas.hasChildNodes()) {
        while ($adivinadas.childNodes.length >= 1) {
            $adivinadas.removeChild($adivinadas.firstChild);
        }
    }

    if ($erradas.hasChildNodes()) {
        while ($erradas.childNodes.length >= 1) {
            $erradas.removeChild($erradas.firstChild);
        }
    }
    contadorAciertos = 0;
    /*generacion de la horca*/
    $ahorcado.src = "./img/img" + estado + ".png";
    /*generacion letras adivinadas*/

    for (let letra of palabra) {
        let $span = document.createElement(`span`);
        let $texto = document.createTextNode(``);



        if (adivinadas.indexOf(letra) >= 0) {
            $texto.nodeValue = letra;
            contadorAciertos++;
            console.log(contadorAciertos);
        }
        $span.setAttribute(`class`, `adivinadas__letra`);
        $span.appendChild($texto)
        $adivinadas.appendChild($span);
    }

    /*generacion letras erradas*/
    for (let letra of erradas) {
        let $span = document.createElement(`span`);
        let $texto = document.createTextNode(letra);

        $span.appendChild($texto);
        $span.setAttribute(`class`, `erradas__letra`)
        $erradas.appendChild($span);
    }
    if(estado > 6){
        alert("perdiste")
    }else if(contadorAciertos >= palabra.length){
        alert("ganaste")
    }
}


function captuarComprobar(teclaPresionada) {
    let tecla = (teclaPresionada.key).toUpperCase();
    let temp = (palabra.length);
    if (estado < 7 && contadorAciertos < temp) {

        if (palabra.indexOf(tecla) >= 0) {
            console.log("La letra es correcta");
            if (adivinadas.indexOf(tecla) < 0) {
    
                adivinadas.push(tecla);
                console.log(adivinadas);
            }
        } else {
            console.log("La letra es errada");
            if (erradas.indexOf(tecla) < 0) {
                
                erradas.push(tecla);
                console.log(erradas);
                estado++;
            }
        }
        
        Graficar();
        
    }else {
        alert("Juego terminado gorreao! que apreta la tecla Otario!?")
    }
    
}




/*EJECUCION*/

$btnNuevoJuego.addEventListener('click', IrAreaJuego);
$btnNuevaPalabra.addEventListener('click', IrNuevaPalabra);
$btnCancelar.addEventListener(`click`, IrMenuPrincipal);
$btnDesistir.addEventListener(`click`, IrMenuPrincipal);


window.addEventListener(`keypress`, captuarComprobar);

Graficar()