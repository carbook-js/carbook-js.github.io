import { getUserData } from "../util.js";

export const endpoints = {
    vehicles: '/classes/Automobile',
    vehicleDetails: (id) => `/classes/Automobile/${id}?include=ownerId`,
    vehicleById: '/classes/Automobile/',
    comments: '/classes/Comment',
    commentsByVehicle: (carId) => `/classes/Comment?where=${ createPointerQuery('car', 'Car', carId) }&include=ownerId`
}

export function createPointerQuery(propName, className, objectId){
    return createQuery({[propName]: createPointer(className, objectId)});
}

export function createQuery(query){
    return encodeURIComponent(JSON.stringify(query));
}

export function createPointer(className, objectId){
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}

export function addOwner(record){
    const {id} = getUserData();
    record.ownerId = createPointer('_User', id);

    return record;
}