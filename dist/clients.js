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
const conn_1 = require("./conn");
let clients = [];
function clientExists(cedula) {
    return __awaiter(this, void 0, void 0, function* () {
        let exists = false;
        yield (0, conn_1.useDatabase)((client) => __awaiter(this, void 0, void 0, function* () {
            const res = yield client.query('SELECT 1 FROM clients WHERE id = $1', [cedula]);
            exists = res.rowCount > 0;
        }));
        return exists;
    });
}
function getClients() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, conn_1.useDatabase)((client) => __awaiter(this, void 0, void 0, function* () {
            const res = yield client.query('SELECT id, name FROM clients');
            clients = res.rows;
        }));
        return clients;
    });
}
function createClient(cedula, nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield clientExists(cedula))) {
            yield (0, conn_1.useDatabase)((client) => __awaiter(this, void 0, void 0, function* () {
                yield client.query('INSERT INTO clients (id, name) VALUES ($1, $2)', [cedula, nombre]);
            }));
            return { success: true, clients: yield getClients() };
        }
        return { success: false, message: "Client already exists" };
    });
}
function deleteClient(cedula) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield clientExists(cedula)) {
            yield (0, conn_1.useDatabase)((client) => __awaiter(this, void 0, void 0, function* () {
                yield client.query('DELETE FROM clients WHERE id = $1', [cedula]);
            }));
            return { success: true, clients: yield getClients() };
        }
        return { success: false, message: "Client doesn't exist." };
    });
}
function updateClients(cedula, nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield clientExists(cedula)) {
            yield (0, conn_1.useDatabase)((client) => __awaiter(this, void 0, void 0, function* () {
                yield client.query('UPDATE clients SET name = $1 WHERE id = $2', [nombre, cedula]);
            }));
            return { success: true, clients: yield getClients() };
        }
        return { success: false, message: "Client doesn't exist" };
    });
}
