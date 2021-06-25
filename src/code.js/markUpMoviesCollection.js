import collectionMovies from '../templates/filmCardTpl.hbs';

export default class markUpMoviesCollection {
    constructor({ selector }) {
        this.refs = this.getRefs(selector);
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.container = document.querySelector('.main__film-list');
        refs.firstButton = document.querySelector('[data-name="show__watched"]');
        refs.secondButton = document.querySelector('[data-name="show__queue"]');
        return refs;
    }

    fetchPersonsCollectionMovies(e) {
        const moviesCollection = e;

        moviesCollection.forEach(movie_id => {
            fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then(res => {
                    const markUp = collectionMovies([res]);
                    this.refs.container.insertAdjacentHTML('beforeend', markUp);
                })
        })
    }
}