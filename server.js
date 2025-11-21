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
// GET - Página principal para Render
// ======================================
app.get("/", (req, res) => {
    res.send("Backend funcionando en Render");
});

// ======================================
// POST - Robot → Backend (envía sus datos)
// ======================================
app.post("/api/robot/data", (req, res) => {
    lastData = req.body;
    console.log("📡 Datos recibidos del robot:");
    console.log(lastData);
    res.json({ status: "OK", received: lastData });
});

// ======================================
// GET - Web → obtener última data del robot
// ======================================
app.get("/api/robot/dataLast", (req, res) => {
    res.json(lastData);
});

// ======================================
// POST - Web → establecer comando del robot
// ======================================
app.post("/api/robot/command", (req, res) => {
    lastCommand = req.body.cmd;
    console.log("🕹 Comando recibido desde web:", lastCommand);
    res.json({ status: "CMD SET", cmd: lastCommand });
});

// ======================================
// GET - Gateway → obtener comando más reciente
// ======================================
app.get("/api/gateway/command", (req, res) => {
    res.json({ cmd: lastCommand });
    lastCommand = ""; // limpiar después de enviarlo
});

// ======================================
// LISTEN - Render requiere PORT dinámico
// ======================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 Servidor NodeJS corriendo en puerto", PORT);
});