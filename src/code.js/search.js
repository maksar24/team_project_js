import refs from './refs';
import NewsApiService from './apiService';
import trendMovieTpl from "../templates/filmCardTpl.hbs";
const debounce = require('lodash.debounce');

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

async function onSearch(e) {
  e.preventDefault();
  try {
    clearArticlesConteiner();
    newsApiService.query = e.target.value.trim();
    
    if (newsApiService.query === '') {
      refs.spanRef.classList.remove('active');
      addArticlesMarcup();
      return
    }    
    else {
      refs.spanRef.classList.add('active');
    }
    newsApiService.resetPage();
    // добавляет loader
    refs.loader.classList.remove('loader_is-hidden')
    const fetch = await newsApiService.fetchFilm();
    if (fetch.total_results === 0) {
      refs.spanRef.classList.add('active');
      addArticlesMarcup();
      return;
    } else {
      refs.spanRef.classList.remove('active');
    }
    const marcup = addArticlesMarcup(fetch.results);
    // удаляет loader
    refs.loader.classList.add('loader_is-hidden')
    return marcup;
  } catch (error) {
    console.log('error');
  }
}
function addArticlesMarcup(newFilms) {
  fetchGenres()
  .then(genres =>{
    newFilms.forEach(result =>{
      result.genre_ids = result.genre_ids.map(genre => genres[genre])
    })
    refs.trendContainer.insertAdjacentHTML('beforeend', trendMovieTpl(newFilms))
  })
  return 
}

function clearArticlesConteiner() {
  refs.trendContainer.innerHTML = '';
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