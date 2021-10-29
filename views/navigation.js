import { html } from "../node_modules/lit-html/lit-html.js";
export let navTemplate = () =>
    html `<nav class="navbar">
    <div id="logo">
        <h3>Nikola Theatres</h3>
    </div>
    <div id="list">
        <div ><a href="/" class="ulist">Home</a></div>
        <div ><a href="/movies" class="ulist">Movies</a></div>
        <div ><a href="/book" class="ulist">Book</a></div>
        <div ><a href="/cinemas" class="ulist">Cinemas</a></div>
        <div ><a href="/offers" class="ulist">Offers</a></div>
        ${(localStorage._id === "fUHveMK5xc") ? html`<div><a href="/admin" class="ulist">Admin</a></div>` : ""}
    </div>
    <div id="sign">
        <a class="loginBtn"  style="display: ${(localStorage._id ? "none" : "inline-block")}" href="/login"><button class="ulist">Login</button></a>
        <a class="loginBtn" style="display: ${(localStorage._id ? "none" : "inline-block")}" href="/register"><button class="ulist">Register</button></a>
        <button class="loginBtn ulist" style="display: ${(localStorage._id ? "inline-block" : "none")}" >Welcome ${localStorage.username}</button>
        <a  class="loginBtn" style="display: ${(localStorage._id ? "inline-block" : "none")}" href="/"><button class="ulist logout">Logout</button></a>
    </div>
</nav>`;


