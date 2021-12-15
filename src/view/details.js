import { getVehicleById } from '../api/car.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';

const detailsTemplate = (carPromise) => html`
<section id="detailsPage">
    ${until(carPromise, spinner())}
</section>`;

const detailsPreview = (car) => html`
<div class="wrapper">
    <div class="albumCover">
        <img src=${car.imgUrl}>
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Brand: ${car.brand}</h1>
            <h3>Model: ${car.model}</h3>
            <h4>Price: $${car.price}</h4>
            <h4>Owner: ${car.owner}</h4>
            <h4>Type: ${car.type}</h4>
            <h4>Year: ${car.year}</h4>
            <p>Description: ${car.description}</p>
        </div>

        <!-- Only for registered user and creator of the album-->
        <div class="actionBtn">
            <a href="/edit/${car.objectId}" class="edit">Edit</a>
            <a href="javascript:vodi(0)" class="remove">Delete</a>
        </div>
    </div>
</div>`;

export function detailsPage(ctx){
    ctx.render(detailsTemplate(loadCar()));

    async function loadCar(){
        const car = await getVehicleById(ctx.params.id);
    
        return detailsPreview(car);
    }
}
