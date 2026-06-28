// API key = 8e09bec1
// Example: http://www.omdbapi.com/?i=tt3896198&apikey=8e09bec1

const userSearch = document.getElementById("search-bar")
const userWatchlist = []

document.addEventListener("click", e => {
    if (e.target.id === "search-btn") {
        renderSearch(userSearch.value)
        // console.log(userSearch.value)
    }
})



async function renderSearch(title) {

    let resultFeed = ``

    const res = await fetch(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=8e09bec1`)
    const data = await res.json()
    
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
                                <h4 id="add-watchlist">+ Watchlist</h4>
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