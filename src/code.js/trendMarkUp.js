import trendMovieTpl from "../templates/withoutRating.hbs";
import refs from './refs';
import fetchGenres from './apiGenres.js';

function renderMovies(results) {
    refs.trendContainer.innerHTML= '';

    fetchGenres()
        .then(genres => {

            results.forEach(result => {
                if ( result.release_date === undefined ) {
                    result.release_date = ''
                }
                result.genre_ids = result.genre_ids.slice(0, 3).map(genre => genres[genre])

                result.release_date = result.release_date.slice(0, 4)
            });
            const markUp = trendMovieTpl(results);    
                refs.trendContainer.insertAdjacentHTML('beforeend', markUp);
             
        })
}

export default renderMovies;