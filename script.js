let nombre = '';
let intentos_field = '';
let palabra_inicial = '';
let modal = document.getElementById('modal');
let audio = document.getElementById('audio');
let salida = document.querySelector('.salida');
let intentos = document.querySelector('.intentos');
let textoNube = document.querySelector('.texto-nube');
let textoNube1 = document.querySelector('.texto-nube1');
let espacios = 0;
let palabra_limpia = '';
let contadorLetras = 0;
let acertadas = '';
let falladas = '';

function pintaGuiones(palabra_limpia) {
    console.log('palabra_limpia', palabra_limpia)

    for (let i = 0; i < palabra_limpia.length; i++) {

        if (palabra_limpia[i] == ' ') {
            espacios++;
            salida.innerHTML += `<span class='letra${i} palabraAcertar'>  </span>`
        } else {
            salida.innerHTML += `<span class='letra${i} palabraAcertar'>_</span>`
        }
    }
}

function recogeDatos() {
    nombre = document.getElementById('nombre_field').value;
    if (nombre == '') {
        alert('Tienes que introducir un nombre correcto');
        return
    }
    intentos_field = document.getElementById('intentos_field').value;
    if (intentos_field <= 2) {
        alert('Tienes que introducir al menos 3 intentos');
        return
    }
    palabra_inicial = document.getElementById('palabra_field').value;
    console.log('prueba', palabra_inicial)
    console.log('prueba2', palabra_inicial.length)
    if (palabra_inicial == '') {
        alert('No puedes jugar si no insertas una palabra');
        return;
    } else if (palabra_inicial.length < 4) {
        alert('La palabra debe tener al menos 4 letras');
        return;
    }
    // } else if (isNaN(palabra_inicial)) {
    //     alert('La palabra no puede ser, ni contener números');
    //     return;
    // }

    document.querySelector('.boton0').classList.add('is-disabled');
    document.querySelector('.boton1').classList.remove('is-disabled');
    textoNube.innerHTML = nombre;
    textoNube1.innerHTML = 'A JUGAR';
    console.log('nombre', nombre)
    vaciarInput();
    quitaEspacios(palabra_inicial);

}

function procesaPalabra(palabra_inicial) {
    for (let i = 0; i < palabra_inicial.length; i++) {
        let letra_s = palabra_inicial[i];
        console.log('letra', letra_s)
        palabra_limpia += limpiaLetra(letra_s);
    }
    pintaGuiones(palabra_limpia);

}

function compruebaLetra() {

    let caracter = document.getElementById('letra_field').value;
    caracter.toLowerCase();
    let palabraPantalla = document.querySelectorAll('.palabraAcertar');
    let letrasAcertadas = document.querySelector('.letras-acertadas');
    let letrasFalladas = document.querySelector('.letras-falladas');
    intentos.innerHTML = intentos_field;
    let palabraSinEspacios = palabra_limpia.length - espacios;

    if (acertadas.indexOf(caracter) != -1 || falladas.indexOf(caracter) != -1) {
        alert('Ya has introducido esta letra');
        vaciarInput();
        return;
    }

    if (palabra_limpia.indexOf(caracter) !== -1) {
        acertadas += caracter;
        letrasAcertadas.innerHTML += caracter;
        reproducirAudio('acierto');
    }

    for (let i = 0; i < palabra_limpia.length; i++) {
        if (palabra_limpia[i] == caracter) {
            document.querySelector('.letra' + i).innerHTML = caracter;
            contadorLetras++;
            if (contadorLetras == palabraSinEspacios) {
                textoNube.innerHTML = 'Winner';
                textoNube1.innerHTML = 'Nice';
                letrasAcertadas.innerHTML = '';
                letrasFalladas.innerHTML = '';
                intentos.innerHTML = 'nº intentos';
                palabraPantalla.innerHTML = '';
                vaciarInput();
                finPartida('Has ganado');
                return
            }
        }
    }

    if (palabra_limpia.indexOf(caracter) == -1) {
        console.log('palabraErrores', palabra_limpia);
        console.log('caracterErrores', caracter);
        intentos_field--;
        falladas += caracter;
        reproducirAudio('fallo');
        letrasFalladas.innerHTML += caracter;
        intentos.innerHTML = intentos_field;
        console.log('contadorErrores', intentos_field)

        if (intentos_field <= 1) {
            reproducirAudio('tiempo');
        }

        if (intentos_field == 0) {
            textoNube.innerHTML = 'Game Over';
            textoNube1.innerHTML = 'Upss!';
            letrasAcertadas.innerHTML = '';
            letrasFalladas.innerHTML = '';
            intentos.innerHTML = 'nº intentos';
            palabraPantalla.innerHTML = '';
            vaciarInput();
            finPartida('Has perdido, ya no te quedan más intentos');
            return
        }
    }
    vaciarInput();
}

