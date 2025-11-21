const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ======================================
// VARIABLES GLOBALES
// ======================================
let lastData = {};     // Última data enviada por el robot
let lastCommand = "";  // Último comando enviado desde la página

// ======================================
// POST - Robot envía datos al servidor
// ======================================
app.post("/api/robot/data", (req, res) => {
    lastData = req.body;
    console.log("📡 Datos recibidos del robot:");
    console.log(lastData);
    res.json({ status: "OK" });
});

// ======================================
// GET - Página web pide la última data
// ======================================
app.get("/api/robot/dataLast", (req, res) => {
    res.json(lastData);
});

// ======================================
// POST - Página web envía un comando
// ======================================
app.post("/api/robot/command", (req, res) => {
    lastCommand = req.body.cmd;
    console.log("🕹 Comando recibido desde web: ", lastCommand);
    res.json({ status: "OK" });
});

// ======================================
// GET - Gateway pide el último comando
// ======================================
app.get("/api/gateway/command", (req, res) => {
    res.json({ cmd: lastCommand });
    lastCommand = ""; // limpiar una vez enviado
});

// ======================================
app.listen(3000, "0.0.0.0", () => {
    console.log("🚀 Servidor NodeJS corriendo en http://localhost:3000");
});
