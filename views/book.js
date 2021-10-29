import {
    html
} from "../node_modules/lit-html/lit-html.js";

export let bookMovieTemplate = (data) =>
    html `<div class="cinemas-book-container">
            <form id="select-cinema">
                <label for="cinemas">CHOOSE THEATRE</label>
                <select name="movie-theatres" id="select-cinema-name">
                    ${data.cinemaNames.map(x => html`<option value=${x.toLowerCase()}>${x}</option>`)}
                </select>
            </form>
            <div id="date-picker" class="date-picker-container">
                <div class="string-date">
                    <p id="movie-projection-date">${data.todayDate}</p>
                </div >
                <div class="dates-container">
                    <button data-date=${data.dates["thu"]} class="projection-btn week-day rounded-left">THU</button>
                    <button data-date=${data.dates["fri"]} class="projection-btn week-day">FRI</button>
                    <button data-date=${data.dates["sat"]} class="projection-btn week-day">SAT</button>
                    <button data-date=${data.dates["sun"]} class="projection-btn week-day">SUN</button>
                    <button data-date=${data.dates["mon"]} class="projection-btn week-day">MON</button>
                    <button data-date=${data.dates["tue"]} class="projection-btn week-day">TUE</button>
                    <button data-date=${data.dates["wed"]} class="projection-btn week-day rounded-right">WED</button>
                </div>
            </div>
            <section class="movie-projections-container">
                ${(data.chosenCinema.hasOwnProperty("programme")) ? data.movies.map(x => chooseProjectionTemplate(x, data)) : ""}
            </section>
        </div>`;

let chooseProjectionTemplate = (movieArr, data) =>
        html `
<div class="projection-component" data-id=${movieArr[1].objectId}>
    <img class="img-movie-book" src=${movieArr[1].banner}>
    <h2>${movieArr[1].title}</h2>
    <h4 class="theatre-name"><strong>${data.chosenCinema.description}</strong></strong></h4>
    <div class="choose-projection">
        ${data.getProjectionsByMovieName((movieArr[1].title).toString()).map(x => html`<button id=${movieArr[1].title} class=${(data.compareDates(x)) ? "click-projection" : "disabled-btn"} ?disabled=${!data.compareDates(x)}>${x}</button>`)}
    </div>>
</div>`;
