import {
    html,
    render
} from '//unpkg.com/lit-html?module';

export let cinemaBannersTemplate = (cinemas) =>
    html `<div class="theatre-container">${cinemas.map(cinemaTemplate)}</div>`;

    /*takes ["id", "dataObject"]*/
export let cinemaTemplate = (arr) => 
html`<div class="theatre-component">
    <h2>${arr[1].description}</h2>
    <h4 class="theatre-city">city: <strong>${arr[1].city}</strong></strong></h4>
    <h4 class="theatre-address">address: <strong>${arr[1].address}</strong></h4>
    <h4 class="theatre-halls">halls: <strong>${arr[1].cinemaHalls}</strong></h4>
    <a class="thanchor" href="/cinemas/${arr[0]}/book"><button class="theatre-btn">BOOK TICKETS</button></a>
</div>`;

