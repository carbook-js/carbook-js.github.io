import { logout } from './api/user.js';
import { page } from './lib.js';
import decorateContext from './middlewares/render.js';
import addSession from './middlewares/session.js';
import { catalogPage } from './view/catalog.js';
import { createPage } from './view/create.js';
import { detailsPage } from './view/details.js';
import { editPage } from './view/edit.js';
import { homePage } from './view/home.js';
import { loginPage } from './view/login.js';
import { registerPage } from './view/register.js';
import { searchPage } from './view/search.js';

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(addSession());
page(decorateContext());
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

page.start();

function onLogout() {
    logout();
    document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = 'inline-block';
    page.redirect('/');
}