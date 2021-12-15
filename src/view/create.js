import { createVehicle } from '../api/car.js';
import { html } from '../lib.js';

const createTemplate = (onSubmit) => html`
<section class="createPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Add Car</legend>

            <div class="container">
                <label for="brand" class="vhide">Car brand</label>
                <input id="brand" name="brand" class="brand" type="text" placeholder="Car brand">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">
                
                <label for="model" class="vhide">Model</label>
                <input id="model" name="model" class="model" type="text" placeholder="Model">
                
                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="number" placeholder="Price">

                <label for="owner" class="vhide">Owner</label>
                <input id="owner" name="owner" class="owner" type="text" placeholder="Owner">

                <label for="type" class="vhide">Type</label>
                <input id="type" name="type" class="type" type="text" placeholder="Type">

                <label for="year" class="vhide">Year</label>
                <input id="year" name="year" class="year" type="text" placeholder="Year">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" placeholder="Description"></textarea>

                <button class="add-album" type="submit">Add New Car</button>
            </div>
        </fieldset>
    </form>
</section>`;

export function createPage(ctx){
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const brand = formData.get('brand').trim();
        const imgUrl = formData.get('imgUrl').trim();
        const model = formData.get('model').trim();
        const price = Number(formData.get('price'));
        const owner = formData.get('owner').trim();
        const type = formData.get('type').trim();
        const year = formData.get('year').trim();
        const description = formData.get('description').trim();

        if(brand == '' || imgUrl == '' || model == '' || price == '' || owner == '' || type == '' || year == '' || description == ''){
            return alert('All fields are required!');
        }

        await createVehicle({
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
        ctx.page.redirect('/catalog');
    }
}