import {
    html,
    render
} from '//unpkg.com/lit-html?module';

export let adminPanel = () => 
    html`<section class="select-class-container">
            <select class="select-class">
                <option></option>
                <option>User</option>
                <option>Cinema</option>
                <option>Movies</option>
                <option>Promotions</option>
            </select>
            <button class="create-new-row" disabled>CREATE</button>
        </section>
        <section class="class-data-container">
        </section>`;

export let dataRowTemplate = (id, description) =>
html`<div class="data-row" data-id=${id}>
        <div class="data-ids">
            <div>${id}</div>
            <div>${description}</div>
        </div>
        
        <div class="data-btns">
            <button class="data-btn edit-row">EDIT</button>
            <button class="data-btn delete-row">DELETE</button>
        </div>
        
    </div>`;

export let createRowTemplate = (data, action) =>
    html `<form class="set-data">
        ${Object.entries(data).map(x => 
            html`<label for=${x[0]}>${x[0]}</label>
                 <input ?disabled=${(["sessionToken", "createdAt", "updatedAt", "ACL", "chosenSeats", "information", "programme"].includes(x[0]) ? true : false)} name=${x[0]} .value=${(action === "edit" || action === "delete") ? x[1] : ""} placeholder=${(action === "create") ? x[1] : ""}>`)}
        <button type="submit" class="confirm-action">${action.toUpperCase()}</button>
    </form>`;

