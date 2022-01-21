import { getVehicles } from "../api/car.js";
import { html, until } from "../lib.js";
import { spinner } from "./common.js";

const catalogTemplate = (carPromise) => html` <section id="catalogPage">
  <h1>All Cars</h1>
  <div class="catalogWrapper">
    ${carPromise.length == 0
      ? html`<p>No Cars in Catalog!</p>`
      : html`${until(carPromise, spinner())}`}
  </div>
</section>`;

const carPreview = (car) => html` <div class="card-box">
  <img style="width: 250px; height: 150px; margin: 0;" src=${car.imgUrl} />
  <div style="margin:0;">
    <div class="text-center">
      <p class="secondaryText brand">Brand: ${car.brand}</p>
      <p class="secondaryText">Model: ${car.model}</p>
      <p class="secondaryText">Price: $${car.price}</p>
      <p class="secondaryText">Owner: ${car.owner}</p>
      <p class="secondaryText">Type: ${car.type}</p>
      <p class="secondaryText">Year: ${car.year}</p>
      <p class="secondaryText description">Description: ${car.description}</p>
    </div>
  </div>
  <div class="btn-group" id="details">
    <a href="/details/${car.objectId}">Details</a>
  </div>
</div>`;

export function catalogPage(ctx) {
  ctx.render(catalogTemplate(loadCars()));
}

async function loadCars() {
  const cars = await getVehicles();

  return cars.results.map(carPreview);
}
