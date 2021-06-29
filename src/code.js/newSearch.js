import refs from './refs';
import SearchApiTrend from "./apiTrendservice.js";
import filmCardTpl from '../templates/withoutRating.hbs';
const debounce = require('lodash.debounce');
import modalTpl from '../templates/modal.hbs'


let searchQuery = '';
let page = 1;
let totalPages = 1
const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
const BASE_URL = 'https://api.themoviedb.org/3';


// SearchApiTrend.fetchtrend().then(results => {
//     renderMovies(results)
// });

refs.inputRef.addEventListener('blur', e => {
    
    if(e.currentTarget.value === ''){
        const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
        const BASE_URL = 'https://api.themoviedb.org/3';
        fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then(r => r.json)
        .then(({results}) => {
            refs.filmList.innerHTML = '';
            SearchApiTrend.fetchtrend().then(results => {
                renderMovies(results);
        
          });
       
            return results
        })
    }
})


refs.lastElBtn.addEventListener('click', e => {
    page = totalPages;
    const film = fetchFilm(searchQuery,page)
    film.then(results => {
        console.log(results)
        refs.filmList.innerHTML = '';
        renderMovies(results)
        return results; 
    })
    btnCreate()
})


refs.firstElBtn.addEventListener('click', e => {
    page = 1;
    const film = fetchFilm(searchQuery,page)
    film.then(results => {
        console.log(results)
        refs.filmList.innerHTML = '';
        renderMovies(results)
        return results; 
    })
    btnCreate()
})


refs.nextBtn.addEventListener('click', e => {
    page += 1;
     if(page > totalPages){
        page -= 1;
         return
     }
     const film = fetchFilm(searchQuery,page)
    film.then(({ results }) => {
        console.log(results)
        refs.filmList.innerHTML = '';
        renderMovies(results)
        return results; 
    })
     btnCreate()
})

refs.prevBtn.addEventListener('click', e => {
    page-=1;
    if(page === 0){
        page += 1;
        return
    }
    const film = fetchFilm(searchQuery,page)
    film.then(({ results }) => {
        console.log(results)
        refs.filmList.innerHTML = '';
        renderMovies(results)
        return results; 
    })
    btnCreate();

})

refs.btnList.addEventListener('click', e => {
    if(e.target.nodeName!== 'BUTTON'){
        return
    }
    page = e.target.textContent - 0;
    const film = SearchApiTrend.fetchtrend()
    .then(results => {
        // console.log(results)
        refs.filmList.innerHTML = '';
        renderMovies(results)
        return results; 
    })
    btnCreate()
})


function elBtnCreate(location, page){
	refs.btnList.insertAdjacentHTML(location,`<li class="button-list__item"><button class="button-list__page">${page}</button></li>`)
}

refs.input.addEventListener('input', e => {
    e.preventDefault();
    page = 1;
    refs.filmList.innerHTML = '';
    searchQuery = e.currentTarget.value.trim();
    clearArticlesConteiner();
    if(searchQuery === ''){
        return
    }
    btnCreate()
    const film = fetchFilm(searchQuery,page)

    film.then(({ total_pages }) => {
       (total_pages/19)%2 === 0?totalPages = total_pages - 2:totalPages = total_pages;
        refs.lastElBtn.textContent = totalPages;
        return total_pages; 
    })
    film.then(({ results }) => {
        renderMovies(results)
        return results; 
    })
})

function clearArticlesConteiner() {
    refs.trendContainer.innerHTML = '';
  }

function btnCreate(){
    refs.btnList.innerHTML = '';
    refs.btnList.insertAdjacentHTML('afterbegin',`<li class="button-list__item button-list__item--curretn"><button class="button-list__page button-list__page--current">${page}</button></li>`)
  
    for(let i = 1; i < 3; i++){
      
    if(page+i < totalPages)
      elBtnCreate('beforeend', page+i);
     if(page-i > 0)
            elBtnCreate('afterbegin', page-i);
    } 
}



function fetchFilm(searchQuery,page) {
    // console.log(page)
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchQuery}`)
    .then(r => {
        if (r.ok) {
            return r.json()
        }
})
    .then((film) => {
        // console.log(film)
    return film; 
})
    .catch(error => console.log(error))
}


function renderMovies(results) {
    // console.log(results);
    fetchGenres()
        .then(genres => {

            results.forEach(result => {
                result.genre_ids = result.genre_ids.slice(0, 3).map(genre => genres[genre])
                result.release_date = result.release_date.slice(0, 4)
            });
                const galleryListMarkup = filmCardTpl (results);
                refs.filmList.insertAdjacentHTML('beforeend', galleryListMarkup)
             
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


// function focusOff(e) {
//     e.preventDefault();
//     refs.trendContainer.innerHTML = '';
//     function clear() {
//               refs.inputRef.value = '';
              
//           }
//     SearchApiTrend.fetchtrend().then(results => {
//       renderMovies(results)
//   });
//       fetchGenres();
//     clear()
//   }


function renderMovies(r){
    const markUp = modalTpl(r);
    
    refs.close.addEventListener('click', onBtnClose)
    window.addEventListener('keydown', onEscPress)

    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    
    refs.modalFilm.insertAdjacentHTML('beforeend', markUp);
    refs.backdrop.classList.add('is-open')

    document.body.classList.add('backdrop-scroll')

  // подключает функционал для добавления фильмов в списки
    const addWatched = new addMoviesToCollection({
        selector: '[data-name="add__watched"]',
    });
  
    const addQueue = new addMoviesToCollection({
        selector: '[data-name="add__queue"]',
    });


    
    addWatched.refs.button.addEventListener('click', e => {
        addWatched.addMovies('watched', r.id)
    })

    addQueue.refs.button.addEventListener('click', e => {
        addQueue.addMovies('queue', r.id)
    })
}


function onBtnClose(){
    refs.backdrop.classList.remove('is-open')

    document.body.classList.remove('backdrop-scroll')

    window.removeEventListener('keydown', onEscPress)
    refs.modal.insertAdjacentHTML('beforeend', ' <ul class="modal__btn-list"><li class="btn-list__item"><button class="btn__watched">add to Watched</button></li><li class="btn-list__item"><button class="btn__watched btn__queue">add to queue</button></li></ul>');
}


  function onEscPress(evt){
    if(evt.code === 'Escape'){
      onBtnClose();
    }
}
  function onBackDropClick(evt){
    if(evt.currentTarget === evt.target){
      onBtnClose();
    }
}
