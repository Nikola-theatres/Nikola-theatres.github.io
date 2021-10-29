import { html } from "../node_modules/lit-html/lit-html.js";

export let moiveInformationTemplate = (movie, info, movieId) => 
    html`
<main id="sub-main">
    <div class="information-wrapper">
        <div id="movieTitle">${movie.title}</div>
        <section id="information">
            <div id="svgs">
                <div id="premiereDate">
                    <div id="svgDate">
                        <img class="dateSvg" src="../assets/premiere.svg">
                    </div>
                    <div id="pPremDate">
                        <strong>PREMIERE DATE</strong>
                    </div>
                    <div id="dateText">${info.releaseDate}</div>
                </div>
                <div id="durationInformation">
                    <div id="durationSVG">
                        <img class="durationSVG" src="../assets/clock.svg">
                    </div>
                    <div id="durationOfMovie">
                        <strong>DURATION</strong>
                    </div>
                    <div id="durHours">${info.duration}</div>
                </div>
            </div>
            <p id="innerPar">${info.generalInfo}</p>
            <table id="infoTable">
                <tr class="Title trInfo">
                    <td class="tdConst"><strong>Title</strong></td>
                    <td class="Title2 tdInfo">${movie.title}</td>
                </tr>
                <tr class="Cast trInfo">
                    <td class="tdConst"><strong>Cast</strong></td>
                    <td class="Cast2 tdInfo">${info.cast}</td>
                </tr>
                <tr class="Director trInfo">
                    <td class="tdConst"><strong>Director</strong></td>
                    <td class="Director2 tdInfo">${info.director}</td>
                </tr>
                <tr class="Genre trInfo">
                    <td class="tdConst"><strong>Genre</strong></td>
                    <td class="Genre2 tdInfo">${info.genre}</td>
                </tr>
            </table>
        </section>
        <img id="originalBanner" src=${movie.banner}>
        <a href="/movies/${movieId}/book" class="book-tickets"><button >BOOK TICKETS</button></a>
        
    </div>
</main>`;