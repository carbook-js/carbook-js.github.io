import * as api from './api.js';
import { addOwner, endpoints } from './data.js';

export async function getVehicles(){
    return api.get(endpoints.vehicles);
}

export async function getVehicleById(id){
    return api.get(endpoints.vehicleDetails(id));
}

export async function createVehicle(vehicle){
    addOwner(vehicle);
    return api.post(endpoints.vehicles, vehicle);
}

export async function updateVehicle(id, vehicle){
    return api.put(endpoints.vehicleById + id, vehicle);
}

export async function deleteVehicle(id){
    return api.del(endpoints.vehicleById + id);
}