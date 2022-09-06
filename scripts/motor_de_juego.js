// /*ELEMENTOS DEL JUEGO*/
let listaPalabras = [`ALURA`, `PYTHON`, `HTML`, `DOMINIO`, `JAVA`, `WEB`, `IA`,`ROBOT`, `SOL`, `LUNA`, `ESPADA`, `GUITARRA`, `UKELELE`, `AZUL`, `MAR`, `PLAYA`, `RATON`, `PAIS`, `ELEFANTE`, `LEON`, `FRUTA`, `BANANA`, `LECHUGA`, `MANZANA`, `CARRO`, `AUTO`, `POESIA`, `ROMANCE`, `CUADRO`, `REMOLINO`, `PLATA`, `COBRE`, `ORO`, `ROMBO`, `ELIPSE`, `CIRCULO`, `ALA`, `ALMA`, `RODAR`,`ESTRELLA`, `TELEFONO`,`ANDROID`, "IOS", `CAJA`, `ARMA`, `ARMARIO`, `UVA`, `VENENO`, `POCION`, `ROMERO`, `RAMA`, `RODAR`];
let palabra = listaPalabras[1];
let adivinadas = [];
let contadorAciertos = 0;
let erradas = [];
let estado = 0;

const transicion = new Audio(`sonidos/sfx-swoosh1.mp3`)
const derrotaAudio = new Audio(`sonidos/sfx-defeat1.mp3`)
const victoriaAudio = new Audio(`sonidos/sfx-victory2.mp3`)
const erradaAudio = new Audio(`sonidos/sfx-impact7.mp3`)
const adivinadaAudio = new Audio(`sonidos/sfx-magic14.mp3`)

/*CAPTURA DE ELEMENTOS DE PANTALLA PRINCIPALES*/

const $menuPrincipal = document.querySelector(".menu_principal");
const $areaDeJuego = document.querySelector(".areaDeJuego");
const $menuPalabraNueva = document.querySelector(".menu_palabra_nueva");
const $textAreaPalabra = document.querySelector("#palabraNueva")
const $ahorcado = document.querySelector("#ahorcado");
const $adivinadas = document.querySelector(".adivinadas");
const $erradas = document.querySelector(".erradas");
const $finJuegoMens = document.querySelector("#finDeJuego");
const $logo = document.querySelector(".header__logo");
const $virtual = document.querySelector("#virtual");

/*CAPTURA DE LOS BOTONES NECESARIOS*/

const $btnNuevoJuego = document.querySelector("#btnNuevoJuego");
const $btnNuevaPalabra = document.querySelector("#btnAgregarNuevaPalabra");
const $btnGuardarPalabra = document.querySelector("#btnGuardarPalabra")
const $btnDesistir = document.querySelector("#btnDesistir");
const $btnCancelar = document.querySelector("#btnCancelar");
const $btnRecargaAreaJuego = document.querySelector("#btnRecargaAreaJuego");
const $btnTeclado = document.querySelector("#teclado");

/*DEFINICION DE FUNCIONES*/

function sorteo(n) {
    return (Math.floor(Math.random() * n));
}

function iniciarJuego() {
    $menuPrincipal.style.display = "none";
    $areaDeJuego.style.display = "block";
    $menuPalabraNueva.style.display = "none";
    $finJuegoMens.style.visibility = "hidden";

    const audioInicio = new Audio(`sonidos/sfx-magic4.mp3`)
    audioInicio.play()

    adivinadas = [];
    contadorAciertos = 0;
    erradas = [];
    estado = 0;
    palabra = listaPalabras[sorteo(listaPalabras.length)]


    window.addEventListener(`keypress`, captuarComprobar);

    Graficar()
}

function IrNuevaPalabra() {
    transicion.play();
    window.removeEventListener(`keypress`, captuarComprobar);

    $menuPrincipal.style.display = "none";
    $areaDeJuego.style.display = "none";
    $menuPalabraNueva.style.display = "block";
}

