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
    filterState.q = filtro.value.trim().toLowerCase();
    applyFilters();
    // const q = filtro.value.trim().toLowerCase();
    // const cards = $$('#listaArticulos .card');

    // cards.forEach(( card ) => {
    //     const ok = q === '' ? true : matchText(card, q);
    //     card.hidden = !ok;
    // });

    // setEstado(q === '' ? 'Filtro vacio' : `Filtro texto: "${q}" `); 
});

const chips = $('#chips');
chips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    const tag = (chip.dataset.tag || '').toLowerCase();
    filterState.tag = (filterState.tag === tag) ? '' : tag;
    applyFilters();

    // const cards = $$('#listaArticulos .card');

    // cards.forEach(( card ) => {
    //     const tags = (card.dataset.tags || '').toLowerCase();
    //     card.hidden = !tags.includes(tag);
    //     const ok = q === '' ? true : matchTag(card, q);
    //     card.hidden = !ok;
    // });
    // setEstado(`Filtro tags: "${tag}" `);

});

const filterState = {
      q: '',
    tag: '',
};

const matchTag = (card, tag) => {
    if (!tag) return true;
    const tags = (card.dataset.tags || '').toLowerCase();
    return tags.includes(tag.toLowerCase());
};

const applyFilters = () => {
    const cards = $$('#listaArticulos .card');
    cards.forEach(( card ) => {
        const okText = filterState.q 
        ? matchText(card, filterState.q) 
        : true;
    const okTag = matchTag(card, filterState.tag);
    card.hidden = !(okText && okTag);
    });

    const parts = [];
    if (filterState.q) parts.push(`Texto: "${filterState.q}"`);
    if (filterState.tag) parts.push(`Tag: "${filterState.tag}"`);
    setEstado(parts.length > 0 
        ? `Filtros: ${parts.join(' + ')}` 
        : 'Sin filtros');
};

const form = $('#formNewsletter');
const email = $('#email');
const interes = $('#interes');
const feedback = $('#feedback');

// Validar el email con una expresión regular simple
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);  //regex == regular expression == expresión regular

//Inicio del texto /^
//[^\s@]+ → Uno o más caracteres que no sean espacios ni '@'
//@ → El símbolo '@' literal
//[^\s@]+ → Uno o más caracteres que no sean espacios ni '@' (dominio)
//\. → Un punto literal (se escapa con '\')
//[^\s@]+ → Uno o más caracteres que no sean espacios ni '@' (extensión)
//$/ → Fin del texto la expresión regular

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío del formulario
    const valueEmail = email.value.trim();
    const valueInteres = interes.value.trim();

    email.classList.remove('is-invalid');
    interes.classList.remove('is-invalid');
    feedback.textContent = '';

    let ok = true;

    if(!isValidEmail(valueEmail)) {
        email.classList.add('is-invalid');
        feedback.textContent = 'Por favor, ingresa un correo electrónico válido.';
        ok = false;
    }
    if(valueInteres === '') {
        interes.classList.add('is-invalid');
        feedback.textContent = 'Por favor, selecciona un área de interés.';
        ok = false;
    }
    if (!ok){
        feedback.textContent = 'rreviza los campos marcados';
        setEstado('Error en el formulario');
        return;
    }

    //simular envio d datos
    feedback.textContent = `Gracias por suscribirte con el correo ${valueEmail} y tu interés en ${valueInteres}.`;
    setEstado('Enviando formulario');
    form.reset();
});

// Carga asíncrona de noticias (simulada)
const listaNoticias = $('#listaNoticias');
const renderNoticias = (items) => {
    listaNoticias.innerHTML = '';

    if (!items || items.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'without noticias disponibles.';
        listaNoticias.append(li);
        return;
    }
    items.forEach((t) => {
        const li = document.createElement('li');
        li.textContent = t;
        listaNoticias.append(li);
    });
};

// Simular servicio de fetch
const fakeFetchNoticias = () => {
    return new Promise((resolve, reject) => {
        const shouldFail = Math.random() < 0.2; // 20% de probabilidad de fallo
        setTimeout(() => {
            if (shouldFail){
                reject(new Error('Simulación de fallo en la carga de noticias'));
                return;
            }
            resolve([
                'Nueva actualización de React 18',
                'JavaScript Frameworks: Tendencias 2024',
                'CSS Grid vs Flexbox: Guía Comparativa',
                'Node.js Performance Tips',
                'Web Accessibility Best Practices'
            ]);
        }, 1500);
    });
};