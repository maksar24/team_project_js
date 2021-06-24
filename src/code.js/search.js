import refs from './refs';
import NewsApiService from './apiService';
import trendMovieTpl from "../templates/filmCardTpl.hbs";
const debounce = require('lodash.debounce');

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

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
    const fetch = await newsApiService.fetchFilm();
    if (fetch.total_results === 0) {
      refs.spanRef.classList.add('active');
      addArticlesMarcup();
      return;
    } else {
      refs.spanRef.classList.remove('active');
    }
    const marcup = addArticlesMarcup(fetch.results);
    return marcup;
  } catch (error) {
    console.log('error');
  }
}
function addArticlesMarcup(newFilms) {
  return refs.trendContainer.insertAdjacentHTML('beforeend', trendMovieTpl(newFilms));
}

function clearArticlesConteiner() {
  refs.trendContainer.innerHTML = '';
}