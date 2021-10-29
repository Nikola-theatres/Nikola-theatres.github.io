
import {render, html} from "../node_modules/lit-html/lit-html.js";
import {userApi, parseApi} from "./api.js";
import {moviesList} from "/views/movies-list.js";
import {cinemaBannersTemplate} from "/views/theatre.js";
import {sideBannerTemplate} from "/views/sideBanners.js";
import {loginFormTemplate} from "/views/login.js";
import {regTemplate} from "/views/register.js";
import {navTemplate} from "/views/navigation.js";
import {mobileNav} from "/views/mobile-nav.js";
import { moiveInformationTemplate } from "/views/movie-information.js";
import { footerTemplate } from "/views/footer.js";
import {aboutTemplate} from "/views/about.js";
import {contactsTemplate} from "/views/contacts.js";
import {bookMovieTemplate} from "/views/book.js";
import {setTicketTemplate} from "/views/set-ticket.js";
import {cinemaHallTemplate} from "/views/cinema-hall.js";
import {loginContainerTemplate} from "/views/login.js";
import {loaderTemplate} from "/views/loader.js";
import {sliderTemplate} from "/views/image-slider.js";
import {doubleSlider} from "/views/offers.js";
import { adminPanel, dataRowTemplate, createRowTemplate } from "/views/admin.js";

let mainContainer = document.getElementById("main-container");
window.addEventListener("resize", (e) => {
    if (window.innerWidth <= 940) {
        window.renderMobileNav();
    } else if (window.innerWidth > 940) {
        window.renderDesktopNav();
    }
});

