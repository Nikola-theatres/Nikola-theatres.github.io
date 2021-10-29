import {
    html,
    render
} from '//unpkg.com/lit-html?module';

export let setTicketTemplate = (ticketInfo, data, movie) => 
html `<div class="ticket-main-container">
    <div class="ticket-banner-container">
        <img src=${movie.banner}>
    </div>
    <div class="previous-selections">
        <article>
            <h3>cinema: ${ticketInfo.theatre}</h3>
            <h3>movie: ${ticketInfo.movie}</h3>
            <h3>date: ${ticketInfo.date}</h3>
            <h3>projection start: ${ticketInfo.hour}</h3>
            <h3 id="h3-children">children: </h3>
            <h3 id="h3-adults">adults: </h3>
            <h3 id="h3-price">total tickets price: 0.00 BGN</h3>
        </article>
    </div>
    <div class="ticket-select-menus">
        <label for="select-adults">adults</label>
        <select id="select-adults" name="select-adults" class="select-menu">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
        </select>
        <label for="select-children">children</label>
        <select id="select-children" name="select-children" class="select-menu">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
        </select>
        <button class="projection-btn" id="choose-seats-btn">CHOOSE SEATS</button>
    </div>
</div>`;

