import {
    html,
    render
} from '//unpkg.com/lit-html?module';

export let cinemaHallTemplate = (ticket) => 
html`<div class="cinema-hall-wrapper">
        <div class="confirmation-message">
            <div id="confirm-message"></div>
        </div>
        <h3>CHOOSE YOU SEATS</h3>
        <div class="legend">
            <div class="free-seats">free seats</div>
            <div class="sold-seats">sold seats</div>
            <div class="your-seats">your seats</div>
        </div>
        <div class="scheme">
            <table class="scheme-table">

            </table>
        </div>
        <div class="ticket-information-container">
            <div class="ticket-info">
                <p>
                    <span>theatre</span><br>
                    ${ticket.theatre}<br>
                    <span>date</span><br>
                    ${ticket.date}<br>
                    <span>projection start</span><br>
                    ${ticket.hour}<br>
                    <span>movie</span><br>
                    ${ticket.movie}<br>
                    <span>adults</span><br>
                    ${ticket.adults}<br>
                    <span>children</span><br>
                    ${ticket.children}<br>
                    <span>selected seats</span><br>
                    ${ticket.seats.join(" ")}<br>
                    <span>total price</span><br>
                    ${ticket.totalPrice}<br>
                </p>
            </div>
            <div class="btn-container">
                <button class="confirm-btn">confirm</button>
            </div>
        </div> 
    </div>`;

