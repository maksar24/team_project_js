export default class addMoviesToCollection {
    constructor({ selector }) {
        this.refs = this.getRefs(selector);
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        return refs;
    }

    addMovies(nameList, moviesId) {
        const value = JSON.parse(localStorage.getItem(`${nameList}`)) || [];
        localStorage.setItem(`${nameList}`, JSON.stringify(value))

        if (localStorage.getItem(`${nameList}`).includes(JSON.stringify(moviesId))) {
            return
        }
        value.push(moviesId)
        localStorage.setItem(`${nameList}`, JSON.stringify(value))
    }
}