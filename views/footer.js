import {
    html,
    render
} from '//unpkg.com/lit-html?module';
export let footerTemplate = () =>
    html `<div class="footer-sub">
        <div ><a href="/contacts" class="ulist">Contacts</a></div>
        <div ><a href="/about" class="ulist">About us</a></div>
    </div>`;