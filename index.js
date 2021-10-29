import page from '//unpkg.com/page/page.mjs';
import {middleware, setMoviesPage, setLoginPage, getMovieInformation, setCinemasPage, setBookPage, setTicket, chooseSeats, setAboutUsPage, setContactsPage, setHomePage, setOffersPage, setAdminPanel, adminEdit, adminDelete, adminCreate} from "/src/app.js";

page("/", middleware, setHomePage);
page("/movies", middleware, setMoviesPage);
page("/movies/:id", middleware, getMovieInformation);
page("/cinemas", middleware, setCinemasPage);
page("/book", middleware, setBookPage, setTicket, chooseSeats);
page("/cinemas/:id/book", middleware, setBookPage, setTicket, chooseSeats);
page("/movies/:id/book", middleware, setBookPage, setTicket, chooseSeats);
page("/login", middleware, setLoginPage);
page("/register", middleware, setLoginPage);
page("/contacts", middleware, setContactsPage);
page("/about", middleware, setAboutUsPage);
page("/offers", middleware, setOffersPage);
page("/admin", middleware, setAdminPanel);
page("/admin/:className/:id/edit", middleware, adminEdit);
page("/admin/:className/:id/delete", middleware, adminDelete);
page("/admin/:classname/create", middleware, adminCreate);
page.start();

