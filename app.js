'use strict';

// Declaración de utilidades y referencias
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const estadoUI = $('#estadoUI');
const setEstado = (msg) => { estadoUI.textContent = msg; };
setEstado('Tlaxcala');
 
// Referecias a elementos del DOM
const btnCambiarMensaje = $('#btnCambiarMensaje');
const titulo = $('#tituloPrincipal');
const subtitulo = $('#subtitulo');

// Manejadores de eventos
btnCambiarMensaje.addEventListener('click', () => {
    const alt = titulo.dataset.alt === '1';

    titulo.textContent = alt
        ? 'Siiiiiiiiii profeeeeeeeeeeeeeeeeeeee'
        : 'Hi world';

    subtitulo.textContent = alt
        ? 'No aprendas conceptos clave'
        : 'Manipular el DOMinico';
    
    titulo.dataset.alt = alt ? '0' : '1';   
    setEstado('Se changue el testo');

}); 

const listaArticulos = $('#listaArticulos');

listaArticulos.addEventListener('mouseover', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;
    card.classList.add('is-highlighted');
});

listaArticulos.addEventListener('mouseout', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;
    card.classList.remove('is-highlighted');
});