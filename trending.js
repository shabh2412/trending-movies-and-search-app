let pages = [
    1,
    2,
    3,
    4,
    5,
    6,
    7
];
let pagesRow = document.getElementById('pagesRow');
pages.forEach(function (el) {
    let col = document.createElement('div');
    col.classList = 'col mx-auto';
    let btn = document.createElement('button');
    btn.id = `page${el}Btn`
    btn.classList = 'btn btn-outline-primary mx-auto pageBtn';
    btn.innerText = `${el}`;
    btn.addEventListener('click', function(){
        fetchPopularMovies(el);
    });
    col.append(btn);
    pagesRow.append(col);
});
async function fetchPopularMovies(page=1) {
    const query = `https://api.themoviedb.org/3/movie/popular?api_key=9292d6d6c78665bdc9cf66bba9ab9048&language=en-US&page=${page}`;
    let response = await fetch (query);
    let data = await response.json();
    displayResults(data.results);
    updatePageNumber (page);
}

fetchPopularMovies();
let moviesDiv = document.getElementById('movies');



console.log(pages);

function displayResults (movies) {
    moviesDiv.innerHTML = null;
    // console.log(movies);
    movies.forEach(function (el) {
        // console.log(el);
        let card = document.createElement('div');
        card.classList = 'card mx-auto';
        card.style.width = '16rem';

        let movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
        movieImage.classList='card-img-top';

        let cardBody = document.createElement('div');
        cardBody.classList = 'card-body position-relative';

        let voteAvg = document.createElement('div');
        voteAvg.classList = 'rounded-circle border-warning d-flex justify-content-center align-items-center position-absolute voteAvg p-2 bg-white'
        voteAvg.innerText = `${el.vote_average*10}%`;

        let title = document.createElement('h5');
        title.classList = 'card-title';
        title.innerText = el.title;

        let date = document.createElement('p');
        date.classList = 'text-muted small mb-0';
        date.innerText = el.release_date;

        cardBody.append(title,voteAvg,date);


        card.append(movieImage,cardBody);
        moviesDiv.append(card);
    })
}

function updatePageNumber (pageNumber) {
    let id = `page${pageNumber}Btn`;
    let buttons = document.querySelectorAll('.pageBtn');
    buttons.forEach(function (el){
        if(el.id === id) {
            el.classList.remove('btn-outline-primary');
            el.classList.add('btn-primary');
        }
        else {
            el.classList.add('btn-outline-primary');
            el.classList.remove('btn-primary');
        }
    });
}