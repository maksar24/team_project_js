import {API_KEY, BASE_URL} from './constants';

//request genres
function fetchGenres() {
    return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US%27`)
        .then(r => r.json())
        .then(({ genres }) => {
            let temp = {};
            for (let genre of genres) {
                temp[genre.id] = genre.name;
            };
            return temp;
        })
}

export default fetchGenres;