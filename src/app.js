import { logout } from './api/user.js';
import { page } from './lib.js';
import decorateContext from './middlewares/render.js';
import addSession from './middlewares/session.js';
import { catalogPage } from './view/catalog.js';
import { createPage } from './view/create.js';
import { detailsPage } from './view/details.js';
import { homePage } from './view/home.js';
import { loginPage } from './view/login.js';
import { registerPage } from './view/register.js';

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(addSession());
page(decorateContext());
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);

page.start();

function onLogout() {
    logout();
    decorateContext();
    page.redirect('/');
}