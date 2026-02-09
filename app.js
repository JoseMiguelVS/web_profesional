'use strict';

// Declaración de utilidades y referencias
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const buildcard = ({title, text, tags}) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.dataset.tags = tags;
    article.innerHTML = `
            <h3 class="card-title"></h3>
            <p class="card-text"></p>
            <div class="card-actions">
              <button class="btn small" type="button" data-action="like">👍 laik</button>
              <button class="btn small ghost" type="button" data-action="remove"> delete</button>
              <span class="badge" aria-label="likes">0</span>
            </div>
    `;
    article.querySelector('.card-title').textContent = title;
    article.querySelector('.card-text').textContent = text;
    return article;
};

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
    setEstado('Liquido');

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
    const new_article = buildcard({
        title: 'ay si dani me gugutata',
        text: 'oye no nada',
        tags: 'new'
    });
    listaArticulos2.append(new_article);
    setEstado('Se agregó una nueva card');
});

//eliminar elementos del DOM (agregados)
const btnEliminarCard = $('#btnLimpiar');
btnEliminarCard.addEventListener('click', () => {
    const cards = $$('#listaArticulos .card');
    let removed = 0;
    cards.forEach(card => {
        if(card.dataset.seed == 'true') return;
        card.remove();
        removed++;
    });
    setEstado('Articulos eliminados '+ removed);
});

//manejador para los botones like
// const listaArticulos3 = $$('#listaArticulos button[data-action="like"]');
const likeButtons = document.querySelectorAll('#listaArticulos button[data-action="like"]');
likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        hacerLike(card);
    });
});

const hacerLike = (card) => {
        const bagde = card.querySelector('.badge');
        const currentLikes = Number(bagde.textContent) || 0;
        bagde.textContent = currentLikes + 1;
        setEstado('Likes más uno');
};