function IrMenuPrincipal() {
    transicion.play();
    window.removeEventListener(`keypress`, captuarComprobar);

    $menuPrincipal.style.display = "block";
    $areaDeJuego.style.display = "none";
    $menuPalabraNueva.style.display = "none";
}

function Graficar() {
    /*Se Comienza limpiando pantalla. 
    
    Por cada llamada, quedan impresiones residuales*/

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
    if (estado > 6) {
        derrotaAudio.play()

        $finJuegoMens.innerHTML = `😖PERDISTE!😖<br>La palabra era ${palabra}`;

        $finJuegoMens.style.color = "red";
        $finJuegoMens.style.visibility = "visible";
    } else if (contadorAciertos >= palabra.length) {
        victoriaAudio.play()

        $finJuegoMens.innerHTML = `FELICIDADES!!! <br>🥳 GANASTE 🥳`;
        $finJuegoMens.style.color = "green";
        $finJuegoMens.style.visibility = "visible";
    }
}


function captuarComprobar(teclaPresionada) {

    let tecla = (teclaPresionada.key).toUpperCase();
    let temp = (palabra.length);
    if (((teclaPresionada.key).charCodeAt(0) >= 65 && (teclaPresionada.key).charCodeAt(0) <= 90) || ((teclaPresionada.key).charCodeAt(0) >= 97 && (teclaPresionada.key).charCodeAt(0) <= 122) || ((teclaPresionada.key).charCodeAt(0) == 209) || ((teclaPresionada.key).charCodeAt(0) == 241)) {
        if (estado < 7 && contadorAciertos < temp) {

            if (palabra.indexOf(tecla) >= 0) {

                if (adivinadas.indexOf(tecla) < 0) {
                    adivinadaAudio.play();
                    adivinadas.push(tecla);

                }
            } else {
                if (erradas.indexOf(tecla) < 0) {
                    erradaAudio.play();
                    erradas.push(tecla);

                    estado++;
                }
            }

            Graficar();

        } else {
            alert("Juego terminado. Click en Nuevo Juego! o desistir para Menu Principal")
            window, removeEventListener(`keypress`, captuarComprobar);
        }
    }
}

function guardarPalabra() {
    let resultado = $textAreaPalabra.value;
    let palabraValida = true;

    /*codigo que valida si la letra es valida dejando fuera los caracteres especiales y acentos*/
    if (resultado != "") {
        for (let i = 0; i < resultado.length; i++) {
            if ((resultado.charCodeAt(i) >= 65 && resultado.charCodeAt(i) <= 90) || (resultado.charCodeAt(i) >= 97 && resultado.charCodeAt(i) <= 122) || (resultado.charCodeAt(i) == 209) || (resultado.charCodeAt(i) == 241)) {

            } else {

                alert("SOLO LETRAS. Numeros, caracteres especiales o acentos no son permitidos");
                palabraValida = false;
                break;
            }
        }
        for(let supuesta of listaPalabras) {
            if(resultado.toUpperCase() == supuesta) {
                palabraValida = false;
                alert("Palabra ya existe");
                break;
            }
        }
        if (palabraValida) {
            $textAreaPalabra.value = "";
            resultado = resultado.toUpperCase();
            listaPalabras.push(resultado);
            alert("Palabra guardada!!");

            iniciarJuego()

        }
    } else alert("no hay palabra para guardar");

}

function seleccionarTeclado() {
    $virtual.select();
}




/*EJECUCION*/

$btnNuevoJuego.addEventListener('click', iniciarJuego);
$btnRecargaAreaJuego.addEventListener('click', iniciarJuego);
$btnNuevaPalabra.addEventListener('click', IrNuevaPalabra);
$btnCancelar.addEventListener(`click`, IrMenuPrincipal);
$btnDesistir.addEventListener(`click`, IrMenuPrincipal);
$logo.addEventListener(`click`, IrMenuPrincipal);
$btnGuardarPalabra.addEventListener(`click`, guardarPalabra)