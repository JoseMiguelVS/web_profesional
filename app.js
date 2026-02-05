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

//agregar elementos al DOM
const btnAgregarCard = $('#btnAgregarCard');
const listaArticulos2 = $('#listaArticulos');

btnAgregarCard.addEventListener('click', () => {
    const new_article = document.createElement('article');
    new_article.className = 'card';
    new_article.dataset.tags = 'agentes';
    new_article.innerHTML = `
            <h3 class="card-title">ay si me gustas dani</h3>
            <p class="card-text">asdfghjklñ.qwertyuiop,zxcvbnm</p>
            <div class="card-actions">
              <button class="btn small" type="button" data-action="like">👍 laik</button>
              <button class="btn small ghost" type="button" data-action="remove"> delete</button>
              <span class="badge" aria-label="likes">0</span>
            </div>
    `;
    listaArticulos2.append(new_article);
    setEstado('Se agregó una nueva card');
});