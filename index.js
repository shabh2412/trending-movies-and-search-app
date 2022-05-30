let id;
const apiKey = 'bd868dbd';
let url = `https://www.omdbapi.com/?apikey=${apiKey}`;
function debounceSearchFunction(func, delay) {
    if (id) {
        clearTimeout(id);
    }
    id = setTimeout(function(){
        func();
    },delay);
}
let searchResults = document.getElementById('searchResults');
let outputDiv = document.getElementById('outputDiv');
function getMovieInput() {
    let movieName = document.getElementById('movieInput').value;
    searchResults.innerHTML = null;
    if(movieName === '') {
        searchResults.style.display = 'none';
        outputDiv.style.display = 'none';
        return;
    }
    let query = `${url}&s=${movieName}`;
    searchResults.style.display = 'block';
    searchForMovie(query);
    // let query = 
}

async function searchForMovie(query) {
    try {
        let response = await fetch (query);
        let data = await response.json();
        // console.log(data);
        displayResults(data.Search);
    }
    catch (err) {
        console.log(err);
    }
}

function displayResults(movies) {
    console.log(movies);
    movies.forEach(function (el) {
        let div = document.createElement('div');
        div.classList = 'border-bottom text-center';
        
        div.innerText = el.Title;
        div.style.cursor = 'pointer';
        div.addEventListener('click', function () {
            displaySelectedMovieData(el);
        })
        searchResults.append(div);
    })
}

async function displaySelectedMovieData(movieData) {
    // searchResults.innerHTML = null;

    console.log(movieData);
    outputDiv.style.display='flex';
    let selectedMovieImage = document.getElementById('selectedMovieImage');
    selectedMovieImage.src = movieData.Poster;
    let movieTitle = document.getElementById('movieTitle');
    movieTitle.innerText=`${movieData.Title}`;
    let yearOfRelease = document.getElementById('yearOfRelease');
    yearOfRelease.innerText = `${movieData.Year}`;

    let additionalResponse = fetchDataByTitle(movieData.imdbID);
    let additionalData = await additionalResponse;
    console.log(additionalData);
    let imdbRating = document.getElementById('imdbRating');
    imdbRating.innerText = `${additionalData.imdbRating}/10`;
    let actors = document.getElementById('actors');
    actors.innerText = `${additionalData.Actors}`;
}

async function fetchDataByTitle (imdbID) {
    const query = `${url}&i=${imdbID}`;
    let response = await fetch (query);
    let data = await response.json();
    return data;
}