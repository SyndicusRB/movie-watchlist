import { userWatchlist } from "./index.js"

function renderWatchlist() {
    let resultFeed = ""
    console.log(userWatchlist)
    for (const item of userWatchlist) {

        resultFeed += `
            <div class="search-result">
                <div class="media-poster">
                    <img class="poster" src="${item.Poster}" alt="Poster for ${item.Title}">
                </div>
                <div class="text-container">
                    <div class="media-title">
                        <h3 id="title">${item.Title}</h3>
                        <h4 id="rating"><span style="color: orange">&#9733;</span> ${item.Ratings[0].Value}</h4>
                    </div>
                    <div class="media-info">
                        <h4 id="runtime">${item.Runtime}</h4>
                        <h4 id="genre">${item.Genre}</h4>
                        <h4 class="add-watchlist" id="${item.imdbID} "item-add-watchlist="${item.imdbID}"><span><i class="fa-solid fa-circle-plus"></i></span> Watchlist</h4>
                    </div>
                    <div class="media-synopsis">
                        <p id="synopsis">${item.Plot}</p>
                    </div>
                </div>
            </div>
        `
        document.getElementById("watchlist").innerHTML = resultFeed
        }
}

renderWatchlist()