export async function middleware(ctx, next) {
    ctx.render = render;
    document.body.classList.add("body-fit-vh");
    if (window.innerWidth <= 940) {
        renderMobileNav(ctx, next);
    } else if (window.innerWidth > 940) {
        renderDesktopNav(ctx, next);
    }
}
export async function setLoginPage(ctx) {
    ctx.closeWindow = close;
    ctx.toggle = toggle;
    ctx.render(loginContainerTemplate(ctx), mainContainer);
    let subContainer = document.querySelector(".sub-main-form-container");
    
    if (ctx.pathname.includes("login")) {
        ctx.submitHandler = login;
        ctx.render(loginFormTemplate(ctx), subContainer);
        document.querySelector(".form-login").classList.add("active-btn");
        document.querySelector(".form-register").classList.add("non-active-btn");
         document.querySelector(".form-login").classList.remove("non-active-btn");
         document.querySelector(".form-register").classList.remove("active-btn");
    } else if (ctx.pathname.includes("register")) {
        ctx.submitHandler = register;
        ctx.render(regTemplate(ctx), subContainer);
        document.querySelector(".form-login").classList.add("non-active-btn");
        document.querySelector(".form-register").classList.add("active-btn");
        document.querySelector(".form-login").classList.remove("active-btn");
        document.querySelector(".form-register").classList.remove("non-active-btn");
    }
    async function login(e) {
        e.preventDefault();
        let data = [...e.target.querySelectorAll("input")].map(x => x.value);
        [...e.target.querySelectorAll("input")].map(x => x.value = "");
        try {
            let response = await userApi.loginUser(data[0], data[1]);
            let username = response.attributes.username;
            localStorage.username = username;
            document.getElementById("log-submit").disabled = true;
            ctx.page.redirect("/movies");
        } catch (error) {
            let message = "Invalid username/password";
            e.target.querySelector("p").textContent = message;
            setTimeout(() => {
                e.target.querySelector("p").textContent = "";
            }, 3000);
        }
    }
    function close(e) {
        e.preventDefault();
        console.log("close");
        ctx.page.redirect("/movies");
    }
    async function register(e) {
        e.preventDefault();
        let data = [...e.target.querySelectorAll("input")].map(x => x.value);
        [...e.target.querySelectorAll("input")].map(x => x.value = "");
        try {
            let body = {
                username: data[0],
                password: data[1],
                email: data[3]
            };
            console.log(body);
            if (data[1] !== data[2]) {
                throw new Error("password and confirm password must be the same");
            }
            if (data[0] === "" || data[1] === "" || data[2] === "" || data[3] === "") {
                throw new Error("all fields must be filled");
            }
            if (!data[3].includes("@")) {
                throw new Error("email must be valid");
            }
            let response = await userApi.registerUser(body);
            document.getElementById("log-submit").setAttribute("disabled", true);
            ctx.page.redirect("/login");
            e.target.style.display = "none";
        } catch (error) {
            let message = error.message;
            e.target.querySelector("p").textContent = message;
            setTimeout(() => {
                e.target.querySelector("p").textContent = "";
            }, 3000);
        }
    }
    function toggle(e) {
        if (e.target.textContent.toLowerCase() ==="login") {
             document.querySelector(".form-login").classList.add("active-btn");
             document.querySelector(".form-register").classList.add("non-active-btn");
             document.querySelector(".form-login").classList.remove("non-active-btn");
             document.querySelector(".form-register").classList.remove("active-btn");
             ctx.page.redirect("/login")
        } else if (e.target.textContent.toLowerCase() === "register") {
            document.querySelector(".form-login").classList.add("non-active-btn");
            document.querySelector(".form-register").classList.add("active-btn");
            document.querySelector(".form-login").classList.remove("active-btn");
            document.querySelector(".form-register").classList.remove("non-active-btn");
            ctx.page.redirect("/register");
        }
    }
}
export async function setHomePage(ctx, next) {
        
        let slides = [{
            asset: "/assets/bond.jpg",
            href: "/movies"
        }, {
            asset: "/assets/newark.jpg",
            href: "/book"
        }, {
            asset: "/assets/cruella-slide.jpg",
            href: "/cinemas"
        }, {
            asset: "/assets/promo.jpg",
            href: "/offers"
        }, ];
        ctx.render(sliderTemplate(slides), mainContainer);
        setSliderImages(...getSliderDomElements("slides-container", "slider-image", "img-button", "slide-indicator"));
        document.querySelector(".slider-arrows-container").addEventListener("click", (e) => {
            if (e.target.classList.contains("slide-arrow--left")) {
                slide("left");
            }
            if (e.target.classList.contains("slide-arrow--right")) {
                slide("right");
            }
        });
}
export async function setMoviesPage(ctx, next) {
    ctx.render(loaderTemplate(), mainContainer);
    let movies =  (await parseApi.getObjectsByClassname("Movies")).sort((a, b) => new Date(b[1].information.releaseDate).getTime() - new Date(a[1].information.releaseDate).getTime());
    let content = moviesList(movies);
    ctx.render(content, mainContainer);
    next();
}
export async function setCinemasPage(ctx, next) {
    ctx.render(loaderTemplate(), mainContainer);
    let cinemas = await parseApi.getObjectsByClassname("Cinema");
    ctx.render(cinemaBannersTemplate(cinemas), mainContainer);
    next();
}
export async function getMovieInformation(ctx) {
    ctx.render(loaderTemplate(), mainContainer);
    let movieId = ctx.params.id;
    let movieData = await parseApi.getDataById("Movies", movieId);
    let movieInfo = movieData.information;
    ctx.render(moiveInformationTemplate(movieData, movieInfo, movieId), mainContainer);
}
export async function setBookPage(ctx, next) {
    ctx.render(loaderTemplate(), mainContainer);
    let [allCinemas, allMovies] = (await Promise.allSettled([parseApi.getObjectsByClassname("Cinema"), parseApi.getObjectsByClassname("Movies")])).map(x => x.value);
    let cinemaNames = allCinemas.map(x => x[1].description);
    cinemaNames.unshift("");
    cinemaNames = cinemaNames;
    let data;
    let id = "";
    if (ctx.params.hasOwnProperty("id") && ctx.pathname.includes("cinema")) {
        id = ctx.params.id;
        let cinemaObj = await parseApi.getDataById("Cinema",id);
        cinemaNames[0] = cinemaObj.description;
        cinemaNames.push("");
        cinemaNames = [...new Set(cinemaNames)];
        data = new Data(allMovies, cinemaNames, id, setWeek(), allCinemas, cinemaObj);
        data.todayDate = new Date().toDateString().split(" ").slice(1).join(" ");
        ctx.render(bookMovieTemplate(data), mainContainer);
        setDateButtons();
    } else {
        data = new Data(allMovies, cinemaNames, id, setWeek(), allCinemas);
        data.todayDate = new Date().toDateString().split(" ").slice(1).join(" ");
        ctx.render(bookMovieTemplate(data), mainContainer);
        setDateButtons();
    }
    function setWeek() {
            let week = [{"thu": ""}, {"fri": ""}, {"sat": ""}, {"sun": ""}, {"mon": ""}, {"tue": ""}, {"wed": ""}, ];
            const today = new Date();
            let datestring = today.toDateString().split(" ");
            const dayOfWeek = datestring[0].toLowerCase();
            const currentDateString = datestring.slice(1).join(" ");
            week.filter(x => x.hasOwnProperty(dayOfWeek))[0][dayOfWeek] = currentDateString;
            let todayIdx = week.indexOf(week.filter(x => x.hasOwnProperty(dayOfWeek))[0]);
            
            return week.reduce((acc,x,i) => {
                let tomorrow = new Date();
                tomorrow.setDate(today.getDate() + i - todayIdx);
                let datestring = tomorrow.toDateString().split(" ");
                const day = datestring[0].toLowerCase().trim();
                const daterest = datestring.slice(1).join(" ").trim();
                acc[day] = daterest;
                return acc;
            }, {});
    }
    function setDateButtons() {
         const today = new Date();
         let datestring = today.toDateString().split(" ");
         let dateParagraph = datestring.slice(1).join(" ");
         if (document.getElementById("movie-projection-date") !== null) {
        document.getElementById("movie-projection-date").textContent = dateParagraph;
        }
         const dayOfWeek = datestring[0].toLowerCase();
         let todayBtn = [...document.getElementsByClassName("week-day")].filter(x => x.textContent.toLowerCase() === dayOfWeek);
         return todayBtn[0].classList.add("selected-day");
    }
    document.getElementById("select-cinema-name").addEventListener("change", function changeHandler(e) {
        let cinemaName = e.target.options[e.target.selectedIndex].text;
        let chosenCinema = data.getCinemaDataByName(cinemaName);
        data.chosenCinema = chosenCinema; 
        console.log(data);
        ctx.render(bookMovieTemplate(data), mainContainer);
    });
    document.getElementById("date-picker").addEventListener("click", function handleDatePicker(e) {
        if (e.target.classList.contains("week-day")) {
            let btn = e.target;
            let date = e.target.dataset["date"];
            let allButtons = [...document.getElementsByClassName("selected-day")].map(x => x.classList.remove("selected-day"));
            btn.classList.add("selected-day");
            [...document.getElementsByClassName("week-day")].map(x => x.classList.add("projection-btn"));
            document.getElementById("movie-projection-date").textContent = date;
            ctx.render(bookMovieTemplate(data), mainContainer);
        }
    });
    if (document.querySelector("section") !== null && document.querySelector("section") !== undefined) {
         document.querySelector("section").addEventListener("click", function handleProjectionButtons(e) {
        if (e.target.classList.contains("click-projection")) {
            let date = document.getElementById("movie-projection-date").textContent;
            let hour = e.target.textContent;
            let selectMenu = document.querySelector("select");
            let theatreName = selectMenu.options[selectMenu.selectedIndex].text;
            let movieName = e.target.id;
            let ticketInfo = {date: date, hour: hour, theatre: theatreName, movie: movieName};
            ctx.ticket = ticketInfo;
            ctx.data = data;
            next();
        }
    });
    }
   

}
export function setTicket(ctx, next) {
    ctx.render(loaderTemplate(), mainContainer);
    let movie = ctx.data.movies.map(x => x[1]).filter(x => x.title === ctx.ticket.movie)[0];
    ctx.render(setTicketTemplate(ctx.ticket, ctx.data, movie), mainContainer);

    let children = 0;
    let adults = 0;
    let ticketsPrice = 0;
    document.getElementById("select-adults").addEventListener("change", (e) => {
        let selectedValue = e.target.options[e.target.selectedIndex].text;
        document.getElementById("h3-adults").textContent = "adults: " + selectedValue;;
        adults = Number(selectedValue) * 12;
        ticketsPrice = children + adults;
        document.getElementById("h3-price").textContent = `total tickets price: ${ticketsPrice.toFixed(2)} BGN`;
    });
    document.getElementById("select-children").addEventListener("change", (e) => {
        let selectedValue = e.target.options[e.target.selectedIndex].text;
        document.getElementById("h3-children").textContent = "children: " + selectedValue;
        children = Number(selectedValue) * 9;
        ticketsPrice = children + adults;
        document.getElementById("h3-price").textContent = `total tickets price: ${ticketsPrice.toFixed(2)} BGN`;
    });
    document.getElementById("choose-seats-btn").addEventListener("click", (e) => {
        if (document.getElementById("h3-price").textContent !== "total tickets price: 0.00 BGN") {
            ctx.ticket.children = (document.getElementById("h3-children").textContent).split(" ")[1] || 0;
            ctx.ticket.adults = (document.getElementById("h3-adults").textContent).split(" ")[1] || 0;
            ctx.ticket.totalPrice = (document.getElementById("h3-price").textContent).split(" ")[3];
            next();
        }
    });
}
export async function chooseSeats(ctx, next) {
    ctx.render(loaderTemplate(), mainContainer);
    let soldSeats = "";
    try {
        let previouslyTakenSeats = await parseApi.getDataById("Cinema", ctx.data.id);
        if (previouslyTakenSeats.chosenSeats !== undefined) {
            soldSeats = previouslyTakenSeats.chosenSeats.split(", ");
        }
    } catch (error) {
        throw new Error("no seats to display");
    }
    ctx.ticket.seats = [];
    ctx.render(cinemaHallTemplate(ctx.ticket), mainContainer);
    createCinemaHallTable(12, 20, soldSeats);
    document.querySelector(".scheme-table").addEventListener("click", selectSeat);
    document.querySelector(".confirm-btn").addEventListener("click", confirmSelection);

    function selectSeat(e) {
        let seatsCount = Number(ctx.ticket.children) + Number(ctx.ticket.adults);
        if (e.target.classList.contains("scheme-td") && !e.target.classList.contains("sold-seat") && !e.target.classList.contains("chosen-seat")) {
            if (ctx.ticket.seats.length < seatsCount) {
                e.target.classList.add("chosen-seat");
                ctx.ticket.seats.push(e.target.id);
            } else {
                e.target.classList.add("chosen-seat");
                document.getElementById(`${ctx.ticket.seats[0]}`).classList.remove("chosen-seat");
                ctx.ticket.seats.shift();
                ctx.ticket.seats.push(e.target.id);
            }
        }
        ctx.render(cinemaHallTemplate(ctx.ticket), mainContainer);
    }
    async function confirmSelection(e) {
        if (Number(ctx.ticket.seats.length) === (Number(ctx.ticket.adults) + Number(ctx.ticket.children))) {
            let seats = ctx.ticket.seats.join(", ");
            let previouslyTakenSeats;
            try {
                previouslyTakenSeats = (await parseApi.getDataById("Cinema", ctx.data.id));
            } catch (error) {
                throw new Error("no seats to display");
            }
            if (previouslyTakenSeats.chosenSeats !== undefined) {
                let aggregatedSeats = previouslyTakenSeats.chosenSeats + ", " + seats;
                try {
                    parseApi.put("Cinema", ctx.data.id, {
                        chosenSeats: aggregatedSeats
                    });
                } catch (error) {
                    throw new Error("Failed to update chosenSeats");
                }
            } else {
                try {
                    parseApi.put("Cinema", ctx.data.id, {
                        chosenSeats: seats
                    });
                } catch (error) {
                    throw new Error("Failed to update chosenSeats");
                }

            }
            document.querySelector(".confirmation-message").style.display = "flex";
            document.getElementById("confirm-message").textContent = `Your booking is completed!`;
            document.querySelector(".confirm-btn").disabled = true;
            setTimeout(() => {
                document.querySelector(".confirmation-message").style.display = "none";
                ctx.page.redirect("/");
            }, 3000);
        } else {
            document.querySelector(".confirmation-message").style.display = "flex";
            document.getElementById("confirm-message").textContent = `You must select ${(Number(ctx.ticket.adults) + Number(ctx.ticket.children))} seats to be able to confirm your booking!`;
            setTimeout(() => {
                document.querySelector(".confirmation-message").style.display = "none";
            }, 3000);

        }

    }
}
export function setAboutUsPage(ctx) {
    ctx.render(aboutTemplate(), mainContainer);
}
export async function setContactsPage(ctx) {
    ctx.render(loaderTemplate(), mainContainer);
    let cinemas = await parseApi.getObjectsByClassname("Cinema");
    console.log(cinemas);
    ctx.render(contactsTemplate(cinemas), mainContainer);
}
export async function setOffersPage(ctx) {
      ctx.render(loaderTemplate(), mainContainer);
      let slides = await parseApi.getObjectsByClassname("Promotions");
      ctx.render(doubleSlider(slides.map(x => x[1])), mainContainer);
      setSliderImages(...getSliderDomElements("slides-offers-container", "slider-image-offers", "", "slide-indicator"), "bottom");
      setSliderImages(...getSliderDomElements("second-slide-container", "second-slide-divs", "", "slide-indicator"), "top");

      document.querySelector(".slider-arrows-container-offers").addEventListener("click", arrowsClickHandler);
      
      function arrowsClickHandler(e) {
          if (e.target.classList.contains("slide-arrow--up")) {
              doubleSlideDirection("up");
          }
          if (e.target.classList.contains("slide-arrow--down")) {
              doubleSlideDirection("down");
          }
      }
}
export async function setAdminPanel(ctx, next) {
    ctx.render(adminPanel(), mainContainer);
    document.querySelector(".select-class").addEventListener("change", getSelectedData);

    async function getSelectedData(e) {

        let className = (e.target.options)[e.target.selectedIndex].textContent;
        ctx.render(loaderTemplate(), document.querySelector(".class-data-container"));
        if (className !== "" && className !== null && className !== undefined) {
            try {
                
                let response = await parseApi.getObjectsByClassname(className);
                let description = "";
                if (document.querySelector(".create-new-row") !== null) {
                    document.querySelector(".create-new-row").disabled = false;
                    if (response[1][1].hasOwnProperty("title")) {
                        description = "title";
                    }
                    if (response[1][1].hasOwnProperty("description")) {
                        description = "description";
                    }
                    if (response[1][1].hasOwnProperty("username")) {
                        description = "username";
                    }
                    if (response[1][1].hasOwnProperty("header")) {
                        description = "header";
                    }
                }
                ctx.render(html `${response.map(x => dataRowTemplate(x[0], x[1][description]))}`, document.querySelector(".class-data-container"));

                document.querySelector(".select-class-container").addEventListener("click", (e) => {
                    if (e.target.classList.contains("create-new-row")) {
                        ctx.className = className;
                        ctx.page.redirect(`/admin/${className}/create`);
                        next();
                    }
                })
                document.querySelector(".class-data-container").addEventListener("click", (e) => {
                    if (e.target.classList.contains("edit-row")) {
                        let id = e.target.parentNode.parentNode.dataset.id;
                        ctx.page.redirect(`/admin/${className}/${id}/edit`);
                        next();
                    }
                    if (e.target.classList.contains("delete-row")) {
                        let id = e.target.parentNode.parentNode.dataset.id;
                        ctx.page.redirect(`/admin/${className}/${id}/delete`);
                        next();
                    }
                }, {
                    once: true
                });
            } catch (e) {
                alert("Failed to fetch Data by given Classname")
                throw new Error("Failed to fetch Data by given Classname");
            }
        } else {
            ctx.render(html`<p class="admin-message">Welcome, Dani. Please select class!!!</p>`, document.querySelector(".class-data-container"));
            if (document.querySelector(".create-new-row") !== null) {
                document.querySelector(".create-new-row").disabled = true;
            }
        }
    }
}
export async function adminEdit(ctx,next) {
    ctx.render(loaderTemplate(), mainContainer);
    let action = ctx.path.split("/").pop();
    try {
        let data = await parseApi.getDataById(ctx.params.className, ctx.params.id);
        ctx.render(createRowTemplate(data, action), mainContainer);
    } catch(e) {
        throw new Error("Couldn't get data by provided id and classname");
    }
    document.querySelector("form").addEventListener("submit", adminSubmitHandler);
}
export async function adminDelete(ctx, next) {
     ctx.render(loaderTemplate(), mainContainer);
     let action = ctx.path.split("/").pop();
     try {
         let data = await parseApi.getDataById(ctx.params.className, ctx.params.id);
         ctx.render(createRowTemplate(data, action), mainContainer);
     } catch (e) {
         throw new Error(e);
     }
     document.querySelector("form").addEventListener("submit", adminSubmitHandler);
}
export async function adminCreate(ctx, next) {
    ctx.render(loaderTemplate(), mainContainer);
    let action = ctx.path.split("/").pop();
    try {
        let data = await parseApi.getObjectsByClassname(ctx.params.classname);
        ctx.render(createRowTemplate(data[0][1], action), mainContainer);
    } catch (e) {
        throw new Error(e);
    }
    document.querySelector("form").addEventListener("submit", adminSubmitHandler);
}


