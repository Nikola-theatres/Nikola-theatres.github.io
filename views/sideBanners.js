import {
    html,
    render
} from '//unpkg.com/lit-html?module';

export let sideBannerTemplate = (url, position="left") =>
    html `<img class="sideAds" id="side${position[0].toUpperCase() + position.substring(1)}" src=${url}>`;
