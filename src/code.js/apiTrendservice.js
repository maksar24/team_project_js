import { API_KEY, BASE_URL } from './constants';

//request trending movies
function fetchTrends(n = 1) {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${n}`)
    .then(r => {
        if (r.ok) {
            return r.json()
        }
})
.then(({ results, total_pages }) => {
    return {results, totalPages: total_pages}; 
})
.catch(error => console.log(error));
}

export default {fetchTrends};