const refs = {
   // ссылка на основной контейнер
   trendContainer: document.querySelector('.main__film-list'), 










   // ссылка на контейнер пагинации
   btnListPage: document.querySelector('.button-list__page'),
   // ссылка на кнопку след. в пагинации
   next: document.querySelector('.js-btn-next'),
   // ссылка на кнопку предыдущ. в пагинации
   pr: document.querySelector('.js-btn-pr'),
   // ссылка на контейнер для номеров страниц
   btnList: document.querySelector('.button-list__container'),
   // ссылка на кнопку Home
   homeBtn: document.querySelector('.home-js'),
   // ссылка на кнопку My Library
   libraryBtn: document.querySelector('.lib-js'),
   // ссылка на рейтинг в карточке фильма
   genreInfo: document.querySelector('.film__details-vote'),
   rate: document.querySelector('p[data-action="data-rate"]'),
   // ссылка на логотип
   logo: document.querySelector('.logo-js'),
   // кнопки Watched Queue в my Lib
   myLibButton: document.querySelector('.header__button__list'),
   // ссылка на форму-поисковик
   searchForm: document.querySelector('.header__search__form'),

}

export default refs;