async function adminSubmitHandler(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let entries = [...data.entries()].reduce((acc,x,i) => {
        acc[x[0]] = x[1];
        return acc;
    }, {});
    let userInput = [...data.values()];
    let userInputIsValid = isValid(userInput);
    let button = e.target.querySelector(".confirm-action");
    if (userInputIsValid) {
        if (button.textContent.toLowerCase() === "create") {
           let params = window.location.pathname.split("/").slice(2,3);
           try {
               if (localStorage._id !== "fUHveMK5xc") {
                   throw new Error();
               }
                await parseApi.post(params[0], entries);
                alert("You successfully created new object in the database!");
                button.disabled = true;
           } catch (e){
                alert("Couldn't create the new row! You are not authorized!");

           }
           
        }
        if (button.textContent.toLowerCase() === "edit") {
            let params = window.location.pathname.split("/").slice(2,4);
           
            try {
                if (localStorage._id !== "fUHveMK5xc") {
                    throw new Error("Unauthorized!");
                }
                await parseApi.put(params[0], params[1], entries);
                alert("You successfully EDITED the current object in the database!");
                button.disabled = true;
            } catch (e) {
                alert("Couldn't EDIT row! You are not authorized to do this operation!");

            }
        }
        if (button.textContent.toLowerCase() === "delete") {
            let params = window.location.pathname.split("/").slice(2,4);
             try {
                 if (localStorage._id !== "fUHveMK5xc") {
                     throw new Error();
                 }
                 await parseApi.del(...params);
                 alert("You successfully DELETED the current object from the database!");
                 button.disabled = true;
             } catch (e) {
                 alert("Couldn't DELETE row! You are not authorized!")
                 throw new Error("Couldn't DELETE row! You are not authorized!");
             }
        }
    } else {
        alert("All fields must contain valid database structure and should NOT be emtpy!");
        throw new Error("Please check all input fields!");
    }
    function isValid(input) {
        if (input.includes("") || input.includes(null) || input.includes(undefined)) {
            return false;
        } else {
            return true;
        }
    }
}

