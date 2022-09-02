/*CAPTURA DE ELEMENTOS EN PANTALLA PRINCIPALES*/

let $menuPrincipal = document.querySelector(".menu_principal");
let $areaDeJuego = document.querySelector(".areaDeJuego");
let $menuPalabraNueva = document.querySelector(".menu_palabra_nueva");

/*CAPTURA DE LOS BOTONES NECESARIOS*/

let $btnNuevoJuego = document.querySelector("#btnNuevoJuego");
let $btnNuevaPalabra = document.querySelector("#btnAgregarNuevaPalabra");
let $btnCancelar = document.querySelector("#btnCancelar");
let $btnDesistir = document.querySelector("#btnDesistir");

/*DEFINICION DE FUNCIONES*/

function IrAreaJuego () {
    $menuPrincipal.style.display="none";
    $areaDeJuego.style.display = "block";
    $menuPalabraNueva.style.display = "none";
}

function IrNuevaPalabra () {
    $menuPrincipal.style.display="none";
    $areaDeJuego.style.display = "none";
    $menuPalabraNueva.style.display = "block";
}

function IrMenuPrincipal () {
    $menuPrincipal.style.display="block";
    $areaDeJuego.style.display = "none";
    $menuPalabraNueva.style.display = "none";
}
/*EJECUCION*/

$btnNuevoJuego.addEventListener('click', IrAreaJuego);
$btnNuevaPalabra.addEventListener('click', IrNuevaPalabra);
$btnCancelar.addEventListener('click', IrMenuPrincipal);
$btnDesistir.addEventListener('click', IrMenuPrincipal);



