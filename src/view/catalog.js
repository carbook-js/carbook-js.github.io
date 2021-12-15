import { getVehicles } from '../api/car.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';

const catalogTemplate = (carPromise) => html`
<section id="catalogPage">
    <h1>All Cars</h1>

    ${carPromise.length == 0 ? html`<p>No Cars in Catalog!</p>` : html`${until(carPromise, spinner())}`}

</section>`;

const carPreview = (car) => html`
<div class="card-box">
    <img src=${car.imgUrl}>
    <div>
        <div class="text-center">
            <p class="brand">Brand: ${car.brand}</p>
            <p class="model">Model: ${car.model}</p>
            <p class="price">Price: $${car.price}</p>
            <p class="owner">Owner: ${car.owner}</p>
            <p class="type">Type: ${car.type}</p>
            <p class="date">Year: ${car.year}</p>
            <p class="description">Description: ${car.description}</p>
        </div>
        <div class="btn-group">
            <a href="/details/${car.objectId}" id="details">Details</a>
        </div>
    </div>
</div>`;

export function catalogPage(ctx){
    ctx.render(catalogTemplate(loadCars()));
}

async function loadCars(){
    const cars = await getVehicles();

    return cars.results.map(carPreview);
}
