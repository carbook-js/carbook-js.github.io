//import { getVehicleById } from '../api/car.js';
import { html } from '../lib.js';

const homeTemplate = () => html`
<section id="welcomePage">
    <div id="welcome-message">
        <h1>Welcome to</h1>
        <h1>My Car Application!</h1>
    </div>

    <div class="music-img">
        <img src="./images/caricon.jpg">
    </div>
</section>`;

export function homePage(ctx){
    ctx.render(homeTemplate());
}

//async function loadCars(){
//    const cars = await getVehicleById();
//}