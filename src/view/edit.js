import { updateVehicle, getVehicleById } from "../api/car.js";
import { html } from "../lib.js";

const editTemplate = (car, onSubmit) => html`
<section class="editPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Car</legend>

            <div class="container">
                <label for="brand" class="vhide">Car name</label>
                <input id="brand" name="brand" class="brand" type="text" .value=${car.brand}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${car.imgUrl}>

                <label for="model" class="vhide">Model</label>
                <input id="model" name="model" class="model" type="text" .value=${car.model}>
                
                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="number" .value=${car.price}>

                <label for="owner" class="vhide">Owner</label>
                <input id="owner" name="owner" class="owner" type="text" .value=${car.owner}>

                <label for="type" class="vhide">Type</label>
                <input id="type" name="type" class="type" type="text" .value=${car.type}>

                <label for="year" class="vhide">Year</label>
                <input id="year" name="year" class="year" type="text" .value=${car.year}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10" .value=${car.description}></textarea>

                <button class="edit-album" type="submit">Edit Car</button>
            </div>
        </fieldset>
    </form>
</section>`;

export async function editPage(ctx){
    const car = await getVehicleById(ctx.params.id);
    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const brand = formData.get('brand').trim();
        const imgUrl = formData.get('imgUrl').trim();
        const model = formData.get('model').trim();
        const price = Number(formData.get('price').trim());
        const owner = formData.get('owner').trim();
        const type = formData.get('type').trim();
        const year = formData.get('year').trim();
        const description = formData.get('description').trim();

        if(brand == '' || imgUrl == '' || model == '' || price == '' || owner == '' || type == '' || year == '' || description == ''){
            return alert('All fields are required!');
        }

        await updateVehicle(ctx.params.id, {
            brand,
            imgUrl,
            model,
            price,
            owner,
            type,
            year,
            description
        });
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}