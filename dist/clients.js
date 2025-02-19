"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
exports.deleteClient = deleteClient;
exports.getClients = getClients;
exports.updateClients = updateClients;
let clients = [];
function clientExists(cedula) {
    return __awaiter(this, void 0, void 0, function* () {
        return clients.some(client => client.id === cedula);
    });
}
function getClients() {
    return __awaiter(this, void 0, void 0, function* () {
        return clients;
    });
}
function createClient(cedula, nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield clientExists(cedula))) {
            let client = {
                id: cedula,
                name: nombre
            };
            clients.push(client);
            return { success: true, clients: clients };
        }
        return { success: false, message: "Client already exists" };
    });
}
function deleteClient(cedula) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield clientExists(cedula)) {
            clients = clients.filter(client => client.id !== cedula);
            return { success: true, clients: clients };
        }
        return { success: false, message: "Client doesn't exist." };
    });
}
function updateClients(cedula, nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield clientExists(cedula)) {
            clients = clients.map(client => {
                if (client.id === cedula) {
                    client.name = nombre;
                }
                return client;
            });
            return { success: true, clients: clients };
        }
        return { success: false, message: "Client doesn't exist" };
    });
}
