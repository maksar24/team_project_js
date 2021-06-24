import refs from './refs';
import modalTpl from '../templates/modal.hbs'
// импорт функционала для добавления фильмов
import addMoviesToCollection from './addMoviesToCollection.js';


refs.backdrop.addEventListener('click',onBackDropClick)
refs.trendContainer.addEventListener('click', (e) => {
    if(e.target.nodeName !=='IMG'){
      return
    }
    const filmId = e.target.id;
    fetchtrend(filmId)
})



const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
const BASE_URL = 'https://api.themoviedb.org/3';




function fetchtrend(filmId) {
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
    

function renderMovies(r){
    const markUp = modalTpl(r);
    refs.close.addEventListener('click', onBtnClose)
    window.addEventListener('keydown', onEscPress)
    refs.modal.insertAdjacentHTML('beforeend', markUp);
    refs.backdrop.classList.add('is-open')
  // подключает функционал для добавления фильмов в списки
    const addWatched = new addMoviesToCollection({
        selector: '[data-name="watched"]',
    });
  
    const addQueue = new addMoviesToCollection({
        selector: '[data-name="queue"]',
    });

    addWatched.refs.button.addEventListener('click', e => {
        addWatched.addMovies('watched', r.id)
    })

    addQueue.refs.button.addEventListener('click', e => {
        addQueue.addMovies('queue', r.id)
    })
}


function onBtnClose(){
    refs.backdrop.classList.remove('is-open')
    window.removeEventListener('keydown', onEscPress)
    refs.modal.children[1].remove();
    refs.modal.children[1].remove();
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

