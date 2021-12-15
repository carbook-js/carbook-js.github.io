import { render } from '../lib.js';
import { getUserData } from '../util.js';

export default function initialize() {
    const root = document.getElementById('main-content');
    updateNav();

    return function (ctx, next) {
        ctx.render = boundRender;
        ctx.updateNav = updateNav;

        next();
    }

    function updateNav() {
        const userData = getUserData();
        if (userData) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
            document.getElementById('user').querySelector('span').textContent = `Welcome, ${userData.username}`
        } else {
            document.getElementById('user').style.display = 'none';
            document.getElementById('guest').style.display = 'inline-block';
        }
    }

    function boundRender(content) {
        render(content, root);
    }
}