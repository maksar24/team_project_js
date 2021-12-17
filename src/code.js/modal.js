import refs from './refs';
import modalTpl from '../templates/modal.hbs'
// импорт функционала для добавления фильмов
import addMoviesToCollection from './addMoviesToCollection.js';
import { API_KEY, BASE_URL } from './constants';


refs.backdrop.addEventListener('click',onBackDropClick)
refs.trendContainer.addEventListener('click', (e) => {
    if(e.target.nodeName !=='IMG'){
      return
    }
    const filmId = e.target.id;
    fetchSelectedMovie(filmId)
    refs.arrow.classList.add('visually-hidden')
})

function fetchSelectedMovie(filmId) {
    return fetch(`${BASE_URL}/movie/${filmId}?api_key=${API_KEY}`)
    .then(r => {
        if (r.ok) {
            return r.json()
        }
    })
    .then(r => {
        renderMovies(r)
        })
}
    
function renderMovies(r) {
  r.a = localStorage.queue && localStorage.queue.includes(r.id) ? false : true;
  r.b = localStorage.watched && localStorage.watched.includes(r.id) ? false : true;
  
    const markUp = modalTpl(r);
   
    refs.close.addEventListener('click', onBtnClose)
    window.addEventListener('keydown', onEscPress)

    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    
    refs.modalFilm.insertAdjacentHTML('beforeend', markUp);
    refs.backdrop.classList.add('is-open')

    document.body.classList.add('backdrop-scroll')

  // подключает функционал для добавления фильмов в списки
    const addWatched = new addMoviesToCollection({
        selector: '[data-name="add__watched"]',
    });
  
    const addQueue = new addMoviesToCollection({
        selector: '[data-name="add__queue"]',
    });
    
    addWatched.refs.button.addEventListener('click', e => {
        addWatched.addMovies('watched', r.id)
    })

    addQueue.refs.button.addEventListener('click', e => {
        addQueue.addMovies('queue', r.id)
    })
}

function onBtnClose() {
    refs.arrow.classList.remove('visually-hidden')
    refs.backdrop.classList.remove('is-open')
    document.body.classList.remove('backdrop-scroll')
    window.removeEventListener('keydown', onEscPress)
}

  function onEscPress(evt){
    if(evt.code === 'Escape'){
      onBtnClose();
    }
}
  function onBackDropClick(evt){
    if(evt.currentTarget === evt.target){
      onBtnClose();
    }
}

