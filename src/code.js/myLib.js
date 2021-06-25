import SearchApiTrend from "./apiTrendservice.js";
import refs from './refs';
import trendMovie from "../templates/filmCardTpl.hbs";
// импорт функционала для отрисовки списков фильмов
import markUpMoviesCollection from './markUpMoviesCollection.js';


refs.libraryBtn.addEventListener('click', showWatchedCollection);

// добавляет функционал на кнопки списков
const showWatched = new markUpMoviesCollection({
    selector: '[data-name="show__watched"]',
});

const showQueue = new markUpMoviesCollection({
    selector: '[data-name="show__queue"]',
});

function showWatchedCollection() {
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    const watchedCollection = JSON.parse(localStorage.getItem('watched'))
    showWatched.fetchPersonsCollectionMovies(watchedCollection)
    showWatched.refs.button.disabled = true
    showQueue.refs.secondButton.disabled = false
    
}

function showQueueCollection() {
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    const queueCollection = JSON.parse(localStorage.getItem('queue'))
    showQueue.fetchPersonsCollectionMovies(queueCollection)
    showQueue.refs.button.disabled = true
    showWatched.refs.firstButton.disabled = false
 
}

showWatched.refs.button.addEventListener('click', showWatchedCollection);

showQueue.refs.button.addEventListener('click', showQueueCollection);