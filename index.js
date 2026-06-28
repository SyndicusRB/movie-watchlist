// API key = 8e09bec1
// Example: http://www.omdbapi.com/?i=tt3896198&apikey=8e09bec1

const searchBar = document.getElementById("search-bar")
const userSearch = document.getElementById("search-bar")

export let userWatchlist = []
let filmsFromUserWatchlist = JSON.parse(localStorage.getItem("Watchlist"))

if (filmsFromUserWatchlist) {
    userWatchlist = filmsFromUserWatchlist
}

// Event Listeners

// searchBar.addEventListener("keypress", e => {
//     if (e.key === "Enter") {
//         e.preventDefault()
//         renderSearch(userSearch.value)
//     }
// })

document.addEventListener("click", e => {
    if (e.target.id === "search-btn") {
        renderSearch(userSearch.value)
        // console.log(userSearch.value)
    }
})

document.addEventListener("click", e => {
    if (e.target.dataset.addWatchlist) {
        addToWatchlist(e.target.dataset.addWatchlist)
    }
})

// Search and watchlist functions using OMDb API

async function renderSearch(title) {

    let resultFeed = ``

    const res = await fetch(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=8e09bec1`)
    const data = await res.json()
    console.log(data)
    
    if (data.Response === "True") {
        for (const item of data.Search) {        
        fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=8e09bec1`)
            .then(res => res.json())
            .then(data => {                
                resultFeed += `
                    <div class="search-result">
                        <div class="media-poster">
                            <img class="poster" src="${data.Poster}" alt="Poster for ${data.Title}">
                        </div>
                        <div class="text-container">
                            <div class="media-title">
                                <h3 id="title">${data.Title}</h3>
                                <h4 id="rating"><span style="color: orange">&#9733;</span> ${data.Ratings[0].Value}</h4>
                            </div>
                            <div class="media-info">
                                <h4 id="runtime">${data.Runtime}</h4>
                                <h4 id="genre">${data.Genre}</h4>
                                <h4 class="add-watchlist" id="${data.imdbID} "data-add-watchlist="${data.imdbID}"><span><i class="fa-solid fa-circle-plus"></i></span> Watchlist</h4>
                            </div>
                            <div class="media-synopsis">
                                <p id="synopsis">${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                `
            document.getElementById("media-list").innerHTML = resultFeed
            })
        }
    } else if (data.Response === "False") {
        resultFeed = `
            <h3 class="explore-text">Unable to find what you're looking for. Plesae try another search.</h3>
        `
        document.getElementById("media-list").innerHTML = resultFeed
    }
}

async function addToWatchlist(film) {
    const res = await fetch(`http://www.omdbapi.com/?i=${film}&apikey=8e09bec1`)
    const data = await res.json()

    userWatchlist.push(data)
    console.log(userWatchlist)
    localStorage.setItem("Watchlist", JSON.stringify(userWatchlist))
    console.log(localStorage)
}