function getSliderDomElements(containerClass, imagesClass, buttonsClass = "", indicatorsClass = "") {
    let buttons = [];
    let slidesContainer = document.querySelector("." + containerClass);
    let images = [...document.querySelectorAll("." + imagesClass)];
    if (buttonsClass !== "") {
        buttons = [...document.querySelectorAll("." + buttonsClass)];
    }
    let indicators = [...document.querySelectorAll("." + indicatorsClass)];
    return [slidesContainer, images, buttons, indicators];
}
function setSliderImages(container, images, imgbtns = [], indicators = [], direction="left") {
    let colors = ["#FF7043", "#3D5AFE", "#FFD600", "#26C6DA", "#9575CD", "#64B5F6", ];
    let slidesContainerProps = container.getBoundingClientRect();
    console.log(slidesContainerProps);
    images.map((x, i) => {
        x.style.width = Math.floor(slidesContainerProps.width) + "px";
        x.style.height = slidesContainerProps.height + "px";
        if (direction === "left" || direction === "right") {
            x.style[direction] = (i * slidesContainerProps.width) + "px";
        } else if (direction === "bottom" || direction === "top") {
            x.style[direction] = (i * (slidesContainerProps.height)) + "px";
        }
        
         if (x.classList.contains("current-image")) {
             x.classList.remove("current-image");
         }
         if (x.classList.contains("current-div")) {
             x.classList.remove("current-div"); 
         }
         if (x.classList.contains("second-slide-divs")) {
             x.style.backgroundColor = colors[i];
         }
    });
    if (images[0].classList.contains("slider-image-offers") || images[0].classList.contains("slider-image")) {
        images[0].classList.add("current-image");
    } else if (images[0].classList.contains("second-slide-divs")) {
        images[0].classList.add("current-div");
    }
    
    if (imgbtns.length > 0) {
        imgbtns.map((x, i) => {
            x.style[direction] = (i * slidesContainerProps.width + 50) + "px";
            if (x.classList.contains("current-btn")) {
                x.classList.remove("current-btn");
            }
        });
        imgbtns[0].classList.add("current-btn");
    }
    
    indicators.map(x => {
        if (x.classList.contains("current-indicator")) {
            x.classList.remove("current-indicator");
        }
    });
    indicators[0].classList.add("current-indicator");
}
function slide(direction) {
    let currentImage = document.querySelector(".current-image");
    let currentButton = document.querySelector(".current-btn");
    let images = [...document.querySelectorAll(".slider-image")];
    let index = images.indexOf(currentImage);
    let buttons;
    let btnIndex;
    if (document.querySelector(".img-button") !== null) {
        buttons = [...document.querySelectorAll(".img-button")];
        btnIndex = buttons.indexOf(currentButton);
    }
    let indicators = [...document.querySelectorAll(".slide-indicator")];
    console.log(index, btnIndex);
    if (index >= 0 && index < images.length - 1 && direction === "right") {
        if (index+1 < images.length) {
            images[index].classList.remove("current-image");
            images[index + 1].classList.add("current-image");
            indicators[index].classList.remove("current-indicator");
            indicators[index + 1].classList.add("current-indicator");
        }
        if (document.querySelector(".img-button") !== null) {
            if (btnIndex + 1 < images.length) {
                buttons[btnIndex].classList.remove("current-btn");
                buttons[btnIndex + 1].classList.add("current-btn");
            }
        }
        let slidesContainerProps = document.querySelector(".slides-container").getBoundingClientRect();
        images.map((x) => {
            x.style.left = (Number((x.style.left.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) - slidesContainerProps.width) + "px";
        });
        if (document.querySelector(".img-button") !== null) {
            buttons.map((x) => {
                x.style.left = (Number((x.style.left.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) - slidesContainerProps.width) + "px";
            });
        }
    } else if (index < images.length && index > 0 && direction === "left") {
        images[index].classList.remove("current-image");
        images[index - 1].classList.add("current-image");
        if (document.querySelector(".img-button") !== null) {
            buttons[btnIndex].classList.remove("current-btn");
            buttons[btnIndex - 1].classList.add("current-btn");
        }
        indicators[index].classList.remove("current-indicator");
        indicators[index - 1].classList.add("current-indicator");
        let slidesContainerProps = document.querySelector(".slides-container").getBoundingClientRect();
        images.map((x) => {
            x.style.left = (Number((x.style.left.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) + slidesContainerProps.width) + "px";
        });
        if (document.querySelector(".img-button") !== null) {
            buttons.map((x) => {
                x.style.left = (Number((x.style.left.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) + slidesContainerProps.width) + "px";
            });
        }
    }

}
function doubleSlideDirection(direction) {
    let currentImage = document.querySelector(".current-image");
    let currentDiv = document.querySelector(".current-div");

    let images = [...document.querySelectorAll(".slider-image-offers")];
    let divs = [...document.querySelectorAll(".second-slide-divs")];
    let indicators = [...document.querySelectorAll(".slide-indicator")];

    let index = images.indexOf(currentImage);
    let secondIndex = divs.indexOf(currentDiv);

    if (index >= 0 && index < images.length - 1 && direction === "up") {
        if (index + 1 < images.length) {
            images[index].classList.remove("current-image");
            images[index + 1].classList.add("current-image");
            divs[secondIndex].classList.remove("current-div");
            divs[secondIndex + 1].classList.add("current-div");
            indicators[index].classList.remove("current-indicator");
            indicators[index + 1].classList.add("current-indicator");
        }
        let imagesContainer = document.querySelector(".slides-offers-container").getBoundingClientRect();
         let divsContainer = document.querySelector(".second-slide-container").getBoundingClientRect();
        images.map((x) => {
            x.style.bottom = (Number((x.style.bottom.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) - imagesContainer.height) + "px";
        });
        divs.map((x) => {
            x.style.top = (Number((x.style.top.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) - divsContainer.height) + "px";
        });
    } else if (index < images.length && index > 0 && direction === "down") {
        images[index].classList.remove("current-image");
        images[index - 1].classList.add("current-image");
        divs[secondIndex].classList.remove("current-div");
        divs[secondIndex - 1].classList.add("current-div");
        indicators[index].classList.remove("current-indicator");
        indicators[index - 1].classList.add("current-indicator");
        let imagesContainer = document.querySelector(".slides-offers-container").getBoundingClientRect();
        let divsContainer = document.querySelector(".second-slide-container").getBoundingClientRect();
        images.map((x) => {
            x.style.bottom = (Number((x.style.bottom.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) + imagesContainer.height) + "px";
        });
         divs.map((x) => {
             x.style.top = (Number((x.style.top.match(/-{0,1}\d{1,}\.{0,1}\d{0,}/g))[0]) + divsContainer.height) + "px";
         });
    }
}
function createCinemaHallTable(rows, columns, soldSeats) {
        let seatsTable = document.querySelector(".scheme-table");
        seatsTable.setAttribute("cellspacing", "5px");
        for (let row = 1; row < rows+1; row++) {
            let tr = document.createElement("tr");
            tr.id = row.toString();
            tr.classList.add("scheme-tr");
            seatsTable.appendChild(tr);
            for (let column = 0; column < columns+1; column++) {
                let td = document.createElement("td");
                td.id = `${row}-${column}`;
                td.classList.add("scheme-td");
                if (column === 0) {
                    td.textContent = row;
                    td.classList.add("row-number");
                    td.classList.remove("scheme-td");
                } else {
                    td.textContent = column;
                }
                tr.appendChild(td);
                if (row < 9 && column <= 2 && column > 0) {
                    td.classList.add("invisible");
                    td.classList.remove("scheme-td");
                    td.disabled = true;
                }
                if (row < 9 && column <= 20 && column > 18) {
                    td.classList.add("invisible");
                    td.classList.remove("scheme-td");
                    td.disabled = true;
                    td.textContent = "";
                }
            }
        }
        if (soldSeats !== undefined && soldSeats !== null && soldSeats !== "") {
            soldSeats.map(x => {
                document.getElementById(x.trim()).classList.add("sold-seat");
                document.getElementById(x.trim()).disabled = true;
            });
        } else {
            console.log("the hall is empty, go on");
        }
}


window.renderMobileNav = renderMobileNav;
function renderMobileNav(ctx, next) {
    render(mobileNav(), document.querySelector("header"));
    document.querySelector(".mobile-nav").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        document.querySelector(".menu-nav-icon").classList.toggle("hide-icon");
        document.querySelector(".x-icon-nav").classList.toggle("hide-icon");
        document.querySelector(".mobile-nav").classList.toggle("active-nav");
        let subElements = [...document.querySelectorAll(".nav-row")];
        subElements.map(x => x.classList.toggle("active-rows"));
    });
    if (document.querySelector(".logout") !== null) {
        document.querySelector(".logout").addEventListener("click", (e) => {
            localStorage.removeItem("_id");
            localStorage.removeItem("username");
            if (ctx) {
                ctx.page.redirect("/");
            }
        });
    };
    if (ctx && next) {
        next(ctx);
    }
    
};
window.renderDesktopNav = renderDesktopNav;
function renderDesktopNav(ctx, next) {
    render(navTemplate(), document.querySelector("header"));
    let leftBannerContainer = document.querySelector(".leftBanner");
    let rightBannerContainer = document.querySelector(".rightBanner");
    render(sideBannerTemplate("/assets/yellowBanner.jpg", "left"), leftBannerContainer);
    render(sideBannerTemplate("/assets/purpleBanner.jpg", "right"), rightBannerContainer);
    render(footerTemplate(), document.querySelector("#footer-container"));
    if (document.querySelector(".logout") !== null) {
        document.querySelector(".logout").addEventListener("click", (e) => {
            localStorage.removeItem("_id");
            localStorage.removeItem("username");
            if (ctx) {
                ctx.page.redirect("/");
            }
        });
    }
    if (ctx && next) {
        next(ctx);
    }
    
};


function Data(movies, cinemas, id, dates, allCinemas, cinemaObj = {}) {
    this.movies = movies;
    this.cinemaNames = cinemas;
    this.id = id;
    this.dates = dates;
    this.cinemaData = allCinemas;
    this.chosenCinema = cinemaObj;
}
Data.prototype.getProgramme = function () {
    if (this.chosenCinema) {
        return this.chosenCinema.programme;
    } else {
        return [];
    }
};
Data.prototype.getCinemaDataByName = function (name) {
    let chosenCinemaOption = (Object.values((this.cinemaData))).filter(x => x[1].description === name)[0];
    if (chosenCinemaOption) {
        this.id = chosenCinemaOption[0];
        return chosenCinemaOption[1];
    } else {
        return {};
    }
};
Data.prototype.getProjectionsByMovieName = function (movieName) {
    let programme = this.getProgramme();
    let projections = Object.values(programme).reduce((acc, x) => {
        acc.push(x.projections);
        return acc;
    }, []).reduce((acc, x) => {
        for (let obj of x) {
            let arrOfData = (Object.entries(obj));
            let y = arrOfData[0];
            if (!acc.hasOwnProperty(y[0])) {
                acc[y[0]] = [];
                acc[y[0]].push(y[1]);

            } else {
                acc[y[0]].push(y[1]);
            }
        }
        return acc;
    }, {});
    if (projections[movieName]) {
        return projections[movieName].sort((a, b) =>
            Number(a.replace(":", "")) - Number(b.replace(":", ""))
        );
    } else {
        throw new Error("Movie name doesn't exist");
    }
};
Data.prototype.compareDates = function (movieStart) {
    let currentDate = new Date();
    currentDate = currentDate.getTime();
    let date;
    if (document.getElementById("movie-projection-date") !== null) {
        date = document.getElementById("movie-projection-date").textContent;
    } else {
        date = new Date().toDateString().split(" ").slice(1);
    }
    let movieStartInMs = new Date(`${date} ${movieStart}`);
    movieStartInMs = movieStartInMs.getTime();
    if (currentDate < movieStartInMs) {
        return true;
    } else {
        return false;
    }
};

