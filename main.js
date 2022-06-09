//https://omdbapi.com/?s=spiderman&page=1&apikey=94945451
//http://www.omdbapi.com/?i=tt2705436&apikey=94945451
const inputSearch = document.getElementById('search-movie');
const searchList = document.querySelector('.search-list');
const resultGrid = document.querySelector('.result-grid');
async function getDataMovie(movieName) {
    let endpoint = `https://omdbapi.com/?s=${movieName}&page=1&apikey=94945451`;
    let res = await fetch(endpoint);
    let data = await res.json();
    if (data.Response === 'True') displaySearchList(data.Search);
}
inputSearch.addEventListener('keyup', async function(e) {
    searchList.innerHTML = '';
    let value = e.target.value.trim();
    if (value !== '') {
        searchList.classList.remove('hide-list');
        await getDataMovie(value);
    } else {
        searchList.classList.add('hide-list');
    }
})

function displaySearchList(movies) {
    [...movies].forEach((item) => {
        const searchItem = document.createElement('div');
        searchItem.classList.add('search-item');
        searchItem.dataset.id = item.imdbID;
        const template = `<div class="search-img">
        <img src=${item.Poster!=="N/A"?item.Poster:'image_not_found.png'} alt="">
    </div>
    <div class="search-content">
        <h4>${item.Title}</h4>
        <div class="search-content-year">${item.Year}</div>
    </div>`
        searchItem.innerHTML = template;
        searchList.appendChild(searchItem);
    })
    displayDetailMovie();
}

function displayDetailMovie() {
    const searchItem = document.querySelectorAll('.search-item');
    [...searchItem].forEach((item) => {
        item.addEventListener('click', async function(e) {
            searchList.classList.add('hide-list');
            let id = e.currentTarget.dataset.id;
            let path = `http://www.omdbapi.com/?i=${id}&apikey=94945451`;
            let response = await fetch(path);
            let detail = await response.json();
            const templateResult = `<div class="result-img">
            <img src=${detail.Poster!=="N/A" ? detail.Poster:"image_not_found.png"} alt="">
        </div>
        <div class="result-des">
            <h1 class="title">${detail.Title}</h1>
            <ul class="list-des">
                <li class="year">Year: ${detail.Year}</li>
                <li class="rating">Ratings: ${detail.Rated}</li>
                <li class="released">Released: ${detail.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${detail.Genre}</p>
            <p class="write"><b>Write:</b> ${detail.Writer}</p>
            <p class="Actors"><b>Actors:</b> ${detail.Actors}</p>
            <p class="Plot"><b>Plot:</b> ${detail.Plot}</p>
            <p class="language"><i>Language: ${detail.Language}</i></p>
            <p class="award"><b><i class="fa fa-award"></i></b>${detail.Awards}</p>
        </div>`
            resultGrid.innerHTML = '';
            resultGrid.insertAdjacentHTML('beforeend', templateResult);
        })
    })
}
window.addEventListener('click', function(e) {
    if (!e.target.matches('.search-name')) {
        searchList.classList.add('hide-list');
    } else {
        searchList.classList.remove('hide-list');

    }
})