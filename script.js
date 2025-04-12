//load movies

function loadMovies() {
    let xhr = new XMLHttpRequest ();
    xhr.open('GET','movies.xml',true);
    xhr.onload = function () {
        if (xhr.status == 200 ) {
            displayMovies(xhr.responseXML);
        }
    };
    xhr.send()

}

function displayMovies (xml) {
    let movieContainer = document.getElementById('movie-container');
    let movies = xml.getElementsByTagName('movie');
    console.log(movies)
    movieContainer.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        let title = movies[i].getElementsByTagName('title')[0].textContent;
        let duration = movies[i].getElementsByTagName('duration')[0].textContent;
        let year = movies[i].getElementsByTagName('year')[0].textContent;
        let movieId = movies[i].getAttribute('id');

        let imageURL = '';
        let imageALT = '';
        let imageWidth = 1200
        let imageHeight = 600
        let imageElement = movies[i].getElementsByTagName('image')[0];

        if (imageElement.hasAttribute('src')) {
            imageURL = imageElement.getAttribute('src');
            imageALT = imageElement.getAttribute('alt');
        } else {
            imageURL = imageElement.getElementsByTagName('path')[0].textContent;
            imageALT = imageElement.getElementsByTagName('alt')[0].textContent;

            if (imageElement.getElementsByTagName('width')[0]) {
                imageWidth = imageElement.getElementsByTagName('width')[0].textContent;
            }
            if (imageElement.getElementsByTagName('height')[0]) {
                imageHeight = imageElement.getElementsByTagName('height')[0].textContent;
            }

        }

        let movieItem = document.createElement('div');
        movieItem.classList.add('movie-item')
        movieItem.innerHTML = `
        <div class="container">
            <div class="image-container">
                <img src="${imageURL}" alt="${imageALT}" width="${imageWidth}" height="${imageHeight}" >
            </div>
            <div class="info-container">
                <strong>Movie Title: ${title}</strong>
                <br>
                <span>Duration: ${duration}</span>
                <br>
                <span>Year: ${year}</span>
            </div>
        </div>
        `;
        movieContainer.appendChild(movieItem);
    };
};

window.onload = function () {
    loadMovies();
};