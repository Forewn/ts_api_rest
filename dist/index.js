"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clients_1 = require("./clients");
const app = (0, express_1.default)();
const text = "<h1>No mentira</h1>";
app.get("/", (req, res) => {
    res.send(text);
});
app.post("/newClient/:cedula/:nombre", (req, res) => {
    let result = (0, clients_1.createClient)(req.params.cedula, req.params.nombre);
    if (result.success) {
        res.status(201).send(result.clients);
    }
    else {
        res.status(400).send(result.message);
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});
