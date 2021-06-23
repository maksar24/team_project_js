const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
const BASE_URL = 'https://api.themoviedb.org/3';


function fetchtrend() {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
    .then(r => {
        if (r.ok) {
            console.log(r)
            return r.json()
        }
  
})
.then(({ results }) => {
    console.log(results)
    return results;
})
}

export default { fetchtrend };