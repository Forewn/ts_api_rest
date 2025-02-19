"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
let clients = [];
function clientExists(cedula) {
    return clients.some(client => client.id === cedula);
}
function createClient(cedula, nombre) {
    if (!clientExists(cedula)) {
        let client = {
            id: cedula,
            name: nombre
        };
        clients.push(client);
        return { success: true, clients: clients };
    }
    return { success: false, message: "Client already exists" };
}
