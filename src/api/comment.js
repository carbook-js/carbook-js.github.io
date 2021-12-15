import * as api from './api.js';
import { addOwner, createPointer, endpoints } from './data.js';


export function getCommentsByVehicleId(carId){
    return api.get(endpoints.commentsByVehicle(carId));
}

export function createComment(carId, comment){
    comment.car = createPointer('Car', carId);
    addOwner(comment);
    return api.post(endpoints.comments, comment);
}