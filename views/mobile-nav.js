import {
    html,
    render
} from '//unpkg.com/lit-html?module';
export let mobileNav = () =>
    html `<nav class="mobile-nav">
            <div class="icon">
               <button class="menu-icon-container"><svg class="menu-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><path d="M3 12h18M3 6h18M3 18h18"/></svg></button>
               
               <button class="x-icon-container"><svg class="x-icon-nav hide-icon" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
               
            </div>
            <a class="nav-row" href="/" >Home</a>
            <a class="nav-row" href="/movies" >Movies</a>
            <a class="nav-row" href="/book" >Book</a></a>
            <a class="nav-row" href="/cinemas" >Cinemas</a>
            <a class="nav-row" href="/offers" >Offers</a>
            <a class="nav-row" href="/contacts" >Contacts</a>
            <a class="nav-row" href="/about" >About us</a>
            <a class="nav-row" style="display: ${(localStorage._id ? "none" : "inline-block")}" href="/login">Login</a>
            <a class="nav-row" style="display: ${(localStorage._id ? "none" : "inline-block")}" href="/register">Register</a>
            <a class="nav-row" style="display: ${(localStorage._id ? "inline-block" : "none")}" >Welcome ${localStorage.username}</a>
            <a class="nav-row logout" style="display: ${(localStorage._id ? "inline-block" : "none")}" href="/">Logout</a>
    </nav>`;
