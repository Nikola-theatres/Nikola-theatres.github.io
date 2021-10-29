import {
    html,
    render
} from '//unpkg.com/lit-html?module';
export let contactsTemplate = (cinemas) =>
   html `<div class="contacts-container">
        <div class="img-contacts">
            <img id="contacts-us-img" src="/assets/contacts.jpg" alt="contacts-us-image">
            <h2>Contacts:</h2>
            <p>email: info@nikola-cinemas.com</p>
            ${cinemas.map(x => cinemaInfoTemplate(x))}
        </div>
    </div>`;

    let cinemaInfoTemplate = (cinema) => 
    html`<div class="location">
            <p>cinema: ${cinema[1].description}</p>
            <p>location: ${cinema[1].city}</p>
            <p>address: ${cinema[1].address}</p>
        <div>`;