function reproducirAudio(mensaje) {

    if (mensaje == 'tiempo') {
        audio.innerHTML = `<audio src = "audio/tiempo.mp3" autoplay loop > < /audio>`;
    } else if (mensaje == 'espera') {
        audio.innerHTML = `<audio src = "audio/espera.mp3" autoplay loop> < /audio>`;
    }
    if (mensaje == 'fallo') {
        intentos_field <= 1 ? audio.innerHTML = `<audio src = "audio/fallo.mp3" autoplay> < /audio>
                                                 <audio src = "audio/tiempo.mp3" autoplay loop> < /audio>` : audio.innerHTML = `<audio src = "audio/fallo.mp3" autoplay> < /audio>`;


    } else if (mensaje == 'acierto') {
        intentos_field <= 1 ? audio.innerHTML = `<audio src = "audio/acierto.mp3" autoplay> < /audio>
                                                 <audio src = "audio/tiempo.mp3" autoplay loop> < /audio>` : audio.innerHTML = `<audio src = "audio/acierto.mp3" autoplay> < /audio>`;
    }

}






function iniciarPartida() {
    modal.close();
    document.querySelector('.boton0').classList.remove('is-disabled');
    document.querySelector('.boton1').classList.add('is-disabled');
    textoNube.innerHTML = '';
    textoNube1.innerHTML = '';
    salida.innerHTML = '';
    nombre = '';
    intentos_field = '';
    palabra_inicial = '';
    espacios = 0;
    palabra_limpia = '';
    contadorLetras = 0;
    acertadas = '';
    falladas = '';
    audio.innerHTML = '';
    document.getElementById('nombre_field').focus();


}

function vaciarInput() {
    document.getElementById('letra_field').value = "";
    document.getElementById('intentos_field').value = "";
    document.getElementById('palabra_field').value = "";
    document.getElementById('nombre_field').value = "";
    document.getElementById('intentos_field').focus();
    document.getElementById('nombre_field').focus();
    document.getElementById('palabra_field').focus();
    document.getElementById('letra_field').focus();
}

function finPartida(mensaje) {
    alert(mensaje);
    let jugar = confirm('¿Quieres jugar de nuevo?');
    jugar ? iniciarPartida() : mostrarModal();
}


function mostrarModal() {
    modal.showModal();
    reproducirAudio('espera');
}

function quitaEspacios(palabra_inicial) {

    palabra_inicial = palabra_inicial.trim();
    do {
        palabra_inicial = palabra_inicial.replaceAll('  ', ' ');
    } while (palabra_inicial.indexOf('  ') != -1);
    console.log('palabra_inicial', palabra_inicial.length);
    procesaPalabra(palabra_inicial)


}

function limpiaLetra(letra) {
    letra = letra.toLowerCase();
    let letra_s = '';
    switch (letra) {
        case 'á':
        case 'à':
            letra_s = 'a';
            break;
        case 'é':
        case 'è':
            letra_s = 'e';
            break;
        case 'í':
        case 'ì':
            letra_s = 'i';
            break;
        case 'ó':
        case 'ò':
            letra_s = 'o';
            break;
        case 'ú':
        case 'ù':
        case 'ü':
            letra_s = 'u';
            break;
        default:
            letra_s = letra;
            break;
    }
    return letra_s;
}