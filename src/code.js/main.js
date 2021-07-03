//создаем списки фильмов и пустые массивы
if (!localStorage.queue) {
    const value = JSON.parse(localStorage.getItem('queue')) || [];
    localStorage.setItem('queue', JSON.stringify(value))
}
if (!localStorage.watched) {
    const value = JSON.parse(localStorage.getItem('watched')) || [];
    localStorage.setItem('watched', JSON.stringify(value))
}

import "./trendMarkUp.js";
import "./pagination.js";
import "./modal.js"
import "./header.js";
import "./myLib.js";
import "./footer.js";
import "./arrow.js";