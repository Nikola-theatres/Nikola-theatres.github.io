import { html } from "../node_modules/lit-html/lit-html.js";

export let moviesList = (movies) =>
    html `<div class="movieBanners">
        ${movies.map(x => movieBannerTemplate(x))}
    </div>
`;

export let movieBannerTemplate = (movie) => 
    html`<div class="component" data-id=${movie[0]}>
            <div class="premiere prem">${(movie[1].premiere === "true") ? "PREMIERE" : ""}</div>
            <img class="banner" src=${movie[1].banner} alt="Movie official poster">
            <div class="infoContainer">
               <a href="/movies/${movie[0]}" class="btn-link"><button id="infoBtn" >INFO</button></a>
                <a href="/movies/${movie[0]}/book" class="btn-link"><button>BOOK</button></a>
            </div>
            <div class="title">
                <p>${movie[1].title}</p>
            </div>
        </div>`;