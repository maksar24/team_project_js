import refs from './refs';
import NewsApiService from './apiService';
import trendMovieTpl from "../templates/filmCardTpl.hbs";
import SearchApiTrend from "./apiTrendservice.js";
import { renderMovies } from "./trendMarkUp.js";
const debounce = require('lodash.debounce');

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 800));


const options = {
  rootMargin: '100px'
};

const observer = new IntersectionObserver(onEntry, options);

function onEntry(e) {
  newsApiService.incrementPage(newsApiService.page);
  onSearch(newsApiService.query, newsApiService.page);
}

function onSearch(e) {
  if (fetch.total_results === 0) {
    refs.spanRef.classList.add('active');
    refs.loader.classList.add('loader_is-hidden')
    return;
  }
  newsApiService.page = 1;
  onFetchHandler(newsApiService.query, newsApiService.page)
  observer.observe(refs.sentinel);
}

async function onFetchHandler(query, page) {
  clearArticlesContainer();
  const getMovies = await newsApiService.fetchFilm(query, page);
  addArticlesMarkup(getMovies)
}

function clearArticlesContainer() {
  refs.trendContainer.innerHTML = '';
}

function addArticlesMarkup(res) {
      refs.trendContainer.insertAdjacentHTML('beforeend', trendMovieTpl(res))
} 

function clearArticlesContainer() {
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

// async function onSearch(e) {
//   e.preventDefault();
//   try {
//     clearArticlesContainer();
//     newsApiService.query = e.target.value.trim();
    
//     if (newsApiService.query === '') {
//       refs.spanRef.classList.remove('active');
//       return
//     }    
//     else {
//       refs.spanRef.classList.add('active');
//     }
//     // добавляет loader
//     refs.loader.classList.remove('loader_is-hidden')
//     const fetch = await newsApiService.fetchFilm();
    
//     if (fetch.total_results === 0) {
//       refs.spanRef.classList.add('active');
//       refs.loader.classList.add('loader_is-hidden')
//       return;
//     } else {
//       refs.spanRef.classList.remove('active');
//     }
//     const markup = addArticlesMarkup(fetch.results);
    
//     // удаляет loader
//     refs.loader.classList.add('loader_is-hidden')
//     return markup;
//   } catch (error) {
//     console.log('error');
//   }
// }
// function addArticlesMarkup(newFilms) {
//   fetchGenres()
//     .then(genres => {
//       newFilms.forEach(result => {
//         result.genre_ids = result.genre_ids.map(genre => genres[genre])

//         result.release_date = result.release_date.slice(0, 4)
//       })
      
//       refs.trendContainer.insertAdjacentHTML('beforeend', trendMovieTpl(newFilms))
//     })       
//   return 
// } 

// function clearArticlesContainer() {
//   refs.trendContainer.innerHTML = '';
// }

// function fetchGenres() {
//   return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=61153224aaaa08b03f5d3b14add082d2&language=en-US%27')
//       .then(r => r.json())
//       .then(({ genres }) => {
//           let temp = {};
//           for (let genre of genres) {
//               temp[genre.id] = genre.name;
//           };
//           return temp;
//       })
// }
