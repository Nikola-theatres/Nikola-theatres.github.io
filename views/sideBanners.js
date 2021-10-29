import { html } from "../node_modules/lit-html/lit-html.js";

export let sideBannerTemplate = (url, position="left") =>
    html `<img class="sideAds" id="side${position[0].toUpperCase() + position.substring(1)}" src=${url}>`;
