import {
    html,
    render
} from '//unpkg.com/lit-html?module';

export let regTemplate = (context) => 
html `
<div class="form-container" >
    <form class="loginForm" @submit=${context.submitHandler}>
        <h2>Sign up</h2>
        <p></p>
        <div id="input-container">
            <input type="text" placeholder="username" autocomplete="$1">
            <input type="password" placeholder="password" autocomplete="$1">
            <input type="password" placeholder="confirm password" autocomplete="$1">
            <input type="text" placeholder="email" autocomplete="$1"> 
        </div>
        <button  id="log-submit" type="submit">REGISTER</button>
        <button @click=${context.closeWindow} id="xbtn"><svg class="x-icon" width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
    </form>
</div>`;

