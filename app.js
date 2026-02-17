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

//Delegacion de eventos para hacer like
//document → html → body → main → #listaArticulos → article.card → card-action(div) → button[data-actions] ← eventos
const listaArticulos3 = $('#listaArticulos');
listaArticulos3.addEventListener('click', (e) => {
    // Se hizo click en un boton?
    const btn = e.target.closest('button[data-action]');
    if (!btn) return; // Si no, salir
    const card = btn.closest('.card');
    if(!card) return; // Si no se encuentra la card, salir
    const action = btn.dataset.action;

    if (action === 'like') doLike(card);
    if (action === 'remove') doRemove(card);
    
});

const doLike = (card) => {
        const bagde = card.querySelector('.badge');
        const currentLikes = Number(bagde.textContent) || 0;
        bagde.textContent = currentLikes + 1;
        setEstado('Likes más uno');
    };
    
const doRemove = (card) => {
    const bagde = card.querySelector('.badge');
    const currentLikes = Number(bagde.textContent) || 0;
    currentLikes > 0 
        ? bagde.textContent = currentLikes - 1
        : bagde.textContent = 0;
    setEstado('Likes menos uno');
};

const filtro = $('#filtro');
const matchText = (card, q) => {
    const title = card.querySelector('.card-title')?.textContent ?? '';
    const text = card.querySelector('.card-text')?.textContent ?? '';
    const haystack = (title + ' ' + text).toLowerCase();
    return haystack.includes(q);
};

filtro.addEventListener('input', () => {
    const q = filtro.value.trim().toLowerCase();
    const cards = $$('#listaArticulos .card');

    cards.forEach(( card ) => {
        const ok = q === '' ? true : matchText(card, q);
        card.hidden = !ok;
    });

    setEstado(q === '' ? 'Filtro vacio' : `Filtro texto: "${q}" `); 
});

const chips = $('#chips');
chips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    const tag = (chip.dataset.tag || '').toLowerCase();
    const cards = $$('#listaArticulos .card');

    cards.forEach(( card ) => {
        const tags = (card.dataset.tags || '').toLowerCase();
        card.hidden = !tags.includes(tag);
    });
    setEstado(`Filtro tags: "${tag}" `);
});