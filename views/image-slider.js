import {html} from "../node_modules/lit-html/lit-html.js";

export let sliderTemplate = (slides) => 
html`
    <div class="slider-wrapper">
        <div class="slides-container">
            ${slides.map(x => html` <img class="slider-image" src=${x.asset} alt="slider">
            ${x.hasOwnProperty("href") ? html`<a class="img-button" href=${x.href}><button>${x.href.slice(1).toUpperCase()}</button></a>` : ""}`)}
        </div>
        <div class="indicators-container">
                ${slides.map(x => html`<button class="slide-indicator"></button>`)}
            </div>
        <div class="slider-arrows-container">
            <button class="slide-arrow "><svg class="slide-arrow--left" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><path d="M31 16A15 15 0 1 1 16 1a15 15 0 0 1 15 15zM3 16A13 13 0 1 0 16 3 13 13 0 0 0 3 16z"/><path d="M19.87 10.41 14.29 16l5.58 5.59a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-6.36-6.36a.91.91 0 0 1 0-1.28L18.46 9a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41z"/></g></svg></button>
            <button class="slide-arrow "><svg class="slide-arrow--right" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><path d="M1 16a15 15 0 1 1 15 15A15 15 0 0 1 1 16zm28 0a13 13 0 1 0-13 13 13 13 0 0 0 13-13z"/><path d="M12.13 21.59 17.71 16l-5.58-5.59a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0l6.36 6.36a.91.91 0 0 1 0 1.28L13.54 23a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41z"/></g></svg></button>
        </div>
    </div>`;