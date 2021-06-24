import SearchApiTrend from "./apiTrendservice.js";
import refs from './refs';
import trendMovie from "../templates/filmCardTpl.hbs";
// импорт функционала для отрисовки списков фильмов
import markUpMoviesCollection from './markUpMoviesCollection.js';

refs.libraryBtn.addEventListener('click', onLibraryButtonClick);
// refs.homeBtn.addEventListener('click', onHomeButtonClick);
// refs.logo.addEventListener('click', onHomeButtonClick);


// function onHomeButtonClick(e) {
//     refs.searchForm.classList.remove('none');
//     refs.myLibButton.classList.add('none');
// }

function onLibraryButtonClick(e) {
    e.preventDefault();
  
    // refs.searchForm.classList.add('none');
    // refs.myLibButton.classList.remove('none');


    SearchApiTrend.fetchtrend().then(results => {
        renderMovies(results)
    });
}

onclick="this.className = (this.className == 'film__details-vote' ? 'none' : '')"

SearchApiTrend.fetchtrend();

function renderMovies(results) {
    console.log(results);
    fetchGenres()
        .then(genres => {

            results.forEach(result => {
                result.genre_ids = result.genre_ids.map(genre => genres[genre])
                result.release_date = result.release_date.slice(0, 4)
            });

            const markUp = trendMovie(results);
            refs.trendContainer.insertAdjacentHTML('beforeend', markUp);
        })
}


function fetchGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=61153224aaaa08b03f5d3b14add082d2&language=en-US%27')
        .then(r => r.json())
        .then(({ genres }) => {
            let temp = {};
            for (let genre of genres) {
                temp[genre.id] = genre.name;
            };
            return temp;
        })
}

// добавляет функционал на кнопки списков
const showWatched = new markUpMoviesCollection({
    selector: '[data-name="show__watched"]',
});

const showQueue = new markUpMoviesCollection({
    selector: '[data-name="show__queue"]',
});

showWatched.refs.button.addEventListener('click', e => {
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    const watchedCollection = JSON.parse(localStorage.getItem('watched'))
    showWatched.fetchPersonsCollectionMovies(watchedCollection)
    showWatched.refs.button.disabled = true
    showQueue.refs.secondButton.disabled = false
});

showQueue.refs.button.addEventListener('click', e => {
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    const queueCollection = JSON.parse(localStorage.getItem('queue'))
    showQueue.fetchPersonsCollectionMovies(queueCollection)
    showQueue.refs.button.disabled = true
    showWatched.refs.firstButton.disabled = false
});