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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clients_1 = require("./clients");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const text = "<h1>No mentira</h1>";
app.use((0, morgan_1.default)('dev'));
app.get("/", (req, res) => {
    res.send(text);
});
app.get('/clients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let clients = yield (0, clients_1.getClients)();
    res.status(200).send(clients);
}));
app.post("/clients/:cedula/:nombre", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield (0, clients_1.createClient)(req.params.cedula, req.params.nombre);
    if (result.success) {
        res.status(201).send(result.clients);
    }
    else {
        res.status(400).send(result.message);
    }
}));
app.delete('/clients/:cedula', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield (0, clients_1.deleteClient)(req.params.cedula);
    if (result.success) {
        res.status(200).send(result.clients);
    }
    else {
        res.status(400).send(result.message);
    }
}));
app.put('/clients/:cedula/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield (0, clients_1.updateClients)(req.params.cedula, req.params.nombre);
    if (result.success) {
        res.status(200).send(result.clients);
    }
    else {
        res.status(400).send(result.message);
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});
