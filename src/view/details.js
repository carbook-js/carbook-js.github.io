import { deleteVehicle, getVehicleById } from '../api/car.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';
import { spinner } from './common.js';

const detailsTemplate = (carPromise) => html`
<section id="detailsPage">
    ${until(carPromise, spinner())}
</section>`;

const detailsPreview = (car, onDelete, isOwner) => html`
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
        ${isOwner ? html`<div class="actionBtn">
            <a href="/edit/${car.objectId}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:vodi(0)" class="remove">Delete</a>
        </div>` : null}
    </div>
</div>`;

export function detailsPage(ctx){
    ctx.render(detailsTemplate(loadCar()));

    async function loadCar(){
        const userData = await getUserData();
        const car = await getVehicleById(ctx.params.id);
        const isOwner = userData.id == car.ownerId.objectId;
    
        return detailsPreview(car, onDelete, isOwner);

        async function onDelete(){
            const choice = confirm(`Are you sure you want to delete ${car.brand}`);

            if(choice){
                await deleteVehicle(car.objectId);
                ctx.page.redirect('/catalog');
            }
        }
    }
}
