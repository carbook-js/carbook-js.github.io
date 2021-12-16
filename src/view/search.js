import { html, until } from "../lib.js";
import { parseQuery } from "../util.js";
import {getVehiclesSearch} from '../api/car.js'
import { spinner } from "./common.js";

const searchTemplate = (searchPromise, onSearch, search = '') => html`
<section id="searchPage">
    <h1>Search by Brand</h1>

    <div class="search">
        <form @submit=${onSearch}>
            <input id="search-input" type="text" name="search" placeholder="Enter desired cars's brand"
                .value=${search}>
            <button class="button-list">Search</button>
        </form>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        <!--If have matches-->
        ${until(searchPromise, spinner())}
        <!--If there are no matches-->
        
    </div>
</section>`;

const searchCard = (car) => html`<div class="card-box">
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

export function searchPage(ctx) {
    const query = parseQuery(ctx.querystring);
    const queryCode = ctx.querystring
    
    ctx.render(searchTemplate(loadSearch(queryCode), onSearch, query.search));

    function onSearch(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const search = formData.get('search');

        if(search == ''){
            return alert('Empty field.');
        }

        if (search) {
            ctx.page.redirect(`/search?search=${encodeURIComponent(search)}`)
        }else{
            ctx.page.redirect('/search')
        }
    }
}

async function loadSearch(search = ''){
    const {results: cars} = await getVehiclesSearch(search);

    if(cars.length == 0){
        return html`<p class="no-result">No result.</p>`;
    }else {
        return cars.map(searchCard);
    }
}